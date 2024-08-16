import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "@/utils/db";

export async function GET(req: NextRequest) {
  const email = req.headers.get('email') || ''

  const { bucket, client } = await dbConnect();
  const filesCollection = client.connection.collection('uploads.files');

  const file = req.url.split('/').pop()

  const existFile = await filesCollection.findOne({
    filename: file,
    'metadata.email': email
  })

  if (!existFile) {
    return NextResponse.json({
      success: false,
      message: 'no file'
    });
  }

  const files = await bucket
    .find({
      filename: file,
      'metadata.email': email
    })
    .toArray();

  const f = files[0];

  const stream = bucket.openDownloadStreamByName(f.filename);

  return new NextResponse(stream, {
    headers: { "Content-Type": f.metadata.type },
  });
}

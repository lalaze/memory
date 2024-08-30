import { NextResponse, NextRequest } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from "@/utils/db";

export async function GET(req: NextRequest) {
  const email = req.headers.get('email') || ''
  const { searchParams } = new URL(req.url);

  const id = String(searchParams.get('id'))

  const { bucket, client } = await dbConnect();
  const filesCollection = client.connection.collection('uploads.files');

  const file = req.url.split('/').pop()?.split('?')[0]
 
  const existFile = await filesCollection.findOne({
    _id: new mongoose.Types.ObjectId(id),
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
      _id: new mongoose.Types.ObjectId(id),
      filename: file,
      'metadata.email': email
    })
    .toArray();

  const f = files[0];

  const stream = bucket.openDownloadStreamByName(f.filename);

  return new NextResponse(stream, {
    headers: { "Content-Type": f.metadata.type, "Hash":  f.metadata.hash, }
  });
}

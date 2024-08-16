import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "@/utils/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get('limit')) || 10
  const offset = Number(searchParams.get('limit')) || 0

  const { client } = await dbConnect();

  const filesCollection = client.connection.collection('uploads.files');

  const totalCount = await filesCollection.countDocuments({ 'metadata.email': req.headers.get('email') });

  const list = await filesCollection.find({
    'metadata.email': req.headers.get('email')
  }).skip(offset).limit(limit).toArray()

  return NextResponse.json({
    success: true,
    data: list.map((item: any) => {
      return {
        name: item.filename
      }
    }),
    total: totalCount
  });
}

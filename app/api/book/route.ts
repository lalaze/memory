import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "@/utils/db";
import { fileTypeFromBuffer } from 'file-type';
import crypto from 'crypto'
import { Readable } from "stream";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get('limit')) || 10
  const offset = Number(searchParams.get('limit')) || 0

  const { client } = await dbConnect();

  const filesCollection = client.connection.collection('uploads.files');

  const totalCount = await filesCollection.countDocuments({ 'metadata.email': req.headers.get('email') });

  const list = await filesCollection.find({
    'metadata.email': { $in: [req.headers.get('email'), '*'] }
  }).skip(offset).limit(limit).toArray()

  return NextResponse.json({
    success: true,
    data: list.map((item: any) => {
      return {
        id: String(item._id),
        name: item.filename
      }
    }),
    total: totalCount
  });
}

function generateHashFromUint8Array(data: Uint8Array) {
  const hash = crypto.createHash('sha256')
  hash.update(data);
  return hash.digest('hex')
}

export async function POST(req: NextRequest) {
  const { bucket, client } = await dbConnect();
  const filesCollection = client.connection.collection('uploads.files');
  const email = req.headers.get('email')
  const formData = await req.formData();

  let book

  for (const entries of Array.from(formData.entries())) {
    const [key, value] = entries;

    if (typeof value == "object") {
      book = value.name;

      const buffer = Buffer.from(await value.arrayBuffer());
      const arrayBuffer = new ArrayBuffer(buffer.length);

      let uint8Array: any = arrayBuffer
      uint8Array = new Uint8Array(arrayBuffer);
      const hash = generateHashFromUint8Array(uint8Array)

      const existFile = await filesCollection.findOne({
        filename: book,
        email,
        'metadata.hash': hash
      })

      if (existFile) {
        return NextResponse.json({
          success: false,
          message: 'Duplicate file Name'
        });
      }

      for (let i = 0; i < buffer.length; i++) {
        uint8Array[i] = buffer[i];
      }

      const type = (await fileTypeFromBuffer(uint8Array))?.mime

      const stream = Readable.from(buffer);
      const uploadStream = bucket.openUploadStream(book, {
        metadata: {
          email,
          type,
          hash
        }
      });
      stream.pipe(uploadStream).on('finish', () => {
        console.log('File successfully uploaded');
      })

      await new Promise((resolve, reject) => {
        uploadStream.on('finish', resolve);
        uploadStream.on('error', reject);
      });
    }
  }

  return NextResponse.json({
    success: true
  });
}

import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "@/utils/db";
import { fileTypeFromBuffer } from 'file-type';
import { Readable } from "stream";

type paramsProps = {
  content: string
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
      const existFile = await filesCollection.findOne({
        filename: book,
        'metadata.email': email
      })

      if (existFile) {
        return NextResponse.json({
          success: false,
          message: 'Duplicate file Name'
        });
      }
      const buffer = Buffer.from(await value.arrayBuffer());
      const arrayBuffer = new ArrayBuffer(buffer.length);

      let uint8Array: any = arrayBuffer

      // test have to change
      // if (process.env.NODE_ENV === 'test') {
      uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < buffer.length; i++) {
        uint8Array[i] = buffer[i];
      }
      // }
      const type = (await fileTypeFromBuffer(uint8Array))?.mime

      const stream = Readable.from(buffer);
      const uploadStream = bucket.openUploadStream(book, {
        metadata: {
          email,
          type
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
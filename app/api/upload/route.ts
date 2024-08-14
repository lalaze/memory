import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "@/utils/db";
import Book from '@/models/book'
import { fileTypeFromBuffer } from 'file-type';
import { Readable } from "stream";

type paramsProps = {
    content: string
}

export async function POST(req: NextRequest) {
    const { bucket } = await dbConnect();
    const formData = await req.formData();

    let book;
    let type;

    for (const entries of Array.from(formData.entries())) {
        const [key, value] = entries;

        if (typeof value == "object") {
            book = value.name;
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
            type = (await fileTypeFromBuffer(uint8Array))?.mime

            console.log('zeze 111', type)

            const stream = Readable.from(buffer);
            const uploadStream = bucket.openUploadStream(book, {});
            await stream.pipe(uploadStream);
        }
    }

    const check = await Book.findOne({
        email: req.headers.get('email'),
        bookUrl: book,
    })
    if (check) {
        return NextResponse.json({
            success: false,
            message: 'Duplicate files'
        });
    }

    const newItem = new Book({
        email: req.headers.get('email'),
        bookUrl: book,
        type: type
    });

    await newItem.save();

    return NextResponse.json({
        success: true
    });
}
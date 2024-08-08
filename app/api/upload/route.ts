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
            book = Date.now() + value.name;
            const buffer = Buffer.from(await value.arrayBuffer());
            type = (await fileTypeFromBuffer(buffer))?.mime
            const stream = Readable.from(buffer);
            const uploadStream = bucket.openUploadStream(book, {});
            await stream.pipe(uploadStream);
        }
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
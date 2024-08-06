import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "@/utils/db";
import Book from '@/models/book'
import { Readable } from "stream";

type paramsProps = {
    content: string
}

export async function POST(req: NextRequest, { params }: { params: paramsProps }) {

    const { bucket } = await dbConnect();

    const formData = await req.formData();
    let name;
    let book;

    for (const entries of Array.from(formData.entries())) {
        const [key, value] = entries;
        if (key == "email") {
            name = value;
        }

        if (typeof value == "object") {
            book = Date.now() + value.name;
            const buffer = Buffer.from(await value.arrayBuffer());
            const stream = Readable.from(buffer);
            const uploadStream = bucket.openUploadStream(book, {});
            await stream.pipe(uploadStream);
        }
    }

    const newItem = new Book({
        email: name,
        bookUrl: book,
    });

    await newItem.save();


    return NextResponse.json({
        success: true
    });
}
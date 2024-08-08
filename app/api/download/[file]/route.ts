import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "@/utils/db";
import Book from '@/models/book'

type paramsProps = {
    content: string
}

export async function GET(req: NextRequest) {
    const email = req.headers.get('email') || ''

    const { bucket } = await dbConnect();

    const file = req.url.split('/').pop()

    const result = await Book.findOne({
        email,
        filename: file
    })

    if (!result) {
        return NextResponse.json({
            success: false,
            message: 'no file'
        });
    }

    const files = await bucket
        .find({
            filename: file,
        })
        .toArray();

    const f = files[0];

    const stream = bucket.openDownloadStreamByName(f.filename);

    return new NextResponse(stream, {
        headers: { "Content-Type": result.type },
    });
}

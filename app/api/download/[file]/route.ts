import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "@/utils/db";

type paramsProps = {
    content: string
}

export async function GET(req: NextRequest) {

    const { bucket } = await dbConnect();

    const file = req.url.split('/').pop()

    const files = await bucket
        .find({
            filename: file,
        })
        .toArray();

    const f = files[0];

    const stream = bucket.openDownloadStreamByName(f.filename);

    return new NextResponse(stream, {
        headers: { "Content-Type": "application/epub" },
    });
}

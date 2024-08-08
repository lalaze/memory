import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "@/utils/db";
import Book from '@/models/book'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get('limit')) || 10
    const offset = Number(searchParams.get('limit')) || 0

    await dbConnect();

    const list = await Book.find({
        email: req.headers.get('email')
    }).skip(offset).limit(limit)

    return NextResponse.json({
        success: true,
        data: list.map((item) => {
            return {
                name: item.bookUrl
            }
        })
    });
}

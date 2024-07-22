import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "../../../utils/db";
import cards from "../../../models/cards";

type paramsProps = {
    id: string
    title: string
    content: string
}

export async function POST(req: NextRequest, { params }: { params: paramsProps }) {
    await dbConnect();

    const id = params.id;
    const title = params.title;
    const content = params.content

    await cards.findByIdAndUpdate(id, {
        title: title,
        content: content
    })

    return NextResponse.json({
        success: true
    });
}
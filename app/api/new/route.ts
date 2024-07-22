import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "../../../utils/db";
import { getNextDay } from '../../../utils/time'
import cards from "../../../models/cards";

type paramsProps = {
    title: string
    content: string
}

export async function POST(req: NextRequest, { params }: { params: paramsProps }) {
    await dbConnect();

    const title = params.title;
    const content = params.content

    const c = new cards({
        title,
        content,
        time: 1,
        newDay: getNextDay(1)
    })
    await c.save()

    return NextResponse.json({
        success: true
    });
}
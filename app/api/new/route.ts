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

    const body = await req.json()

    console.log('backup', getNextDay(1))

    const c = new cards({
        title: body.title,
        content: body.content,
        time: 1,
        nextDay: getNextDay(1)
    })
    await c.save()   

    return NextResponse.json({
        success: true
    });
}
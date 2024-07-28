import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "../../../utils/db";
import { getNextDay } from '../../../utils/time'
import cards from "../../../models/cards";

type paramsProps = {
    title: string
    content: string
}

export async function POST(req: NextRequest) {
    await dbConnect();

    const body = await req.json()

    console.log('backup', body.email)

    const c = new cards({
        title: body.title,
        content: JSON.stringify(body.content),
        email: body.email,
        time: 1,
        nextDay: getNextDay(1)
    })
    await c.save()   

    return NextResponse.json({
        success: true
    });
}
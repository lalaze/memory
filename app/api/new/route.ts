import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "../../../utils/db";
import { getNextDay } from '../../../utils/time';
import cards from "../../../models/cards";

export async function POST(req: NextRequest) {
    const body = await req.json()

    await dbConnect();

    const c = new cards({
        title: body.title,
        content: JSON.stringify(body.content),
        email: req.headers.get('email'),
        time: 1,
        nextDay: getNextDay(1)
    })


    await c.save()   

    return NextResponse.json({
        success: true
    });
}

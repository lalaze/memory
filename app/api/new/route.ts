import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "../../../utils/db";
import { getNextDay } from '../../../utils/time';
import { checkUser } from '@/utils/api';
import cards from "../../../models/cards";

export async function POST(req: NextRequest) {
    const body = await req.json()

    const email = body.email

    if (!(await checkUser(email))) {
      return NextResponse.json({
        success: false,
        message: 'illegal user'
      });
    }

    await dbConnect();

    const c = new cards({
        title: body.title,
        content: JSON.stringify(body.content),
        email,
        time: 1,
        nextDay: getNextDay(1)
    })


    await c.save()   

    return NextResponse.json({
        success: true
    });
}

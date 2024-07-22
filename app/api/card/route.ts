import { NextResponse } from 'next/server';
import dbConnect from "../../../utils/db";
import dayjs from 'dayjs'
import cards from "../../../models/cards";

export async function GET() {
    await dbConnect();
    const d = await cards.findOne({
        newDay: dayjs().format('YYYY-MM-DD')
    });
    return NextResponse.json({
        success: true,
        data: d
    });
}
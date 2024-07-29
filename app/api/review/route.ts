import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "../../../utils/db";
import { getNextDay } from '../../../utils/time';
import mongoose from 'mongoose';
import cards from "../../../models/cards";

export async function GET(req: NextRequest) {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id') || ''
    const d = await cards.findById(new mongoose.Types.ObjectId(id))
    console.log('zeze', d.time)
    await cards.findByIdAndUpdate(new mongoose.Types.ObjectId(id), {
        time: d.time + 1,
        nextDay: getNextDay(d.time + 1)
    })

    return NextResponse.json({
        success: true
    });
}
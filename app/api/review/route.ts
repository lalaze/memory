import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "../../../utils/db";
import { getNextDay } from '../../../utils/time';
import { checkUser } from '@/utils/api';
import mongoose from 'mongoose';
import cards from "../../../models/cards";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id') || ''
    const email = searchParams.get('email') || ''

    if (!(await checkUser(email))) {
      return NextResponse.json({
        success: false,
        message: 'illegal user'
      });
    }
    await dbConnect();
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
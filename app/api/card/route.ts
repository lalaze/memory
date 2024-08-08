import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "../../../utils/db";
import dayjs from 'dayjs'
import cards from "../../../models/cards";

export async function GET(req: NextRequest) {
  await dbConnect();
 
  const d = await cards.findOne({
    email: req.headers.get('email'),
    nextDay: dayjs().format('YYYY-MM-DD')
  });
  return NextResponse.json({
    success: true,
    data: d
  });
}
import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "../../../utils/db";
import dayjs from 'dayjs'
import cards from "../../../models/cards";

export async function GET(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email')
  const d = await cards.findOne({
    email,
    nextDay: dayjs().format('YYYY-MM-DD')
  });
  return NextResponse.json({
    success: true,
    data: d
  });
}
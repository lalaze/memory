import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "../../../utils/db";
import { checkUser } from '@/utils/api';
import dayjs from 'dayjs'
import cards from "../../../models/cards";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email') || ''

  if (!(await checkUser(email))) {
    return NextResponse.json({
      success: false,
      message: 'illegal user'
    });
  }
  await dbConnect();
 
  const d = await cards.findOne({
    email,
    nextDay: dayjs().format('YYYY-MM-DD')
  });
  return NextResponse.json({
    success: true,
    data: d
  });
}
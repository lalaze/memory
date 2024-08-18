import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "../../../utils/db";
import selection from '@/models/selection';

export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const bookName = searchParams.get('bookName')
  const cfiBase = searchParams.get('cfiBase')
  const list = await selection.find({
    email: req.headers.get('email'),
    bookName,
    cfiBase
  })

  return NextResponse.json({
    success: true,
    data: list
  });
}

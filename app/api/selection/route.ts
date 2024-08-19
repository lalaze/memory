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

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json()

  const s = new selection({
    email: req.headers.get('email'),
    cfi: body.cfi,
    cfiBase: body.cfiBase,
    bookName: body.bookName,
    color: body.color,
    content: body.content,
    tags: body.tags,
    text: body.text
  })

  await s.save()

  return NextResponse.json({
    success: true
  });
}



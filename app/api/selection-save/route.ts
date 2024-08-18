import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "../../../utils/db";
import selection from '@/models/selection';

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
    tags: body.tags
  })

  await s.save()

  return NextResponse.json({
    success: true
  });
}

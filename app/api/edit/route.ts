import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "../../../utils/db";
import mongoose from 'mongoose';
import cards from "../../../models/cards";

export async function POST(req: NextRequest) {
  const body = await req.json()

  const id = body.id;
  const title = body.title;
  const content = body.content

  await dbConnect();

  await cards.findByIdAndUpdate(new mongoose.Types.ObjectId(id), {
    title: title,
    content: JSON.stringify(content)
  })

  return NextResponse.json({
    success: true
  });
}
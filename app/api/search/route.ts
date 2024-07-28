import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "../../../utils/db";
import cards from "../../../models/cards";

type paramsProps = {
  content: string
}

export async function POST(req: NextRequest, { params }: { params: paramsProps }) {
  await dbConnect();

  const body = await req.json()

  const c = body.content

  const regex = new RegExp(c, 'i')

  const pipeline = [
    {
      $match: {
        $or: [
          { title: { $regex: regex } },
          { content: { $regex: regex } }
        ]
      }
    }
  ];

  const results = await cards.aggregate(pipeline)

  return NextResponse.json({
    success: true,
    data: results
  });
}
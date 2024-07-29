import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "../../../utils/db";
import cards from "../../../models/cards";
import { checkUser } from '@/utils/api';

type paramsProps = {
  content: string
}

export async function POST(req: NextRequest, { params }: { params: paramsProps }) {


  const body = await req.json()

  const c = body.content

  const email = body.email

  if (!(await checkUser(email))) {
    return NextResponse.json({
      success: false,
      message: 'illegal user'
    });
  }
  
  await dbConnect();

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
import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "../../../utils/db";
import mongoose from "mongoose";
import selection from '@/models/selection';

export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const bookName = searchParams.get('bookName')
  const cfiBase = searchParams.get('cfiBase')
  const bookId = searchParams.get('bookId')
  const offset = Number(searchParams.get('offset'))
  const limit = Number(searchParams.get('limit'))

  let list = []
  let totalCount = 0
  if (cfiBase) {
    list = await selection.find({
      email: req.headers.get('email'),
      bookName,
      cfiBase,
      bookId
    })
  }

  if (limit) {
    list = await selection.find({
      email: req.headers.get('email'),
      bookName,
      bookId
    }).skip(offset).limit(limit)
    totalCount = await selection.countDocuments({
      email: req.headers.get('email'),
      bookName,
      bookId
    });
  }

  const res = list.map((item) => {
    return {
      bookName: item.bookName,
      cfi: item.cfi,
      cfiBase: item.cfiBase,
      color: item.color,
      content: item.content,
      tags: item.tags,
      id: item._id,
      text: item.text
    }
  })

  if (limit) {
    return NextResponse.json({
      success: true,
      data: res,
      total: totalCount
    });
  }

  return NextResponse.json({
    success: true,
    data: res
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
    text: body.text,
    bookId: body.bookId
  })

  const res = await s.save()

  return NextResponse.json({
    id: String(res._id),
    success: true
  });
}

export async function PUT(req: NextRequest) {
  await dbConnect();
  const body = await req.json()

  if (!body.id) {
    return NextResponse.json({
      success: false
    })
  }

  await selection.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(body.id) }, {
    cfi: body.cfi,
    cfiBase: body.cfiBase,
    bookName: body.bookName,
    color: body.color,
    content: body.content,
    tags: body.tags,
    text: body.text
  })

  return NextResponse.json({
    success: true
  });
}

export async function DELETE(req: NextRequest) {
  await dbConnect()

  const { searchParams } = new URL(req.url)
  const id = String(searchParams.get('id'))

  if (!id) {
    return NextResponse.json({
      success: false
    })
  }

  await selection.deleteOne({ _id: new mongoose.Types.ObjectId(id) })

  return NextResponse.json({
    success: true
  });
}

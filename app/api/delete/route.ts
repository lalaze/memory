import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "../../../utils/db";
import { checkUser } from '@/utils/api';
import cards from "../../../models/cards";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id')
    const email = searchParams.get('email') || ''

    if (!(await checkUser(email))) {
      return NextResponse.json({
        success: false,
        message: 'illegal user'
      });
    }

    await dbConnect();
    await cards.findById(id)
    await cards.findByIdAndDelete(id)

    return NextResponse.json({
        success: true
    });
}
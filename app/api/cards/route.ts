import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "../../../utils/db";
import cards from "../../../models/cards";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email')
    await dbConnect();
    const lists = await cards.find({
      email
    });
    return NextResponse.json({
        success: true,
        data: lists
    });
}
import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "../../../utils/db";
import cards from "../../../models/cards";

export async function GET(req: NextRequest) {
    await dbConnect();
    const lists = await cards.find({
      email: req.headers.get('email')
    });
    return NextResponse.json({
        success: true,
        data: lists
    });
}

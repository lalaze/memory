import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "../../../utils/db";
import cards from "../../../models/cards";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id')

    await dbConnect();
    await cards.findById(id)
    await cards.findByIdAndDelete(id)

    return NextResponse.json({
        success: true
    });
}
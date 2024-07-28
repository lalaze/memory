import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "../../../utils/db";
import { getNextDay } from '../../../utils/time'
import cards from "../../../models/cards";

export async function GET(req: NextRequest) {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id')
    await cards.findById(id)
    await cards.findByIdAndDelete(id)

    return NextResponse.json({
        success: true
    });
}
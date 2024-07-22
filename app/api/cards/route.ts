import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "../../../utils/db";
import cards from "../../../models/cards";

export async function GET() {
    await dbConnect();
    const lists = await cards.find({});
    return NextResponse.json({
        success: true,
        data: lists
    });
}
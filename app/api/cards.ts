import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/db";
import cards from "../../models/cards";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const lists = await cards.find({});
        res.status(200).json({ success: true, data: lists });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      res.status(400).json({ success: false });
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

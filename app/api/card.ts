import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/db";
import dayjs from 'dayjs'
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
        const c = await cards.findOne({
          newDay: dayjs().format('YYYY-MM-DD')
        });
        res.status(200).json({ success: true, data: c });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const c = await new cards({
          ...req.body,
          time: 1,
          newDay: 
        }).save()
        res.status(200).json({ success: true, data: c });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

import { useState } from "react";
import dbConnect from "../../utils/db";
import dayjs from "dayjs";
import c, { Cards } from "../../models/cards";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { query } = context;
  const queryObj: any = {};
  if (query.review) {
    queryObj.nextDay = dayjs().format("YYYY-MM-DD");
  }
  if (query.add) {
    
  }

  await dbConnect();

  const result = await c.findOne(queryObj);

  // 返回数据作为 props
  return {
    props: {
      data: result,
    },
  };
};

const Index = ({ card }) => {
  const [items, setItems] = useState(card);

  return <div></div>;
};

export default Index;

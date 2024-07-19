import c, { Cards } from "../../models/cards";
import { useRouter } from 'next/router';
import dbConnect from "../../utils/db";
import mongoose from "mongoose";
import { GetServerSideProps } from "next";

type Props = {
  cards: Cards[];
};

const Index = ({ cards }: Props) => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/card?type=review');
  };

  return (
    <div>
      <button className="btn btn-active btn-primary" onClick={handleButtonClick}>开始今天的复习</button>
      {cards.length > 0 ? (
        cards.map((card) => (
          <div
            key={(card._id as mongoose.Types.ObjectId).toString()}
            className="collapse collapse-arrow bg-base-200"
          >
            <input type="radio" name="my-accordion-2" />
            <div
              className="collapse-title text-xl font-medium"
            >
              {card.title}
            </div>
            <div
              className="collapse-content"
            >
              <p>{card.content}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">暂无数据</div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  await dbConnect();

  /* find all the data in our database */
  const result = await c.find();

  /* Ensures all objectIds and nested objectIds are serialized as JSON data */
  const cards = result.map((doc) => {
    const card = JSON.parse(JSON.stringify(doc));
    return card;
  });

  return { props: { cards } };
};

export default Index;

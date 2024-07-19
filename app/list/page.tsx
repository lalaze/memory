import c, { Cards } from "../../models/cards";
import dbConnect from "../../utils/db";
import { GetServerSideProps } from "next";

type Props = {
  cards: Cards[];
};

const Index = ({ cards }: Props) => {
  return (
    <>
      {cards.map((card) => (
        <div key={card._id}>
        </div>
      ))}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  await dbConnect();

  /* find all the data in our database */
  const result = await c.find({});

  /* Ensures all objectIds and nested objectIds are serialized as JSON data */
  const cards = result.map((doc) => {
    const pet = JSON.parse(JSON.stringify(doc));
    return pet;
  });

  return { props: { cards } };
};

export default Index;

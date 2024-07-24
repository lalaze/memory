import Card from './card'

const New = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="stack w-full h-full items-center">
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
    </div>
  );
};

export default New;

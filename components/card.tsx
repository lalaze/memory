import dynamic from "next/dynamic";

const Editor = dynamic(() => import("./editor"), { ssr: false });

const Card = () => {
  return (
    <div className="card bg-gray-300 text-primary-content shadow-sm w-5/6 h-5/6 card-heigh">
      <div className="card-body h-full">
        <h2 className="card-title text-gray-800">Notification 3</h2>
        <Editor></Editor>
      </div>
    </div>
  );
};

export default Card;

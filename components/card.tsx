const Card = () => {
  return (
    <div className="card bg-gray-300 text-primary-content shadow-sm w-5/6 h-5/6">
      <div className="card-body">
        <h2 className="card-title text-gray-800">Notification 3</h2>
        {/* <div className="text-gray-600">test tag</div> */}
        <p className="text-gray-700">You have 3 unread messages. Tap here to see.</p>
      </div>
    </div>
  );
};
export default Card;

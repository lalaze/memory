const Card = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="stack">
        <div className="card bg-primary text-primary-content shadow-md">
          <div className="card-body">
            <h2 className="card-title">Notification 1</h2>
            <p>You have 3 unread messages. Tap here to see.</p>
          </div>
        </div>
        <div className="card bg-primary text-primary-content shadow">
          <div className="card-body">
            <h2 className="card-title">Notification 2</h2>
            <p>You have 3 unread messages. Tap here to see.</p>
          </div>
        </div>
        <div className="card bg-primary text-primary-content shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Notification 3</h2>
            <p>You have 3 unread messages. Tap here to see.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

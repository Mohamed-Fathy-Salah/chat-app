import Room from "./room";

const RightPannel = ({ currentUser, socket, room, db }) => {
  return (
    <div className="col-md-6 col-lg-7 col-xl-8">
      {room ? (
        <Room currentUser={currentUser} socket={socket} room={room} db={db} />
      ) : (
        <h1>select friend or group</h1>
      )}
    </div>
  );
};

export default RightPannel;

import Room from "./room";

const RightPannel = ({ currentUser, socket, friend, db }) => {
  return (
    <div className="col-md-6 col-lg-7 col-xl-8">
      {friend ? (
        <Room currentUser={currentUser} socket={socket} friend={friend} db={db}/>
      ) : (
        <h1>select friend or group</h1>
      )}
    </div>
  );
};

export default RightPannel;

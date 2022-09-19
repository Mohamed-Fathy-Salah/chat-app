import LeftPannel from "../../components/left-pannel/index";
import RightPannel from "../../components/right-pannel/index";

const Chat = ({ currentUser }) => {
  return (
    <div>
      <div style={{ float: "left", display: "inline-block", width: "30%" }}>
        <LeftPannel currentUser={currentUser} />
      </div>
      <div style={{ float: "right", display: "inline-block", width: "70%"}}>
        <RightPannel currentUser={currentUser} />
      </div>
    </div>
  );
};

export default Chat;

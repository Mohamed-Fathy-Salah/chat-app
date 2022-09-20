import LeftPannel from "../../components/left-pannel/index";
import RightPannel from "../../components/right-pannel/index";
const Chat = ({ currentUser }) => {
  return (
    <div className="row">
      <LeftPannel/>
      <RightPannel/>
    </div>
  );
};

export default Chat;

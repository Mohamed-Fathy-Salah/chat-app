import LeftPannel from "../../components/left-pannel/index";
import RightPannel from "../../components/right-pannel/index";
const Chat = ({ currentUser }) => {
  return (
    <section style={{ backgroundColor: "#CDC4F9" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card" id="chat3" style={{ borderRadius: "15px" }}>
              <div className="card-body">
                <div className="row">
                  <LeftPannel />
                  <RightPannel />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;

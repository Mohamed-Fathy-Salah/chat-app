import Message from "./message";
import SendBar from "./send-bar";

const RightPannel = () => {
  return (
    <div className="col-md-6 col-lg-7 col-xl-8">
      <div
        className="pt-3 pe-3"
        data-mdb-perfect-scrollbar="true"
        style={{ position: "relative", height: "400px", overflowY: "scroll" }}
      >
        <Message currentUser="adf"/>
        <Message />
        <Message currentUser="aba"/>
        <Message />
        <Message />
      </div>
      <SendBar />
    </div>
  );
};

export default RightPannel;

const Message = ({ message, isMine }) => {
  if (isMine) {
    return (
      <div className="d-flex flex-row justify-content-end">
        <div>
          <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
            {message.body}
          </p>
          <p className="small me-3 mb-3 rounded-3 text-muted">{message.time}</p>
        </div>
        <img
          src={message.userPhoto}
          style={{ width: "45px", height: "100%" }}
        />
      </div>
    );
  }
  return (
    <div className="d-flex flex-row justify-content-start">
      <img src={message.userPhoto} style={{ width: "45px", height: "100%" }} />
      <div>
        <p
          className="small p-2 ms-3 mb-1 rounded-3"
          style={{ backgroundColor: "#f5f6f7" }}
        >
          {message.body}
        </p>
        <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
          {message.time}
        </p>
      </div>
    </div>
  );
};

export default Message;

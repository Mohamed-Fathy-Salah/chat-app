const Message = ({ currentUser }) => {
  if (currentUser) {
    return (
      <div className="d-flex flex-row justify-content-end">
        <div>
          <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="small me-3 mb-3 rounded-3 text-muted">
            12:00 PM | Aug 13
          </p>
        </div>
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
          alt="avatar 1"
          style={{ width: "45px", height: "100%" }}
        />
      </div>
    );
  }
  return (
    <div className="d-flex flex-row justify-content-start">
      <img
        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
        alt="avatar 1"
        style={{ width: "45px", height: "100%" }}
      />
      <div>
        <p
          className="small p-2 ms-3 mb-1 rounded-3"
          style={{ backgroundColor: "#f5f6f7" }}
        >
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </p>
        <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
          12:00 PM | Aug 13
        </p>
      </div>
    </div>
  );
};

export default Message;

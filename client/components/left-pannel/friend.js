const Friends = ({ currentUser }) => {
  return (
    <div>
      <div className="d-flex flex-row">
        <div>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
            alt="avatar"
            className="d-flex align-self-center me-3"
            width={60}
          />
          <span className="badge bg-success badge-dot" />
        </div>
        <div className="pt-1">
          <p className="fw-bold mb-0">Marie Horwitz</p>
          <p className="small text-muted">Hello, Are you there?</p>
        </div>
      </div>
      <div className="pt-1">
        <p className="small text-muted mb-1">Just now</p>
        <span className="badge bg-danger rounded-pill float-end">3</span>
      </div>
    </div>
  );
};

export default Friends;

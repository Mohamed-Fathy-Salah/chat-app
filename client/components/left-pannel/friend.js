const Friend = ({ data }) => {
  return (
    <div>
      <div className="d-flex flex-row">
        <div>
          <img
            src={data.photo}
            alt="avatar"
            className="d-flex align-self-center me-3"
            width={60}
          />
          <span className="badge bg-success badge-dot" />
        </div>
        <div className="pt-1">
          <p className="fw-bold mb-0">{data.name}</p>
          <p className="small text-muted">{data.email}</p>
        </div>
      </div>
      <div className="pt-1">
        <p className="small text-muted mb-1">Just now</p>
        <span className="badge bg-danger rounded-pill float-end">3</span>
      </div>
    </div>
  );
};

export default Friend;

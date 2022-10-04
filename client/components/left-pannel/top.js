import AddFriend from "./popups/add-friend";
import CreateGroup from "./popups/create-group";

const Top = ({ data, updateFriends, updateGroups }) => {
  return (
    <nav className="navbar navbar-light bg-light">
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
          <p className="fw-bold mb-0">{data.id + " " + data.name}</p>
          <p className="small text-muted">{data.email}</p>
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          <li className="nav-item">
            <AddFriend update={updateFriends} />
          </li>
          <li className="nav-item">
            <CreateGroup update={updateGroups} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Top;

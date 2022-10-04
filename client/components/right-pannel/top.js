import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import AddFriend from "./popups/add-friend";

const Top = ({ data, socket }) => {
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
          <p className="fw-bold mb-0">{data.name}</p>
          {data.email ? <p className="small text-muted">{data.email}</p> : null}
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          {data.email ? null : (
            <li className="nav-item">
              <AddFriend groupId={data.id} socket={socket} />
            </li>
          )}
          <li className="nav-item">
            <a className="nav-link">
              <FontAwesomeIcon icon={faCog} />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Top;

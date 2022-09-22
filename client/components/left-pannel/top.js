import AddFriend from "./popups/add-friend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

const Top = ({ photo, update }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div>
        <img
          src={photo}
          alt="avatar"
          className="d-flex align-self-center me-3"
          width={60}
        />
      </div>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          <li className="nav-item">
            <AddFriend update={update} />
          </li>
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

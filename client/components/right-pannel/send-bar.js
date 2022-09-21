import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faPaperclip, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const SendBar = () => {
  return (
    <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
      <img
        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
        alt="avatar 3"
        style={{ width: "40px", height: "100%" }}
      />
      <input
        type="text"
        className="form-control form-control-lg"
        id="exampleFormControlInput2"
        placeholder="Type message"
      />
      <a className="ms-1 text-muted" href="#!">
        <FontAwesomeIcon icon={faFaceSmile} />
      </a>
      <a className="ms-3 text-muted" href="#!">
        <FontAwesomeIcon icon={faPaperclip} />
      </a>
      <a className="ms-3" href="#!">
        <FontAwesomeIcon icon={faPaperPlane} />
      </a>
    </div>
  );
};

export default SendBar;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useId, useRef, useState } from "react";
import client from "../../../api/build-client";

const AddFriend = ({ groupId, socket }) => {
  const userId = useRef();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleAdd = () => {
    client()
      .post("/connection/user", { groupId, userId: userId.current.value })
      .then((e) => {
        userId.current.value = "";
        socket.emit("userJoined", { groupId, userId: userId.current.value });
      })
      .catch((e) => {
        console.error("error = ", e);
      });
  };

  return (
    <>
      <a className="nav-link" onClick={handleOpen}>
        <FontAwesomeIcon icon={faUser} />
      </a>
      <Modal show={open} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Add Friend</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row searchBox">
            <div className="col-sm-12 searchBox-inner">
              <div className="form-group has-feedback">
                <input
                  id="searchText"
                  type="number"
                  className="form-control"
                  name="searchText"
                  placeholder="Friend Id"
                  ref={userId}
                />
                <span className="glyphicon glyphicon-search form-control-feedback" />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddFriend;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useRef, useState } from "react";
import client from "../../../api/build-client";

const AddFriend = ({ update }) => {
  const id = useRef();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleAdd = () => {
    client()
      .post("/friend", { friendId: parseInt(id.current.value) })
      .then((v) => {
        update();
      })
      .catch((e) => {
        console.error(e);
      });
    setOpen(false);
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
                  ref={id}
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

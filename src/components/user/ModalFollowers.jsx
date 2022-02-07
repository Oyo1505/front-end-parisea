import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";

const ModalFollowers = ({ open, users, onCloseModal }) => {
  return (
    <div className="modal-follow">
      <Modal open={open} onClose={onCloseModal}>
        <ul>
          {users.map((e) => (
            <li>
              <Link to={`/${e._id}`} onClick={onCloseModal}>
                {e.name}
              </Link>
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export default ModalFollowers;

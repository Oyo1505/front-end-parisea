import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";
import "../../assets/css/user/user-info-style.css";

const ModalFollowers = ({ open, users, onCloseModal }) => {
  return (
    <div className="modal-follow">
      <Modal
        open={open}
        center
        onClose={onCloseModal}
        classNames={{
          overlay: "customOverlay",
          modal: "customModal",
        }}
      >
        <ul>
          {users.map((e) => (
            <li>
              <Link to={`/profile/${e._id}`} onClick={onCloseModal}>
                <div className="modal-list">
                  <div className="modal-list-user">
                    <div className="image-modal">
                      <img className="img-modal-user" src={e.image} alt="" />
                    </div>
                    <div className="name-username">
                      {e.name} <br />@{e.userName}
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export default ModalFollowers;

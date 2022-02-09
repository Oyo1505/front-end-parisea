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
        {users.length === 0 ? (
          <di className="modal-list-empty">
            <p>Spread Love and NFTs</p>
            <p>Follow amazing artists now !</p>
          </di>
        ) : (
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
                        <span className="name-in-modal">{e.name}</span>
                        <span className="username-in-modal">@{e.userName}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Modal>
    </div>
  );
};

export default ModalFollowers;

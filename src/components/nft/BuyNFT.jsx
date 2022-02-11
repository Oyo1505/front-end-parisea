import React, { useState } from "react";
import APIHandler from "../../api/APIHandler";
import { useNavigate } from "react-router-dom";
import Modal from "react-responsive-modal";
const BuyNFT = ({ nftId, buyerId }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const onCloseModal = () => {
    setOpen(false);
    navigate("/");
  };
  const handleSubmit = async () => {
    setOpen(true);
    try {
      await APIHandler.patch(`/buy-nft/${nftId}/${buyerId}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          color: "white",
          border: "none",
          background: "none",
        }}
        onClick={handleSubmit}
      >
        <p style={{ fontFamily: "ClashGrotesk-SemiBold", cursor: "pointer" }}>
          Buy
        </p>
      </button>
      <Modal
        styles={{
          width: "15%",
          height: "75px",
          textAlign: "center",
        }}
        open={open}
        onClose={onCloseModal}
        center
      >
        <h2 style={{ padding: "30px" }}>Thank you !</h2>
      </Modal>
    </>
  );
};

export default BuyNFT;

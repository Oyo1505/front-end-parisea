import React from "react";
import APIHandler from "../../api/APIHandler";

const BuyNFT = ({ nftId, buyerId }) => {
  const handleSubmit = async () => {
    try {
      await APIHandler.patch(`/buy-nft/${nftId}/${buyerId}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
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
  );
};

export default BuyNFT;

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

  return <button onClick={handleSubmit}>Buy</button>;
};

export default BuyNFT;

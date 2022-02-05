import React from "react";
import APIHandler from "../../api/APIHandler";

const ResellNFT = ({ nftId }) => {
  const handleSubmit = async () => {
    try {
      await APIHandler.patch(`/resell-nft/${nftId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <button onClick={handleSubmit}>Resell Your NFT</button>;
};
export default ResellNFT;

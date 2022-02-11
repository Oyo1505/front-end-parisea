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
      <p> Resell Your NFT</p>
    </button>
  );
};
export default ResellNFT;

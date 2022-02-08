import React from "react";

const CardNFT = ({ nft }) => {
  return (
    <div className="card-nft">
      <p>{nft.title}</p>
      <p>{nft.description}</p>
    </div>
  );
};

export default CardNFT;

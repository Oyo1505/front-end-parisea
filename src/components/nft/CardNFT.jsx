import React from "react";
import "../../assets/css/nft/card-nft.css";
const CardNFT = ({ nft }) => {
  return (
    <div
      className="card-nft"
      style={{
        backgroundImage: `url(${nft.image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <p>{nft.title}</p>
      <p>{nft.description}</p>
    </div>
  );
};

export default CardNFT;

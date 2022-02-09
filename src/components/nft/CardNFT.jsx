import React from "react";
import "../../assets/css/nft/card-nft.css";
const CardNFT = ({ nft }) => {
  console.log(nft);
  return (
    <>
       <div className="background-nft">

</div>
   
    <div
      className="card-nft"
      style={{
        backgroundImage: `url(${nft.image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
   
      <div>
        <div className="boder-blur-logo">
          <img
            className="logo-user-card"
            src={nft.creator.image}
            width="70"
            height="70"
          />
        </div>
      </div>
      <div className="content-nft-card">
        <div>
          <h4>{nft.title}</h4>
          <p>@{nft.creator.name}</p>
        </div>
        <p className="price-card">{nft.price} MHM</p>
      </div>
    </div>
    </>
  );
};

export default CardNFT;

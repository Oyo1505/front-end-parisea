import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/nft/card-nft.css";

const CardNFT = ({ nft }) => {
  if (nft.length === 0) return <p>tes</p>;
  return (
    <>
      <Link to={`/nfts/${nft._id}`}>
        <div className="nft-boxes">
          <div className="background-nft"></div>
          <div
            className="card-nft"
            style={{
              display: "flex",
              alignContent: "center",

              backgroundImage: `url(${nft.image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPositionX: "center",
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

                <p>@{nft.creator.userName}</p>
              </div>
              <p className="price-card">{nft.price} MHM</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CardNFT;

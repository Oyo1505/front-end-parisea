import React from "react";
import CardNFT from "./CardNFT";
import Trails from "../animations/Trails";
const ListCardsNFT = ({ nfts }) => {
  return (
    <div
      style={{ marginTop: "120px", marginLeft: "80px", marginRight: "80px" }}
    >
      <div>
        <h2
          style={{
            marginBottom: "25px",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <i style={{ fontSize: "10px" }} class="fa fa-circle"></i>
          Trending creations
        </h2>
        <hr style={{ marginBottom: "25px", height: 2, color: "#E6E6E6" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Trails>
          {nfts.map((nft) => {
            return <CardNFT key={nft._id} nft={nft} />;
          })}
        </Trails>
      </div>
    </div>
  );
};

export default ListCardsNFT;

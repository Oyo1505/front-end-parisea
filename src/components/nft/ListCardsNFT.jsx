import React from "react";
import CardNFT from "./CardNFT";
import Trails from "../animations/Trails";
import { Link } from "react-router-dom";

const ListCardsNFT = ({ nfts }) => {
  return (
    <div
      style={{ marginTop: "120px", marginLeft: "80px", marginRight: "80px" }}
    >
      <div style={{ borderBottom: "2px solid #E6E6E6" }}>
        <h2
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <i style={{ fontSize: "10px" }} class="fa fa-circle"></i>
          Trending creations
        </h2>
        {/* <hr style={{ marginBottom: "25px", height: 2, color: "#E6E6E6" }} /> */}
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "25px" }}
      >
        <Trails>
          {nfts.map((nft) => {
            return <CardNFT key={nft._id} nft={nft} />;
          })}
        </Trails>
      </div>
      <Link to={"/nfts"}>
        <button
          style={{ margin: "0 auto", marginTop: 25 }}
          className="edit-profile"
        >
          <p>View All</p>
        </button>
      </Link>
    </div>
  );
};

export default ListCardsNFT;

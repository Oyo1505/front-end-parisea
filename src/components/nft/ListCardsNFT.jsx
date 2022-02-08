import React from "react";
import CardNFT from "./CardNFT";
import Trails from "../animations/Trails";
const ListCardsNFT = ({ nfts }) => {
  return (
    <div className="list-cards-nfts">
      <Trails>
      {nfts.map((nft) => {
        return <CardNFT key={nft._id} nft={nft} />;
      })}
      </Trails>
    </div>
  );
};

export default ListCardsNFT;

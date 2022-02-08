import React from "react";
import CardNFT from "./CardNFT";

const ListCardsNFT = ({ nfts }) => {
  return (
    <div className="list-cards-nfts">
      {nfts.map((nft) => {
        return <CardNFT key={nft._id} nft={nft} />;
      })}
    </div>
  );
};

export default ListCardsNFT;

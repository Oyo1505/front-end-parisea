import React from "react";
import CardNFT from "./CardNFT";
import Trails from "../animations/Trails";
const ListCardsNFT = ({ nfts }) => {
  return (
    <>
      <Trails>
      {nfts.map((nft) => {
        return <CardNFT key={nft._id} nft={nft} />;
      })}
      </Trails>
    </>
  )
};

export default ListCardsNFT;

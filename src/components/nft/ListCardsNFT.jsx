import React from "react";
import CardNFT from "./CardNFT";
import Trails from "../animations/Trails";
const ListCardsNFT = ({ nfts }) => {
  return (
    <div style={{marginTop : '120px'}}>
    <h2 style={{marginBottom : '25px'}}>Last NFTs</h2>
      <Trails>
      {nfts.map((nft) => {
        return <CardNFT key={nft._id} nft={nft} />;
      })}
      </Trails>
    </div>
  )
};

export default ListCardsNFT;

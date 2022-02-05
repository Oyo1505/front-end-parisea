import React from "react";
import ListNFTMarketplace from "../nft/ListNFTMarketplace";
import RandomNFTMarketPlace from "../nft/RandomNFTMarketPlace";

const Marketplace = () => {
  return (
    <div>
      <h1>Marketplace</h1>
      <RandomNFTMarketPlace />
      <ListNFTMarketplace limit={5} />
    </div>
  );
};

export default Marketplace;

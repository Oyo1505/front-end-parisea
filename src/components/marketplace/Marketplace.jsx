import React from "react";
import ListNFTMarketplace from "../nft/ListNFTMarketplace";
import RandomNFTMarketPlace from "../nft/RandomNFTMarketPlace";

const Marketplace = () => {
  return (
    <>
      <RandomNFTMarketPlace />
      <ListNFTMarketplace limit={10} />
    </>
  );
};

export default Marketplace;

import React from "react";
import ListNFTMarketplace from "../nft/ListNFTMarketplace";
import RandomNFTMarketPlace from "../nft/RandomNFTMarketPlace";
import ListPostsMarketplace from "../posts/ListPostsMarketplace";

const Marketplace = () => {
  return (
    <div>
      <RandomNFTMarketPlace />
      <ListNFTMarketplace  limit={10} />
      <ListPostsMarketplace  limit={10} />
    </div>
  );
};

export default Marketplace;

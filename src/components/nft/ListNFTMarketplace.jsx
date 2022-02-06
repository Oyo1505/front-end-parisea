import React, { useEffect, useState } from "react";

import APIHandler from "../../api/APIHandler";

const ListNFTMarketplace = ({ limit }) => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const x = async () => {
      try {
        const { data } = await APIHandler.get(`/nfts/${limit}`);
        console.log(data);
        setNfts(data);
      } catch (e) {
        console(e);
      }
    };
    x();
  }, []);
  if (nfts.length === 0) return <p>no Items to show</p>;
  return (
    <div>
      {nfts.map((nft) => {
        return <>{nft.title}</>;
      })}
    </div>
  );
};

export default ListNFTMarketplace;

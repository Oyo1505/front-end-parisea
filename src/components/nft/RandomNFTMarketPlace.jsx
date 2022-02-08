import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import APIHandler from "../../api/APIHandler";
import Loading from "../loading/Loading";

const RandomNFTMarketPlace = () => {
  const [nft, setNft] = useState([]);

  useEffect(() => {
    const x = async () => {
      try {
        const { data } = await APIHandler.get("/random-nft");
        setNft(data);
      } catch (e) {
        console.log(e);
      }
    };
    x();
  }, []);
  if (nft.length === 0) return <p>NO item</p>;
  return (
    <div>
      <Link to={`nfts/${nft._id}`}>
        <h2>The choices that we make</h2>
        <div>
          <img src={nft.image} />
          <p>Creator : {nft.creator.name}</p>
        </div>
      </Link>
    </div>
  );
};

export default RandomNFTMarketPlace;

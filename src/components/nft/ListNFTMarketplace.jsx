import React, { useEffect, useState } from "react";
import APIHandler from "../../api/APIHandler";
import Loading from "../loading/Loading";
import ListCardsNFT from "./ListCardsNFT";

const ListNFTMarketplace = ({ limit }) => {
  const [nfts, setNfts] = useState([]);
  useEffect(() => {
    const x = async () => {
      try {
        const { data } = await APIHandler.get(`/nfts/market/${limit}`);
        setNfts(data);
      } catch (e) {
        console.error(e);
      }
    };
    x();
  }, []);
  if (nfts.length === 0) return <Loading />;
  return <ListCardsNFT nfts={nfts} />;
};

export default ListNFTMarketplace;

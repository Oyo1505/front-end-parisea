import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import APIHandler from "../../api/APIHandler";
import useAuth from "../user/UseAuth";
import BuyNFT from "./BuyNFT";
import ResellNFT from "./ResellNFT";
const SingleNFT = () => {
  const { user } = useAuth();
  const [nft, setNft] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const x = async () => {
      try {
        const { data } = await APIHandler.get(`/nfts/${id}`);
        setNft(data);
      } catch (e) {
        console.error(e);
      }
    };
    x();
  }, [id]);
  const showBuyBtn = () => {
    if (nft.seller !== user[0]._id) {
      return <BuyNFT nftId={nft._id} buyerId={user[0]._id} />;
    }
  };
  // if (!user) return <p>Loading</p>;
  //console.log(nft.sold);
  return (
    <>
      <h1>{nft.title}</h1>
      <img src={nft.image} alt="nft" />
      <p>{nft.description}</p>
      <p>Price : {nft.price} MhM</p>
      {user[0]._id === nft.creator ? (
        <Link to={`/nfts-edit/${id}`}>Edit NFT</Link>
      ) : nft.sold === true ? (
        <ResellNFT nftId={nft._id} />
      ) : (
        showBuyBtn()
      )}
    </>
  );
};

export default SingleNFT;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import APIHandler from "../../api/APIHandler";
import Loading from "../loading/Loading";
import useAuth from "../user/UseAuth";
import BuyNFT from "./BuyNFT";
import ResellNFT from "./ResellNFT";
const SingleNFT = () => {
  const { currentUser } = useAuth();
  const [nft, setNft] = useState({});
  const { id } = useParams();

  const [added, setAdded] = useState(false);
  const emptyHeart = <i className="far fa-heart"></i>;
  const fullHeart = <i className="fas fa-heart"></i>;

  const toggle = () => {
    setAdded(!added);
  };
  {
    /*  mimi */
  }
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
    if (nft.seller !== currentUser[0]._id) {
      return <BuyNFT nftId={nft._id} buyerId={currentUser[0]._id} />;
    }
  };
  if (currentUser.length === 0 || Object.keys(nft).length === 0)
    return <p>loading</p>;

  return (
    <>
      <h1>{nft.title}</h1>
      <img src={nft.image} alt="nft" />
      <p>{nft.description}</p>
      <p>Price : {nft.price} MhM</p>
      <div>
        {Object.entries(nft).length !== 0 ? (
          <>
            <Link to={`/profile/${nft.creator._id}`}>
              <h5>{nft.creator.name}</h5>
            </Link>
          </>
        ) : (
          "d"
        )}
      </div>

      {currentUser[0]._id === nft.creator ? (
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

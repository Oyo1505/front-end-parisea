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
  // WISHLIST (MINYOUNG ADDED)
  const [cartAdded, setCartAdded] = useState(false);
  const removeFromCart = <i className="fas fa-bookmark"></i>;
  const addInCart = <i className="far fa-bookmark"></i>;
  // UNTIL HERE

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
        const { data } = await APIHandler.get(
          `/nfts/${id}/${currentUser[0]._id}`,
          {
            nft,
            userId: currentUser[0]._id,
          }
        );
        console.log("is this already inside cart?", data.cartAdded);
        setCartAdded(data.cartAdded);
        setNft(data.nft);
      } catch (e) {
        console.error(e);
      }
    };
    x();
  }, [id]);

  // WISHLIST (MINYOUNG ADDED)
  const handleCart = async (e) => {
    e.preventDefault();

    try {
      const { data } = await APIHandler.patch(
        `/wishlist/${id}/${currentUser[0]._id}`,
        {
          nftId: id,
          userId: currentUser[0]._id,
        }
      );
      console.log("Cart added >>", data.cartAdded);
      setCartAdded(data.cartAdded);
      setNft(data.nft);
    } catch (err) {
      console.log("OnSubmit err >>> ", err);
    }
  };

  // UNTIL HERE

  const showBuyBtn = () => {
    if (nft.seller !== currentUser[0]._id) {
      return <BuyNFT nftId={nft._id} buyerId={currentUser[0]._id} />;
    }
  };
  if (currentUser.length === 0 || Object.keys(nft).length === 0)
    return <Loading />;

  return (
    <>
      <h1>{nft.title}</h1>
      <img src={nft.image} alt="nft" />
      <p>{nft.description}</p>
      <p>Price : {nft.price} MhM</p>

      {/* WISHLIST (MINYOUNG ADDED) */}
      <div onClick={handleCart}>
        {cartAdded ? removeFromCart : addInCart}
        <div>
          {/* UNTIL HERE */}

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
      </div>

      {currentUser[0]._id === nft.creator._id ? (
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

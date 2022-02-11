import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import APIHandler from "../../api/APIHandler";
import Loading from "../loading/Loading";
import useAuth from "../user/UseAuth";
import BuyNFT from "./BuyNFT";
import ResellNFT from "./ResellNFT";
import "../../assets/css/nft/single-nft.css";

const SingleNFT = () => {
  const { currentUser } = useAuth();
  const [nft, setNft] = useState({});
  const { id } = useParams();
  const [cartAdded, setCartAdded] = useState(false);
  const removeFromCart = (
    <i
      style={{
        width: 50,
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="fas fa-bookmark"
    ></i>
  );
  const addInCart = (
    <i
      style={{
        width: 50,
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="far fa-bookmark"
    ></i>
  );

  useEffect(() => {
    const x = async () => {
      try {
        if (currentUser) {
          const { data } = await APIHandler.get(
            `/nfts/single/${id}/${currentUser[0]._id}`,
            {
              nft,
              userId: currentUser[0]._id,
            }
          );
          setCartAdded(data.cartAdded);
          setNft(data.nft);
        }
      } catch (e) {
        console.error(e);
      }
    };
    x();
  }, [id]);

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
      console.log("Cart added >>", data);
      setCartAdded(data.cartAdded);
      setNft(data.nft);
      console.log(data.nft);
    } catch (err) {
      console.log("OnSubmit err >>> ", err);
    }
  };

  const showBuyBtn = () => {
    if (nft.seller !== currentUser[0]._id) {
      return <BuyNFT nftId={nft._id} buyerId={currentUser[0]._id} />;
    } else {
      return "On sale";
    }
  };
  if (currentUser.length === 0 || Object.keys(nft).length === 0)
    return <Loading />;

  console.log("currentUser", currentUser[0]._id);
  console.log("nft.creator", nft.creator._id);
  return (
    <>
      <div className="random-nft-home">
        <div className="random-pic-home">
          <img src={nft.image} alt="nft" />
        </div>
        <div>
          <h2 className="random-title">{nft.title}</h2>
          <div className="random-component-home">
            <div className="created-by">
              <div>
                <p className="created-by-title">Created by</p>
                <div
                  onClick={handleCart}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      alignContent: "center",
                      gap: 30,
                    }}
                  >
                    {Object.entries(nft).length !== 0 ? (
                      <>
                        <Link
                          className="profile-random-creator"
                          to={`/profile/${nft.creator._id}`}
                          style={{ marginBottom: 15 }}
                        >
                          <img
                            className="profile-pic-random"
                            src={nft.creator.image}
                            alt=""
                          />
                          <p>{nft.creator.name}</p>
                        </Link>
                      </>
                    ) : (
                      "d"
                    )}
                    {nft.creator._id !== currentUser[0]._id && (
                      <div className="twitter">
                        {cartAdded ? removeFromCart : addInCart}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <p className="created-by-title">Current Price</p>
                  <p className="random-nft-price">{nft.price} MHM</p>
                </div>
                <div>
                  <p className="created-by-title">Description</p>
                  <h2>{nft.description}</h2>
                </div>
              </div>
            </div>
            <div
              className="btn-view-random"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                color: "white",
              }}
            >
              {currentUser[0]._id === nft.creator._id ? (
                <Link
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    color: "white",
                  }}
                  to={`/nfts-edit/${id}`}
                >
                  Edit NFT
                </Link>
              ) : nft.sold === true ? (
                <ResellNFT
                  nftId={nft._id}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    color: "white",
                  }}
                />
              ) : (
                showBuyBtn()
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleNFT;

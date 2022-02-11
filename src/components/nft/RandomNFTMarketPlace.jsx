import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import APIHandler from "../../api/APIHandler";
import Loading from "../loading/Loading";
import "../../assets/css/homepage/home.css";
import { useSpring, animated } from "react-spring";
import useAuth from "../user/UseAuth";

const RandomNFTMarketPlace = () => {
  const { currentUser } = useAuth();

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

  const [nft, setNft] = useState([]);

  const contentProps = useSpring({
    config: { duration: 300 },
    opacity: 1,
    x: 0,
    from: { opacity: 0, x: -80 },
  });
  const titleNftProps = useSpring({
    config: { duration: 400 },
    opacity: 1,
    x: 0,
    delay: 500,
    from: { opacity: 0, x: 20 },
  });

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
  if (Object.keys(nft).length === 0) return <p>NO item</p>;

  const handleCart = async (e) => {
    e.preventDefault();

    try {
      const { data } = await APIHandler.patch(
        `/wishlist/${nft.id}/${currentUser[0]._id}`,
        {
          nftId: nft.id,
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

  return (
    <div

    // className="random-nft-home-container"
    >
      <animated.div style={contentProps}>
        <div className="random-nft-home">
          <div className="random-pic-home">
            <img src={nft.image} alt="" />
          </div>
          <animated.div style={titleNftProps}>
            <h2>
              <Link className="random-title" to={`nfts/${nft._id}`}>
                {nft.title}
              </Link>
            </h2>
            <div className="random-component-home">
              <div className="created-by">
                <Link to={`/profile/${nft.creator._id}`}>
                  <div>
                    <p className="created-by-title">Created by</p>
                  </div>

                  <div
                    style={{ display: "flex", alignItems: "center" }}
                    className="profile-random-creator"
                  >
                    <img
                      className="profile-pic-random"
                      src={nft.creator.image}
                      alt=""
                    />

                    <p>{nft.creator.name}</p>
                  </div>
                </Link>
              </div>
              {/* {nft.creator._id !== currentUser[0]._id && (
                <div className="twitter">
                  {cartAdded ? removeFromCart : addInCart}
                </div>
              )} */}
              <div>
                <p className="created-by-title">Current Price</p>
                <p className="random-nft-price">{nft.price} MHM</p>
              </div>
              <Link to={`nfts/${nft._id}`}>
                <button className="btn-view-random">View NFT</button>
              </Link>
            </div>
          </animated.div>
        </div>
      </animated.div>
    </div>
  );
};

export default RandomNFTMarketPlace;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import APIHandler from "../../api/APIHandler";
import Loading from "../loading/Loading";
import "../../assets/css/homepage/home.css";
import { useSpring, animated } from "react-spring";

const RandomNFTMarketPlace = () => {
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
  const titleProps = useSpring({
    config: { duration: 400 },
    opacity: 1,
    delay: 700,
    from: { opacity: 0 },
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
  return (
    <div className="random-nft-home-container">
      <animated.h2 style={titleProps}>The choices that we make</animated.h2>
      <animated.div style={contentProps}>
        <div className="random-nft-home">
          <div style={{ height: "500px" }}>
            <img src={nft.image} className="random-pic-home" />
          </div>
          <animated.div style={titleNftProps}>
            <h2>
              <Link to={`nfts/${nft._id}`}>{nft.title}</Link>
            </h2>
            <div>
              <div>Creator by </div>
              <div>{nft.creator.name}</div>
            </div>
            <Link to={`nfts/${nft._id}`}>View NFT</Link>
          </animated.div>
        </div>
      </animated.div>
    </div>
  );
};

export default RandomNFTMarketPlace;

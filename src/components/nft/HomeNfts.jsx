import React, { useEffect, useState } from "react";
import useAuth from "../user/UseAuth";
import Loading from "../loading/Loading";
import APIHandler from "../../api/APIHandler";
import CardNFT from "./CardNFT";
import { useTrail, animated, config } from "react-spring";

// import Trails from "../animations/Trails";

const Trails = ({ children }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 1, tension: 180, friction: 15 },
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: 40 },
  });
  if (items.length === 0) return <Loading />;
  return (
    <>
      <div className="list-cards-nfts">
        {trail.map(({ y, opacity }, index) => (
          <animated.div
            key={index}
            style={{
              transform: y.interpolate((y) => `translate3d(0px,${y}px,0)`),
              position: "relative",
            }}
          >
            <animated.div style={{ opacity }} key={items[index]._id}>
              {items[index]}
            </animated.div>
          </animated.div>
        ))}
      </div>
    </>
  );
};

const HomeNfts = () => {
  const { currentUser } = useAuth();
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await APIHandler.get(`/nfts`);
      console.log(res.data);
      setNfts(res.data).reverse();
    })();
  }, []);

  if (currentUser.length === 0 && nfts.length === 0) return <Loading />;

  return (
    <div style={{ marginBottom: "30px" }}>
      <Trails>
        {nfts.map((nft) => {
          const id = String(nft._id);

          return (
            <div>
              <CardNFT key={id} nft={nft} />
            </div>
          );
        })}
      </Trails>
    </div>
  );
};

export default HomeNfts;

import React, { useEffect, useState } from "react";
import APIHandler from "../../api/APIHandler";
import { Link, useParams } from "react-router-dom";
import MyPosts from "./../posts/MyPosts";
import CardNFT from "./CardNFT";
import { useTrail, animated, config } from "react-spring";
import "../../assets/css/animation/animation.css";

const Trails = ({ children }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 1, tension: 180, friction: 15 },
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: 40 },
  });

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
const ListNftsUserProfile = ({ mode, userId }) => {
  const [items, setItems] = useState();

  useEffect(() => {
    const x = async () => {
      try {
        if (mode === "creator" || mode === "owner") {
          const { data } = await APIHandler.get(`/list-nfts/${mode}/${userId}`);
          setItems(data);
        }
      } catch (e) {
        console.error(e);
      }
    };
    x();
  }, [mode]);
  useEffect(() => {
    const x = async () => {
      try {
        const { data } = await APIHandler.get(`/list-nfts/creator/${userId}`);
        setItems(data);
      } catch (e) {
        console.error(e);
      }
    };
    x();
  }, [userId]);
  return (
    <>
      {items ? (
        <>
          {mode === "posts" ? (
            <MyPosts />
          ) : (
            <>
              <Trails>
                {items.map((item) => {
                  return <CardNFT key={item._id} nft={item} />;
                })}
              </Trails>
            </>
          )}
        </>
      ) : (
        <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>
      )}{" "}
    </>
  );
};

export default ListNftsUserProfile;

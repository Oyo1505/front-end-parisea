import React, { useEffect, useState } from "react";
import APIHandler from "../../api/APIHandler";
import MyPosts from "./../posts/MyPosts";
import CardNFT from "./CardNFT";

import "../../assets/css/animation/animation.css";
import Loading from "../loading/Loading";
import TrailUserProfile from "../animations/TrailUserProfile";

const ListNftsUserProfile = ({ mode, userId }) => {
  const [items, setItems] = useState();

  useEffect(() => {
    const x = async () => {
      try {
        if (mode === "creator" || mode === "owner") {
          const { data } = await APIHandler.get(`/list-nfts/${mode}/${userId}`);
          setItems(data);
        } else if (mode === "posts") {
          const { data } = await APIHandler.get(`/posts/mypost/${userId}`);
          setItems(data);
        } else if (mode === "wishlists") {
          const { data } = await APIHandler.get(`/wishlist/${userId}`);
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
          {mode === "posts" && <MyPosts />}
          {mode === "wishlists" && (
            <TrailUserProfile>
              {items.map((item) => {
                return <CardNFT key={item._id} nft={item} />;
              })}
            </TrailUserProfile>
          )}
          {mode === "creator" && (
            <TrailUserProfile>
              {items.map((item) => {
                return <CardNFT key={item._id} nft={item} />;
              })}
            </TrailUserProfile>
          )}
          {mode === "owner" && (
            <TrailUserProfile>
              {items.map((item) => {
                return <CardNFT key={item._id} nft={item} />;
              })}
            </TrailUserProfile>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ListNftsUserProfile;

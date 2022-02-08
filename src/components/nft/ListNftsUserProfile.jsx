import React, { useEffect, useState } from "react";
import APIHandler from "../../api/APIHandler";
import { Link } from "react-router-dom";
import MyPosts from "./../posts/MyPosts";

const ListNftsUserProfile = ({ mode, userId }) => {
  const [items, setItems] = useState();

  useEffect(() => {
    const x = async () => {
      try {
        if (mode === "creator" || mode === "owner") {
          const { data } = await APIHandler.get(`/list-nfts/${mode}/${userId}`);
<<<<<<< HEAD
          setNfts(data);
        } else {
          // const { data } = await APIHandler.get(`/list-posts/${mode}/${userId}`);
          setNfts([]);
=======
          setItems(data);
        } else {
          const { data } = await APIHandler.get(`/posts/mypost/${userId}`);
          setItems(data);
>>>>>>> fd0e2c0c179dc39bcd186768c68f1901a080ec70
        }
      } catch (e) {
        console.error(e);
      }
    };
    x();
  }, [mode]);

  return (
    <div className="nfts">
      <h4>Mode : {mode}</h4>
      {items ? (
        <div>
          {mode === "posts" ? (
            <MyPosts />
          ) : (
            items.map((el) => {
              return (
                <Link to={`/nfts/${el._id}`} key={el._id}>
                  {" "}
                  NFT title : {el.title} <p>User ID : {el.creator}</p>
                </Link>
              );
            })
          )}
        </div>
      ) : (
<<<<<<< HEAD
        nfts.map((el) => {
          return (
            <div key={el._id}>
              <Link to={`/nfts/${el._id}`}>{el.title}</Link>
              <p>{el.creator}</p>
            </div>
          );
        })
      )}
=======
        <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>
      )}{" "}
>>>>>>> fd0e2c0c179dc39bcd186768c68f1901a080ec70
    </div>
  );
};

export default ListNftsUserProfile;

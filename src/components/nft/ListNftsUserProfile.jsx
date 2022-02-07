import React, { useEffect, useState } from "react";
import APIHandler from "../../api/APIHandler";
import { Link } from "react-router-dom";
const ListNftsUserProfile = ({ mode, userId }) => {
  const [nfts, setNfts] = useState([]);
  useEffect(() => {
    const x = async () => {
      try {
        if (mode === "creator" || mode === "owner") {
          const { data } = await APIHandler.get(`/list-nfts/${mode}/${userId}`);
          setNfts(data);
        } else {
          // const { data } = await APIHandler.get(`/list-posts/${mode}/${userId}`);
          setNfts([]);
        }
      } catch (e) {
        console.error(e);
      }
    };
    x();
  }, [mode]);

  return (
    <div className="nfts">
      <h4>{mode}</h4>
      {!nfts.length ? (
        <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>
      ) : (
        nfts.map((el) => {
          return (
            <div key={el._id}>
              <Link to={`/nfts/${el._id}`}>{el.title}</Link>
              <p>{el.creator}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ListNftsUserProfile;

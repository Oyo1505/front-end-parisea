import React, { useEffect, useState } from "react";
import APIHandler from "../../api/APIHandler";
import { Link } from "react-router-dom";
const ListNftsUserProfile = ({ mode, userId }) => {
  const [nfts, setNfts] = useState([]);
  useEffect(() => {
    const x = async () => {
      try {
        const { data } = await APIHandler.get(`/list-nfts/${mode}/${userId}`);
        setNfts(data);
      } catch (e) {
        console.error(e);
      }
    };
    x();
  }, []);

  return (
    <div className="nfts">
      <div>
        <Link to={"/nfts/create-item"}>Create NFT</Link>
      </div>

      {!nfts.length ? (
        <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>
      ) : (
        nfts.map((el) => {
          return (
            <div>
              <Link to={el._id} key={el._id}>
                {el.title}
              </Link>
              <p>{el.creator}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ListNftsUserProfile;

import React, { useEffect, useState } from "react";
import APIHandler from "../../api/APIHandler";
import { Link } from "react-router-dom";
import useAuth from "../user/UseAuth";
const ListNfts = (props) => {
  const [nfts, setNfts] = useState([]);
 
  useEffect(async () => {
    try {
      const { data } = await APIHandler.get("/nfts");
      setNfts(data);
    } catch (e) {
      console.error(e);
    }
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
            <Link to={el._id} key={el._id}>
              {el.title}
            </Link>
          );
        })
      )}
    </div>
  );
};

export default ListNfts;

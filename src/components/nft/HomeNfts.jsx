import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";
import useAuth from "../user/UseAuth";

import ListNftsUserProfile from "./ListNftsUserProfile";

const HomeNfts = () => {
  const { currentUser } = useAuth();
  useEffect(() => {
    const x = async () => {
      try {
        axios
          .get("https://api.opensea.io/api/v1/collection/doodles-official")
          .then((response) => response.json())
          .then((response) => console.log(response))
          .catch((err) => console.error(err));
      } catch (e) {
        console.error(e);
      }
    };
  }, []);
<<<<<<< HEAD
  if (user.length === 0) return <p>lod</p>;
=======
  if (currentUser.length === 0) return <p>Loading</p>;
>>>>>>> 925002a46a0376abebfa2832e022769cccac80e4
  return (
    <div>
        <div>
        <Link to={"/nfts/create-item"}>Create NFT</Link>
      </div>

      <h1>Created</h1>
      <ListNftsUserProfile mode={"creator"} userId={currentUser[0]._id} />
      <h1>Owned</h1>
      <ListNftsUserProfile mode={"owner"} userId={currentUser[0]._id} />
    </div>
  );
};

export default HomeNfts;

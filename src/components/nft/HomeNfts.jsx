import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "../user/UseAuth";

import ListNftsUserProfile from "./ListNftsUserProfile";

const HomeNfts = () => {
  const { user } = useAuth();
  useEffect(() => {
    const x = async () => {
      try {
        axios
          .get("https://api.opensea.io/api/v1/collection/doodles-official")
          .then((response) => response.json())
          .then((response) => console.log(response))
          .catch((err) => console.error(err));
      } catch (e) {
        console.log(e);
      }
    };
  }, []);
  console.log(user[0]);
  return (
    <div>
      <h1>Created</h1>
      <ListNftsUserProfile mode={"creator"} userId={user[0]._id} />
      <h1>Owned</h1>
      <ListNftsUserProfile mode={"owner"} userId={user[0]._id} />
    </div>
  );
};

export default HomeNfts;

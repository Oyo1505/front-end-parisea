import { useState, useEffect } from "react";
import APIHandler from "../../api/APIHandler";
import useAuth from "../user/UseAuth";
import Loading from "../loading/Loading";
import { useParams, Link } from "react-router-dom";
import "../../assets/css/wishlist/wishlist.css";
import CardNFT from "../nft/CardNFT";

const WishList = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [wishlists, setWishlists] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await APIHandler.get(`/wishlist/${id}`);
      console.log("data: >>", res.data);
      setWishlists(res.data);
    })();
  }, [currentUser[0]._id]);

  if (wishlists.length === 0) return <Loading />;

  return (
    <>
      {wishlists.map((wishlist) => {
        const id = String(wishlist._id);
        return <CardNFT key={id} nft={wishlist} />;
      })}
    </>
  );
};

export default WishList;

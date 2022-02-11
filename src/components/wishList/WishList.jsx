import { useState, useEffect } from "react";
import APIHandler from "../../api/APIHandler";
import Loading from "../loading/Loading";
import { useParams, Link } from "react-router-dom";
import CardNFT from "../nft/CardNFT";

const WishList = () => {
  const { id } = useParams();
  const [wishlists, setWishlists] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await APIHandler.get(`/wishlist/${id}`);
      setWishlists(res.data);
    })();
  }, [id]);

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

import { useState, useEffect } from "react";
import APIHandler from "../../api/APIHandler";
import useAuth from "../user/UseAuth";
import Loading from "../loading/Loading";
import { useParams, Link } from "react-router-dom";
import "../../assets/css/wishlist/wishlist.css";

const WishList = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [wishlists, setWishlists] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await APIHandler.get(`/wishlist/${currentUser[0]._id}`);
      console.log("data: >>", res.data);
      setWishlists(res.data);
    })();
  }, [currentUser[0]._id]);

  const deleteWishlist = async (id) => {
    if (
      window.confirm("Are you sure you want to remove it from your wishlist?")
    ) {
      try {
        await APIHandler.patch(`/wishlist/delete/${id}/${currentUser[0]._id}`);
        setWishlists((existWishlist) => existWishlist.filter((x) => x._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (wishlists.length === 0) return <p>No wishlist yet</p>;

  return (
    <>
      <h1>My wishlist</h1>
      <div className="container">
        {wishlists.map((wishlist) => {
          const id = String(wishlist._id);
          return (
            <div className="wishlist" key={id}>
              <img src={wishlist.image} alt="" />
              <div className="wishlistBody">
                <div className="wishlistDetail">
                  <h2>{wishlist.price} MHM</h2>
                  <h2 className="wishlistSoldOrNot">
                    {wishlist.sold === false ? "STILL AVALIABLE" : "SOLD"}
                  </h2>
                  <br></br>
                  <p>Title : {wishlist.title}</p>
                  <p>Description : {wishlist.description}</p>
                </div>

                <div className="wishListIcons">
                  <div className="wishListIcon">
                    <Link to={`/nfts/${wishlist._id}`}>
                      <i class="fa fa-search"></i>
                    </Link>
                  </div>
                  <div
                    className="wishListIcon"
                    onClick={() => deleteWishlist(wishlist._id)}
                  >
                    <i className="far fa-trash-alt"></i>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WishList;

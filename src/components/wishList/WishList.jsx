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

  console.log(id);
  useEffect(() => {
    (async () => {
      const res = await APIHandler.get(`/wishlist/${currentUser[0]._id}`);
      console.log("data: >>", res.data);
      setWishlists(res.data);
    })();
  }, [currentUser[0]._id]);

  const deleteWishlist = async (id) => {
    if (
      window.confirm("Are you sure you want to delete it from your wishlist?")
    ) {
      try {
        await APIHandler.post(`/wishlist/delete/${id}/${currentUser[0]._id}`);
        // updateState((existPost) => existPost.filter((x) => x._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  // if (wishlists.length === 0) return <Loading />;

  return (
    <>
      <h1>Wishlist</h1>
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
                    <i className="fas fa-heart"></i> DETAIL
                  </div>
                  <div className="wishListIcon" onClick={deleteWishlist}>
                    <i className="far fa-heart"></i> REMOVE
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

import React, { useState } from "react";
import APIHandler from "./../../api/APIHandler";

const LikeBtn = () => {
  //   const [isFavorite, setIsFavorite] = useState({
  //     isAlreadyFavorite: false,
  //   });
  //   const toggleFavorite = () => {
  //     APIHandler.patch(`/posts/favorites/${resourceType}/${resourceId}`, {})
  //       .then((apiRes) => {
  //         console.log(apiRes.data);
  //         setIsFavorite(apiRes.data.isFavorite === true);
  //       })
  //       .catch((apiErr) => console.error(apiErr));
  //   };
  //   return (
  //     <div className="likeIcon" onClick={toggleFavorite}>
  //       {isFavorite ? (
  //         <i className="fas fa-heart"></i>
  //       ) : (
  //         <i className="far fa-heart"></i>
  //       )}
  //     </div>
  // );
};

export default LikeBtn;

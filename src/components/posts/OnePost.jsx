// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import APIHandler from "../../api/APIHandler";

// const OnePost = () => {
//   const [post, setPost] = useState(null);
//   const { id } = useParams();

//   useEffect(async () => {
//     const { data } = await APIHandler.get.get("/api/post/" + id);
//     console.log(data);
//     setPost(data);
//   }, [id]);

//   return (
//     <>
//       {post ? (
//         <>
//           <p>{post.description}</p>
//           <img src={post.image} alt="" />
//         </>
//       ) : (
//         <p>No post</p>
//       )}
//     </>
//   );
// };

// export default OnePost;

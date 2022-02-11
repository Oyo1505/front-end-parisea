import React, { useEffect, useState } from "react";
import APIHandler from "../../api/APIHandler";
import Loading from "../loading/Loading";
import ListPosts from "./ListPosts";

const ListPostsMarketplace = ({ limit, title }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const x = async () => {
      try {
        const { data } = await APIHandler.get(`/posts/market/${limit}`);

        setPosts(data);
      } catch (e) {
        console.error(e);
      }
    };
    x();
  }, []);
  if (posts.length === 0) return <Loading />;

  return <ListPosts posts={posts} />;
};

export default ListPostsMarketplace;

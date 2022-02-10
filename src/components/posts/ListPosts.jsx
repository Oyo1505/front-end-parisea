import React from "react";
import Trails from "../animations/Trails";
import CardPost from "./CardPost";

const ListPosts = ({ posts }) => {
  return (
    <div style={{ marginTop: "120px" }}>
      <h2 style={{ marginBottom: "25px" }}>Lastest Posts</h2>
      <Trails>
        {posts.map((post) => {
          return <CardPost key={post._id} post={post} />;
        })}
      </Trails>
    </div>
  );
};

export default ListPosts;

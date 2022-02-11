import React from "react";
import Trails from "../animations/Trails";
import CardPost from "./CardPost";

const ListPosts = ({ posts }) => {
  return (
    <div
      style={{ marginTop: "120px", marginLeft: "80px", marginRight: "80px" }}
    >
      <div style={{ borderBottom: "2px solid #E6E6E6" }}>
        <h2
          style={{
            marginBottom: "25px",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <i style={{ fontSize: "10px" }} class="fa fa-circle"></i>
          Latest Posts
        </h2>
      </div>
      {/* <hr style={{ marginBottom: "25px", height: 2, color: "#E6E6E6" }} /> */}
      <div
        style={{ display: "flex", justifyContent: "center", margin: "25px" }}
      >
        <Trails>
          {posts.map((post) => {
            return <CardPost key={post._id} post={post} />;
          })}
        </Trails>
      </div>
    </div>
  );
};

export default ListPosts;

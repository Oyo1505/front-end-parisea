import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import AllPosts from "./components/posts/AllPosts";
import UserEdit from "./components/user/UserEdit";
import React, { useState, useEffect } from "react";
import Login from "./components/user/Login";
import UserProfile from "./components/user/UserProfile";

function App() {
  return (
    <>
      <div className="App">
        <a href="/">HOME</a>
        <Login />
        <a href="/posts">POSTS</a>

        <Routes>
          <Route path="/posts" element={<AllPosts />} />
          <Route path="/users/:id" element={<UserProfile />} />
          <Route path="/users/edit/:id" element={<UserEdit />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

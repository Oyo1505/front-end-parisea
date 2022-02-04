import "./App.css";
import { Routes, Route } from "react-router-dom";
import AllPosts from "./components/posts/AllPosts";
import FormCreatePost from "./components/posts/FormCreatePost";
import FormUpdatePost from "./components/posts/FormUpdatePost";

function App() {
  return (
    <>
      <div className="App">
        <a href="/">HOME</a>
        <a href="/posts">POSTS</a>
        <Routes>
          <Route path="/posts" element={<AllPosts />} />
          <Route path="/posts/create" element={<FormCreatePost />} />
          <Route path="/posts/:id" element={<FormUpdatePost />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

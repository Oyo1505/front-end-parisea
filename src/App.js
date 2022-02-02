import "./App.css";
import { Routes, Route } from "react-router-dom";
import AllPosts from "./components/posts/AllPosts";

function App() {
  return (
    <>
      <div className="App">
        <a href="/">HOME</a>
        <a href="/posts">POSTS</a>
        <Routes>
          <Route path="/posts" element={<AllPosts />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

import "./App.css";
import { Routes, Route } from "react-router-dom";
import AllPosts from "./components/posts/AllPosts";
<<<<<<< HEAD
import FormCreatePost from "./components/posts/FormCreatePost";
import FormUpdatePost from "./components/posts/FormUpdatePost";
=======
import ListNfts from "./components/nft/ListNfts";
import Header from "./components/header/Header";
import FormNFT from "./components/nft/FormNFT";
import SingleNFT from "./components/nft/SingleNFT";
import UserEdit from "./components/user/UserEdit";
import Login from "./components/user/Login";
import UserProfile from "./components/user/UserProfile";
>>>>>>> 990aac48360884d47982464feddd66dba6db10b3

function App() {
  return (
    <>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/posts" element={<AllPosts />} />
<<<<<<< HEAD
          <Route path="/posts/create" element={<FormCreatePost />} />
          <Route path="/posts/:id" element={<FormUpdatePost />} />
=======
          <Route path="/nfts" element={<ListNfts />} />
          <Route path="/nfts/create-item" element={<FormNFT />} />
          <Route path="/nfts/:id" element={<SingleNFT />} />
          <Route path="/nfts-edit/:id" element={<FormNFT />} />
          <Route path="/posts" element={<AllPosts />} />
          <Route path="/users/:id" element={<UserProfile />} />
          <Route path="/users/edit/:id" element={<UserEdit />} />
>>>>>>> 990aac48360884d47982464feddd66dba6db10b3
        </Routes>
      </div>
    </>
  );
}

export default App;

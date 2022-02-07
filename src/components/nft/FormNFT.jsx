import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import APIHandler from "../../api/APIHandler";
import useAuth from "../user/UseAuth";

const FormNFT = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [nft, setNft] = useState({
    title: "test",
    description: "test",
    price: 0,
    seller: null,
    owner: null,
    creator: null,
    sold: false,
  });

  const imageRef = useRef("");
  const navigate = useNavigate();
  useEffect(() => {
    const x = async () => {
      try {
        const { data } = await APIHandler.get(`/nfts/${id}`);
        setNft({
          title: data.title,
          description: data.description,
          price: data.price,
          image: data.image,
          seller: data.seller,
          owner: data.owner,
          creator: data.creator,
        });
      } catch (e) {
        console.error(e);
      }
    };
    x();
  }, [id]);

  useEffect(() => {
    setNft({
      creator: currentUser[0]._id,
      owner: currentUser[0]._id,
      seller: currentUser[0]._id,
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, price, owner, creator, seller, sold } = nft;
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("seller", seller);
    formData.append("owner", owner);
    formData.append("creator", creator);
    formData.append("sold", sold);

    // console.log("------ FORM DATA -----");
    // console.log(formData); // <= this looks like a empty object
    // for (let v of formData.entries()) {
    // an iterator is needed to actually see what you stored inside the formData object
    //   console.log(v);
    // }
    if (id) {
      const { data } = await APIHandler.patch(`/nfts-edit/${id}`, nft);
      setNft(data);
      navigate("/nfts");
    } else {
      formData.append("image", imageRef.current.files[0]);
      await APIHandler.post(`/nfts/create-item`, formData);
      navigate("/nfts");
    }
  };

  const handleDelete = async () => {
    try {
      await APIHandler.post(`/nfts/delete/${id}`);
      navigate("/nfts");
    } catch (e) {
      console.log(e);
    }
  };
  if (currentUser.length === 0) return <p>loading</p>;
  return (
    <>
      {id ? <h1>Update</h1> : <h1>Create</h1>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={nft.title}
            name="title"
            onChange={(e) => setNft({ ...nft, title: e.target.value })}
            type="text"
          />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            min={0}
            step={0.1}
            id="price"
            value={nft.price}
            name="price"
            onChange={(e) => setNft({ ...nft, price: e.target.value })}
            type="number"
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            value={nft.description}
            name="title"
            onChange={(e) => setNft({ ...nft, description: e.target.value })}
            type="text"
          />
        </div>
        {!id && (
          <div>
            <label htmlFor="description">Image</label>
            <input ref={imageRef} id="image" name="image" type="file" />
          </div>
        )}
        <div>{nft.image && <img src={nft.image} alt="-uploaded" />}</div>
        <button>{id ? "Update" : "Create"}</button>
      </form>
      {id && <button onClick={handleDelete}>Delete</button>}
    </>
  );
};

export default FormNFT;

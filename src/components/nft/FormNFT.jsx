import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import APIHandler from "../../api/APIHandler";

const FormNFT = () => {
  const { id } = useParams();
  const [nft, setNft] = useState({
    title: "test",
    description: "test",
    price: 1,
    seller: "61fbe7614062cc57767ce3d5",
    owner: "61fbe7614062cc57767ce3d5",
    creator: "61fbe7614062cc57767ce3d5",
  });
  const imageRef = useRef('')
  useEffect(async () => {
    try {
      const { data } = await APIHandler.get(`/nfts/${id}`);
      setNft({ title: data.title, description: data.description });
    } catch (e) {
      console.error(e);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, price, owner, creator, seller } = nft;
    console.log(price)
    const formData = new FormData(); 

    // appending the keys / values pairs to the FormData
    formData.append("title", title); // create a key [name] on the formDate
    formData.append("description", description); // create a key [age] on the formDate
    formData.append("price", price); 
    formData.append("seller", seller); 
    formData.append("owner", owner); 
    formData.append("creator", creator); 
    // last: accessing the image out of the ref ...
    formData.append("image", imageRef.current.files[0]); // target the image file associated to the input[type=file]

    // console.log("------ FORM DATA -----");
    // console.log(formData); // <= this looks like a empty object
    // for (let v of formData.entries()) {
    // an iterator is needed to actually see what you stored inside the formData object
    //   console.log(v);
    // }
    if (id) {
      const { data } = await APIHandler.patch(`/nfts-edit/${id}`, nft);
      setNft(data);
    } else {
      const res = await APIHandler.post(`/nfts/create-item`, formData);
      console.log(res)
    }
  };
  const handleImage = ()=>{
    console.log(imageRef.current.files[0])
  }
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
        <div>
          <label htmlFor="description">Image</label>
          <input
            ref={imageRef}
            id="image"
            name="image"
            onChange={(e) => handleImage(e)}
            type="file"
          />
          {imageRef.current.files?.[0]  && <img src={imageRef.current.files[0].name} />}
        </div>
        <div>
          <input
            id="seller"
            name="seller"
            type="hidden"
            value={nft.seller}
          />
        </div>
        <div>
          <input
            id="creator"
            name="creator"
            value={nft.create}
            type="hidden"
          />
        </div>
        <button>{id ? "Update" : "Create"}</button>
      </form>
    </>
  );
};

export default FormNFT;

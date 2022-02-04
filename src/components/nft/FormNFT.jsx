import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import APIHandler from "../../api/APIHandler";

const FormNFT = () => {
  const { id } = useParams();
  const [nft, setNft] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    seller: "",
    owner: "",
    creator: "",
  });

  useEffect(async () => {
    try {
      const { data } = await APIHandler.get(`/nfts/${id}`);

      setNft({ title: data.title, description: data.description });
    } catch (e) {
      console.log(e);
    }
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, image, price, owner } = nft;
    const formData = new FormData(); // create a form data => an object to send as post body

    // appending the keys / values pairs to the FormData
    formData.append("title", name); // create a key [name] on the formDate
    formData.append("age", age); // create a key [age] on the formDate
    formData.append("color", color); // create a key [color] on the formDate
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
      await APIHandler.post(`/nfts`, fd);
    }
  };
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
            id="image"
            name="image"
            onChange={(e) => setNft({ ...nft, image: e.target.value })}
            type="file"
          />
        </div>
        <div>
          <input
            id="seller"
            name="seller"
            onChange={() => setNft({ ...nft, owner: "0x0000000" })}
            type="hidden"
          />
        </div>
        <div>
          <input
            id="creator"
            name="creator"
            onChange={() => setNft({ ...nft, creator: "0x0000000" })}
            type="hidden"
          />
        </div>
        <button>{id ? "Update" : "Create"}</button>
      </form>
    </>
  );
};

export default FormNFT;

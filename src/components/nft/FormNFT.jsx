import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import APIHandler from "../../api/APIHandler";
import useAuth from "../user/UseAuth";
import Loading from "../loading/Loading";
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
  }, [currentUser]);

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
  if (currentUser.length === 0) return <Loading />
  return (
    <>
      <div className="container">
        {id ? <h1>Update</h1> : <h1>Create a NFT</h1>}
        <form className="postForm" onSubmit={handleSubmit}>
          {!id ? (
            <div className="postFormContent">
              <div className="postFormLabel">
                <h2 className="h2-create-post">Image</h2>
                <p className="postFormLabelText">
                  Share us your NTF news!<br></br>PNG & JPG accepted
                </p>
              </div>
             
              <label for="file">Choose your image file</label>
              <input
                className="postFormInput"
                ref={imageRef}
                id="image"
                name="image"
                type="file"
              />
            </div>
          ) : <div>{nft.image ?  <img src={nft.image} alt="-uploaded" /> : ""}</div> }
          <div className="postFormContent">
            <div className="postFormLabel">
              <h2 className="h2-create-post">Title</h2>
              <p className="postFormLabelText">Let's talk about it!</p>
            </div>
            <input
              className="postFormInput"
              id="title"
              value={nft.title}
              className="postFormInput"
              name="title"
              onChange={(e) => setNft({ ...nft, title: e.target.value })}
              type="text"
            />
          </div>

          <div className="postFormContent">
          <div className="postFormLabel">
              <h2 className="h2-create-post">Price</h2>
              <p className="postFormLabelText">Let's talk about it!</p>
            </div>
            <input
            className="postFormInput"
              min={0}
              step={0.1}
              id="price"
              value={nft.price}
              name="price"
              onChange={(e) => setNft({ ...nft, price: e.target.value })}
              type="number"
            />
          </div>

          <div className="postFormContent">
          <div className="postFormLabel">
              <h2 className="h2-create-post">Description</h2>
              <p className="postFormLabelText">Let's talk about it!</p>
            </div>
            <input
            className="postFormInput"
              id="description"
              value={nft.description}
              name="title"
              onChange={(e) => setNft({ ...nft, description: e.target.value })}
              type="textarea"
            />
          </div>

        
          <button className="postBtns">{id ? "Update" : "Create"}</button>
        </form>
        {id && <button  onClick={handleDelete}>Delete</button>}
      </div>
    </>
  );
};

export default FormNFT;

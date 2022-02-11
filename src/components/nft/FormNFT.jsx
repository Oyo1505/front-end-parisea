import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import APIHandler from "../../api/APIHandler";
import useAuth from "../user/UseAuth";
import Loading from "../loading/Loading";
import "../../assets/css/nft/createFormNft.css";

const FormNFT = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [imgPreviewSrc, setImgPreviewSrc] = useState("");
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
    if (currentUser === true) {
      setNft({
        creator: currentUser[0]._id,
        owner: currentUser[0]._id,
        seller: currentUser[0]._id,
      });
    }
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
      console.log(imgPreviewSrc);
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

  const encodeFileToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImgPreviewSrc(reader.result);
        resolve();
      };
    });
  };

  if (currentUser.length === 0 || !currentUser) return <Loading />;

  return (
    <>
      <div className="container">
        {id ? <h1>Update</h1> : <h1>Create a NFT</h1>}
        <form className="nftCreateForm" onSubmit={handleSubmit}>
          {!id ? (
            <div className="nftCreateFormContent">
              <div className="nftCreateFormLabel">
                <h2 className="h2-create-post">Upload File</h2>
                <p className="nftCreateFormLabelText">
                  Make sure each of your <br></br> creations are unique !
                  <br></br>
                  <br></br>PNG & JPG accepted
                </p>
              </div>

              <div className="imgPreviewDiv">
                <label for="file" className="imgPreview">
                  {imgPreviewSrc ? (
                    imgPreviewSrc && (
                      <img src={imgPreviewSrc} alt="previewImg" />
                    )
                  ) : (
                    <p className="chooseImg">Upload</p>
                  )}
                </label>
              </div>

              <input
                ref={imageRef}
                className="nftCreateFormInput"
                name="image"
                type="file"
                id="file"
                onChange={(e) => {
                  encodeFileToBase64(e.target.files[0]);
                }}
              />
            </div>
          ) : (
            <div>
              {nft.image ? (
                <img src={nft.image} alt="-uploaded" width="100%" />
              ) : (
                ""
              )}
            </div>
          )}
          <div className="nftCreateFormContent">
            <div className="nftCreateFormLabel">
              <h2 className="h2-create-post">Title</h2>
              <p className="nftCreateFormLabelText">
                Nothing is as better <br></br>as a catchy title !
              </p>
            </div>
            <input
              className="nftCreateFormInput"
              id="title"
              value={nft.title}
              name="title"
              onChange={(e) => setNft({ ...nft, title: e.target.value })}
              type="text"
            />
          </div>

          <div className="nftCreateFormContent">
            <div className="nftCreateFormLabel">
              <h2 className="h2-create-post">Price</h2>
              <p className="nftCreateFormLabelText">
                Enter price to allow <br></br> users instantly <br></br>
                purchase your NFT
              </p>
            </div>
            <input
              className="nftCreateFormInput"
              min={1}
              step={1}
              id="price"
              value={nft.price}
              name="price"
              onChange={(e) => setNft({ ...nft, price: e.target.value })}
              type="number"
            />
          </div>

          <div className="nftCreateFormContent">
            <div className="nftCreateFormLabel">
              <h2 className="h2-create-post">Description</h2>
              <p className="nftCreateFormLabelText">
                Tell us the story behind your amazing artwork !
              </p>
            </div>
            <textarea
              className="nftCreateFormInput"
              id="description"
              value={nft.description}
              name="title"
              placeholder="Desciption here"
              onChange={(e) => setNft({ ...nft, description: e.target.value })}
              type="textarea"
            />
          </div>

          <button className="postBtns">{id ? "Update" : "Create Now !"}</button>
        </form>
        {id && <button onClick={handleDelete}>Delete</button>}
      </div>
    </>
  );
};

export default FormNFT;

import React from "react";

const IconPreview = (props) => {
  const { clbk, image } = props;
  const fileInput = React.createRef();

  const handleClick = () => {
    fileInput.current.click();
  };

  return (
    <div>
      <div className="profile-image">
        <div className="section-padding">
          <div className="image-section">
            <label className="label-section-edit-profile" htmlFor="files">
              {image && <img width="350" src={image} />}
            </label>
          </div>
          <div>
            <h4 className="image-info">{image}</h4>
          </div>
          <input
            id="files"
            ref={image}
            name="image"
            type="file"
            // hidden
            onChange={clbk}
          />
          <button onClick={handleClick}>Upload</button>
        </div>
      </div>
    </div>
  );
};

export default IconPreview;

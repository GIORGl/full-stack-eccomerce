import React, { useState } from "react";
import axios from "axios";
import "./Upload.css";

function Upload() {
  const [productImg, setProductImg] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const onFileChange = (e) => {
    setProductImg(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("productImg", productImg);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);

    axios.post("http://localhost:3001/product", formData, {}).then((res) => {
      console.log(res);
    });
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:3001/products", {
        name,
        description,
        price,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="upload">
      <form className="upload__form" onSubmit={onSubmit}>
        <h1>Create your product!</h1>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name..."
        />
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholeder="description..."
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          placeholder="Price..."
        />
        <input name="productImg" type="file" onChange={onFileChange} />
        <button className="upload__button" type="submit">
          Upload
        </button>
        <button className="upload__button" onClick={handleSubmit} type="button">
          Upload without image
        </button>
      </form>
    </div>
  );
}

export default Upload;

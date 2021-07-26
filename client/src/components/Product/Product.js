import React from "react";
import "./Product.css";
function Product({ name, description, price, img, id }) {
  function truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const noProductImg =
    "https://t4.ftcdn.net/jpg/00/89/55/15/240_F_89551596_LdHAZRwz3i4EM4J0NHNHy2hEUYDfXc0j.jpg";

  return (
    <div className="product">
      <div className="product__left">
        <h1>{name}</h1>
        <p>{truncate(description, 30)}</p>
        <h4>
          <strong>{price}$</strong>
        </h4>
      </div>
      <img src={img || noProductImg} alt="no image avalable" />
    </div>
  );
}

export default Product;

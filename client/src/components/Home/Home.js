import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Product from "../Product/Product";
import "./Home.css";
import UploadPage from "../UploadPage/Upload";
import Cookie from "js-cookie";
import Banner from "./Banner/Banner";

function Home() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});

  const storedJwt = Cookie.get("token");
  const [jwt, setJwt] = useState(storedJwt || null);

  useEffect(() => {
    async function getUserData() {
      axios
        .get("http://localhost:3001/users/me", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    getUserData();
  }, [jwt, user]);

  useEffect(() => {
    getProducts();
  }, [products]);

  const getProducts = useMemo(() => getProducs, [products]);

  async function getProducs() {
    try {
      const response = await axios.get("http://localhost:3001/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="home">
      <Banner />

      <div className="home__bottom">
        <div className="home__left">
          {products &&
            products.map((product) => (
              <Product
                name={product.name}
                description={product.description}
                price={product.price}
                img={product.productImg}
                id={product._id}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
export default Home;

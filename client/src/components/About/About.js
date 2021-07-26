import React, { useEffect, useState } from "react";
import "./About.css";
import axios from "axios";
import Cookie from "js-cookie";

function About() {
  const [user, setUser] = useState({});
  const storedJwt = Cookie.get("token");
  const [jwt, setJwt] = useState(storedJwt || null);

  const noUserImg =
    "https://as2.ftcdn.net/v2/jpg/00/64/67/27/1000_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg";

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

  return (
    <div className="about">
      <h1>About me</h1>
      {user ? (
        <div className="user">
          <div className="user__info">
            <h3>Name: {user.name}</h3>

            <h3>Email:{user.email}</h3>
            <h3>Age: {user.age}</h3>
          </div>
          <img src={user.profileImg || noUserImg} alt="No user was provided" />
        </div>
      ) : (
        <h1>No user Avalable! Please Login</h1>
      )}
    </div>
  );
}

export default About;

import React, { useState } from "react";
import "./Logout.css";
import Cookie from "js-cookie";
import axios from "axios";

function Logout() {
  const storedJwt = Cookie.get("token");
  const [jwt, setJwt] = useState(storedJwt || null);
  const logout = () => {
    axios({
      method: "post",
      url: "http://localhost:3001/users/logout",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        console.log(res);
        alert("has been logged out!");
      })
      .catch((e) => {
        alert(e);
      });
  };
  return (
    <div className="logout">
      <h1>Logout page</h1>
      <button className="button__logout" type="button" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Logout;

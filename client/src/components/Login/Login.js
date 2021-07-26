import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import Cookie from "js-cookie";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState(true);
  const [isVisable, setIsVisable] = useState(false);

  const changeVisibility = () => {
    setIsVisable(!isVisable);
    setIsPassword(!isPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/users/login", {
        email,
        password,
      })
      .then(
        (response) => {
          console.log(response);
          alert("logged in");
          props.history.push("/");

          Cookie.set("token", response.data.token, {
            expires: 7,
            secure: true,
          });
        },
        (error) => {
          console.log(error);
          alert(error.message);
        }
      );
  };
  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <div className="password">
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={isPassword ? "password" : "text"}
            placeholder="Password"
          />
          <IconButton className="password__eye" onClick={changeVisibility}>
            {isVisable === true ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </div>
        <button className="login__button">Login</button>
      </form>

      <p>
        <a href="/register">Not registered yet?</a>
      </p>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(Number);
  const [isPassword, setIsPassword] = useState(true);
  const [isVisable, setIsVisable] = useState(false);
  const [profileImg, setProfileImg] = useState("");

  const changeVisibility = () => {
    setIsVisable(!isVisable);
    setIsPassword(!isPassword);
  };

  const onFileChange = (e) => {
    setProfileImg(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("profileImg", profileImg);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("age", age);

    axios
      .post("http://localhost:3001/users/me", formData, {})
      .then((response) => {
        console.log(response);
        setName("");
        setEmail("");
        setPassword("");
        setAge(0);
        alert(`you have registered ${response.data.user.name}`);
        props.history.push("/login");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/users", {
        name,
        email,
        password,
        age,
      })
      .then(
        (response) => {
          console.log(response);
          setName("");
          setEmail("");
          setPassword("");
          setAge(0);
          alert(`you have registered ${response.data.user.name}`);
          props.history.push("/login");
        },
        (error) => {
          console.log(error);
          alert(error.message);
        }
      );
  };
  return (
    <div className="register">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} action="post">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name..."
          className="form__name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email..."
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
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          type="number"
          placeholder="Age..."
        />
        <input className='login__file' onChange={onFileChange} type="file" name="profileImg" />
        <button className="register__button">Register without image</button>
        <button type="button" onClick={onSubmit} className="register__button">
          Register
        </button>
      </form>
      <a href="/login">Login page</a>
    </div>
  );
}

export default Register;

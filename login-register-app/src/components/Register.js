import React, { useState } from "react";
import { useHistory } from "react-router";
import "./Login.css";
import axios from "../axios";

// redux
import { register } from "../actions/actions";
import { connect } from "react-redux";

function Register({ register }) {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setConfirmPassword] = useState("");

  const loginWithEmail = (e) => {
    e.preventDefault();

    if (username.length < 1) {
      alert("username cannot be empty !");
    }

    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+/.test(email)) {
      alert("email must be in abc123@mail.com format !");
    }

    if (mobile.length < 10) {
      alert("Mobile Number must contain 10 digits !");
    }

    if (
      /(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$])[a-zA-Z0-9@#$]{8,13}/.test(
        password
      ) === false
    ) {
      alert(
        "Password must be of length 8 with atleast 1 uppercase 1 lowercase letter and one special symbol (@,#,$)"
      );
    }

    if (
      username.length > 2 &&
      /(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$])[a-zA-Z0-9@#$]{8,13}/.test(
        password
      ) === true &&
      /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+/.test(email) === true &&
      mobile.length === 10
    ) {
      axios.post("/users", {
        username,
        email,
        mobile,
        password,
      });
    }

    const userDetails = {
      username,
      email,
      mobile,
      password,
    };

    if (
      username.length > 2 &&
      /(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$])[a-zA-Z0-9@#$]{8,13}/.test(
        password
      ) === true &&
      /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+/.test(email) === true &&
      mobile.length === 10
    ) {
      register(userDetails);
      history.push("/success");
    }

    setUsername("");
    setEmail("");
    setMobile("");
    setPassword("");
  };

  const gotoLogin = () => {
    history.push("/login");
  };

  return (
    <div className="login">
      <div className="login_container">
        <h1>Register</h1>

        <form action="">
          <h5>Username</h5>
          <input
            type="text"
            placeholder="Full Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <h5>Email</h5>
          <input
            type="email"
            placeholder="eg. abc@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <h5>Mobile</h5>
          <input
            type="number"
            placeholder="10 digit mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <h5>Create Password</h5>
          <input
            type="password"
            placeholder="min 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <h5>Confirm Password</h5>
          <input
            type="password"
            placeholder="same as above password"
            value={checkPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <h6 className="warning">
            {password !== checkPassword
              ? "*Password Should Match With Above Password"
              : ""}
          </h6>
          <button
            type="submit"
            className="login_signinButton"
            onClick={loginWithEmail}
          >
            Sign up
          </button>
          <h5 className="gotoLogin" onClick={gotoLogin}>
            Have an account? <span>Click to Login</span>
          </h5>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  register: (userDetails) => {
    dispatch(register(userDetails));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

import React, { useState } from "react";
import { useHistory } from "react-router";
import "./Login.css";
import axios from "../axios";

function Login() {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginData, setLoginData] = useState([{}]);

  const loginWithEmail = async (e) => {
    e.preventDefault();

    await axios
      .post("/users/login", {
        username,
        password,
      })
      .then((res) => {
        if (res.data) {
          setLoginData(res.data);

          setTimeout(() => {
            if (
              loginData.username === username &&
              loginData.password === password
            ) {
              history.push(`/userloggedin/${loginData.username}`);
            } else {
              alert("username or password is incorrect");
            }
          }, 2000);
        }
      });
  };

  const gotoRegister = () => {
    history.push("/register");
  };

  return (
    <div className="login">
      <div className="login_container">
        <h1>Sign In</h1>

        <form action="">
          <h5>Username</h5>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="login_signinButton"
            onClick={loginWithEmail}
          >
            Login
          </button>
          <h5 className="gotoLogin" onClick={gotoRegister}>
            Don't have an account? <span>Click to Register</span>
          </h5>
        </form>
      </div>
    </div>
  );
}

export default Login;

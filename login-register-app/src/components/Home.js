import React from "react";
import { useHistory } from "react-router";
import "./Home.css";

function Home() {
  const history = useHistory();

  const handleRegister = () => {
    history.push("/register");
  };

  const handleLogin = () => {
    history.push("/login");
  };

  return (
    <div className="home">
      <div className="home__heading">
        <h3>Welcome To 'XYZ'</h3>
      </div>
      <div className="home__content">
        <button type="button" onClick={handleRegister}>
          Register
        </button>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Home;

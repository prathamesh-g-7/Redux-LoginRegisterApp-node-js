import React from "react";
import "./Login.css";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";

// redux
import { connect } from "react-redux";
import { initialState } from "../reducer/reducer";

function UserLoggedIn() {
  const history = useHistory();
  const { loginData } = useParams();

  const handleRegister = () => {
    history.push("/");
    console.log("logindata->", loginData);
    console.log("initialState->", initialState);
  };

  return (
    <div className="userLoggedIn">
      <img src="https://i.stack.imgur.com/gqKFh.png" alt="" />

      {initialState.map((user) =>
        loginData === user.username ? (
          <div className="userData" key={user._id}>
            <h3>Username: {user.username}</h3>
            <h3>Email: {user.email}</h3>
            <h3>Mobile: {user.mobile}</h3>
          </div>
        ) : (
          ""
        )
      )}
      <div className="home__content">
        <button type="button" onClick={handleRegister}>
          Go To Visiter Page
        </button>
      </div>
    </div>
  );
}

// const mapStateToProps = (state) => ({
//   loginDetails: state.reducer,
// });

// const mapDispatchToProps = (dispatch) => ({});
// connect(mapStateToProps, mapDispatchToProps)

export default UserLoggedIn;

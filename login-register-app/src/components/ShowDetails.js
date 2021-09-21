import React from "react";
import { useHistory } from "react-router";

function ShowDetails() {
  const history = useHistory();

  setTimeout(() => {
    history.push("/login");
  }, 3000);

  return (
    <div>
      <h3>Registration Scuccessful Redirecting To Login Page!🔥</h3>
    </div>
  );
}

export default ShowDetails;

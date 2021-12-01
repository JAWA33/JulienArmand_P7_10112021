import React, { useState } from "react";
import SignIn from "./SignIn.js";
import SignUp from "./SignUp.js";
import axios from "axios";

const Log = () => {
  const [signUpForm, setSignUpForm] = useState(false);
  const [signInForm, setSignInForm] = useState(true);

  const handleForm = (e) => {
    if (e.target.id === "register") {
      setSignInForm(false);
      setSignUpForm(true);
    } else if (e.target.id === "login") {
      setSignInForm(true);
      setSignUpForm(false);
    }
  };

  const getJobs = async () => {
    await axios({
      method: "get",
      url: process.env.REACT_APP_API_URL + "api/job/",
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        sessionStorage.setItem("jobs", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getJobs();

  return (
    <div className="userConnect">
      <div>
        {signInForm && <SignIn />}
        {signUpForm && <SignUp />}
      </div>
      <div>
        <ul>
          {signInForm ? (
            <li onClick={handleForm} id="register">
              Je n'ai pas encore de compte
            </li>
          ) : (
            <li onClick={handleForm} id="login">
              J'ai déjà un compte
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Log;

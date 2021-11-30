import React, { useState } from "react";
import SignIn from "./SignIn.js";
import SignUp from "./SignUp.js";

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

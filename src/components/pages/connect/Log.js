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
  //for git
  return (
    <div className="logForm">
      {signInForm && <SignIn />}
      {signUpForm && <SignUp />}

      <div>
        <ul className="logForm__button">
          {signInForm ? (
            <li className="btn__changeLog" onClick={handleForm} id="register">
              Vous n'avez pas encore de compte ?
            </li>
          ) : (
            <li className="btn__changeLog" onClick={handleForm} id="login">
              J'ai déjà un compte !
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Log;

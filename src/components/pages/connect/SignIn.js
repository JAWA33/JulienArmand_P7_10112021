import React, { useState } from "react";
import Icon from "../../svgComponents/Icon";
import axios from "axios";
import dotenv from "dotenv";
import { validPassword, validEmail } from "../../Utils/regExp.js";

dotenv.config({ path: "../../../../.env" });

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let signInForm = document.getElementById("signInForm");

  if (signInForm) {
    signInForm.email.addEventListener("change", function () {
      validEmail(this);
    });

    signInForm.password.addEventListener("change", function () {
      validPassword(this);
    });
  } else {
    //rien à vérifier
  }

  const sendForm = (e) => {
    e.preventDefault();

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const infoError = document.getElementById("infoError");
    emailError.innerHTML = "";
    passwordError.innerHTML = "";
    infoError.innerHTML = "";

    if (validEmail(signInForm.email) && validPassword(signInForm.password)) {
      console.log("Tous ok");
      axios({
        method: "post",
        url: process.env.REACT_APP_API_URL + "api/user/login",
        withCredentials: true,
        data: {
          email,
          password,
        },
      })
        .then((res) => {
          if (res.data.message) {
            infoError.innerHTML = res.data.message;
            infoError.classList.add("error");
            signInForm.email.classList.remove("success");
            signInForm.password.classList.remove("success");
            console.log(res.data.message);
          } else {
            // data dans le local storage
            infoError.classList.remove("error");
            sessionStorage.setItem("connectedUser", JSON.stringify(res.data));
            window.location = "/forum";
          }
        })
        //})
        .catch((err) => {
          console.log(err);
        });
    } else if (!validEmail(signInForm.email)) {
      infoError.innerHTML = "Le format de votre email n'est pas correct";
      infoError.classList.add("error");
    } else if (!validPassword(signInForm.password)) {
      infoError.innerHTML = "Le format de votre mot de passe n'est pas correct";
      infoError.classList.add("error");
    }
  };

  return (
    // SignIn.js :
    <div className="connect">
      <Icon
        animation="animIcon"
        fillColor="#ffd7d6"
        lineColor="#081f43"
        height="150"
        width="150"
      ></Icon>
      <h2>Connectez-vous !</h2>
      <form
        action=""
        onSubmit={sendForm}
        className="connect__form"
        id="signInForm"
      >
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
        <div id="emailError"></div>
        <br />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
        <div id="passwordError"></div>
        <br />
        <div id="infoError"></div>
        <br />
        <input
          type="submit"
          value="Se connecter"
          className="btn btn--callToAction"
        />
      </form>
    </div>
  );
};

export default SignIn;

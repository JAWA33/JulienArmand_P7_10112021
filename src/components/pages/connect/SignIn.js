import React, { useState } from "react";
import AnimeGroupomania from "../../svgComponents/AnimeGroupomania.js";
import axios from "axios";
import dotenv from "dotenv";
import { validPassword, validEmail } from "../../Utils/regExp.js";

dotenv.config({ path: "../../../../.env" });

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let signInForm = document.getElementById("signInForm");
  const infoError = document.getElementById("infoError");

  // ########  Controle pré-requête lors de la saisie :

  if (signInForm) {
    signInForm.email.addEventListener("change", function () {
      validEmail(this);
      if (!validEmail(this)) {
        infoError.innerHTML = "Format Email : xxxxx@groupomania.xx(x)";
        infoError.classList.add("globalError");
      } else {
        infoError.innerHTML = "";
        infoError.classList.remove("globalError");
      }
    });

    signInForm.password.addEventListener("change", function () {
      validPassword(this);
      if (!validPassword(this)) {
        infoError.innerHTML =
          "Votre mot de passe doit contenir au minimum : un nombre, une lettre minuscule, une lettre majuscule et avoir entre 6 et 16 caractères";
        infoError.classList.add("globalError");
      } else {
        infoError.innerHTML = "";
        infoError.classList.remove("globalError");
      }
    });
  } else {
    //rien à vérifier
  }

  // ########  Soumission de la requête uniquement si les saisies sont validées :

  const sendForm = (e) => {
    e.preventDefault();

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
            infoError.classList.add("globalError");
            signInForm.email.classList.remove("inputSuccess");
            signInForm.password.classList.remove("inputSuccess");
            console.log(res.data.message);
          } else {
            // data dans le local storage
            infoError.classList.remove("globalError");
            sessionStorage.setItem("connectedUser", JSON.stringify(res.data));
            sessionStorage.setItem("id_user", JSON.stringify(res.data.id_user));

            window.location = "/forum";
          }
        })
        //})
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // ######## Affichage du HTML :
  return (
    // SignIn.js :
      <div className="sign">
        <div className="sign__title">
          <h2>Connectez-vous !</h2>
        </div>
        <AnimeGroupomania className="sign__icon animIcon"></AnimeGroupomania>
        <form
          action=""
          onSubmit={sendForm}
          className="sign__form"
          id="signInForm"
        >
          <div className="sign__form__part">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Entrez votre e-mail Groupomania"
            ></input>
            <p></p>
          </div>
          <div className="sign__form__part">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Saisissez votre mot de passe"
            ></input>
            <p></p>
          </div>
          <p id="infoError"></p>
          <div className="outer btn">
            <input type="submit" value="Connexion" />
            <span></span>
            <span></span>
          </div>
        </form>
      </div>
  );
};

export default SignIn;

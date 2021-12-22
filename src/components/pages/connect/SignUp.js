import React, { useEffect, useState } from "react";
import AnimeGroupomania from "../../svgComponents/AnimeGroupomania.js";
import axios from "axios";
import SignIn from "./SignIn";
import {
  validPassword,
  validEmail,
  validName,
  validId,
} from "../../Utils/regExp.js";

import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../../../actions/job.actions.js";

const SignUp = () => {
  //* Hooks pour formulaire :
  const [formSubmit, setFormSubmit] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPass, setControlPass] = useState("");
  const [firstname, setFirstname] = useState("");
  const [id_job, setId_job] = useState("");

  //* Hooks pour liste déroulante :
  const [loading, setLoading] = useState(true);

  const signUpForm = document.getElementById("signUpForm");
  const infoError = document.getElementById("infoError");
  const terms = document.getElementById("terms");

  const dispatch = useDispatch();
  const jobData = useSelector((state) => state.jobReducer);

  //* ########  Controle pré-requête lors de la saisie du formulaire :

  if (signUpForm) {
    signUpForm.email.addEventListener("change", function () {
      validEmail(this);
      if (!validEmail(this)) {
        infoError.innerHTML = "Format Email : xxxxx@groupomania.xx(x)";
        infoError.classList.add("globalError");
      } else {
        infoError.innerHTML = "";
        infoError.classList.remove("globalError");
      }
    });

    signUpForm.password.addEventListener("change", function () {
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

    signUpForm.firstname.addEventListener("change", function () {
      validName(this);
      if (!validName(this)) {
        infoError.innerHTML =
          "Votre prénom doit contenir au minimum 3 caractères, et être constitué de lettres, majuscules et/ou minuscules. Pour les prénoms composés vous pouvez utiliser un -";
        infoError.classList.add("globalError");
      } else {
        infoError.innerHTML = "";
        infoError.classList.remove("globalError");
      }
    });

    signUpForm.id_job.addEventListener("change", function () {
      validId(this);
    });

    signUpForm.controlPass.addEventListener("change", function () {
      if (controlPass === "") {
        infoError.innerHTML = "";
        infoError.classList.remove("globalError");
      }
    });
  } else {
    //rien à vérifier
  }

  //* #######   Envoi du formulaire :
  const sendForm = (e) => {
    e.preventDefault();

    if (password !== controlPass || !terms.checked) {
      if (password !== controlPass)
        infoError.innerHTML = "Les mots de passe ne correspondent pas";
      infoError.classList.add("globalError");
      if (!terms.checked)
        infoError.innerHTML = "Merci de valider les conditions générales";
      infoError.classList.add("globalError");
    } else if (
      password === controlPass &&
      terms.checked &&
      validName(signUpForm.firstname) &&
      validEmail(signUpForm.email) &&
      validPassword(signUpForm.password) &&
      validId(signUpForm.id_job)
    ) {
      infoError.innerHTML = "";
      infoError.classList.remove("globalError");
      axios({
        method: "post",
        url: process.env.REACT_APP_API_URL + "api/user/signup",
        data: {
          email,
          firstname,
          password,
          controlPass,
          id_job,
        },
      })
        .then((res) => {
          if (res.status === 201) {
            setFormSubmit(true);
          } else if (res.data.message) {
            infoError.innerHTML = res.data.message;
            infoError.classList.add("globalError");
            signUpForm.email.classList.remove("inputSuccess");
            signUpForm.email.classList.add("inputError");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Problème d'envoi");
    }
  };

  //* ####### Attente du chargement pour remplissage de la liste déroulante
  const listingJobs = !loading ? (
    jobData.map((data) => (
      <option key={data.id_job.toString()} value={data.id_job}>
        {data.job_name}
      </option>
    ))
  ) : (
    <option value="charge">En chargement ...</option>
  );

  //* ####### Chargement de la liste déroulante :
  useEffect(async () => {
    if (loading) {
      await dispatch(getJobs());
      await setLoading(false);
    }
  }, [loading, dispatch]);

  return (
    <>
      {formSubmit ? (
        //si le formulaire est correctement rempli, retour sur le signIn + message
        <>
          <SignIn />
          <p className="signupSuccess">
            Enregistrement réussi, <br/>Merci de vous connecter
          </p>
        </>
      ) : (
        //sinon , affichage du formulaire SignUp.js :
        <div className="sign">
          <div className="sign__title">
            <h2>Inscrivez-vous !</h2>
          </div>
          <AnimeGroupomania className="sign__icon animIcon"></AnimeGroupomania>
          <form
            action=""
            onSubmit={sendForm}
            className="sign__form"
            id="signUpForm"
          >
            <div className="sign__form--signup">
              <div className="sign__form__section--one">
                <div className="sign__form__part">
                  <label htmlFor="email">Votre email</label>
                  <input
                    type="text"
                    name="email"
                    id="mail"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Entrez votre e-mail Groupomania"
                  ></input>
                  <p></p>
                </div>
                <div className="sign__form__part">
                  <label htmlFor="password">Votre mot de passe</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Saisissez un mot de passe"
                  ></input>
                  <p></p>
                </div>
                <div className="sign__form__part">
                  <label htmlFor="controlPass">Confirmer le mot de passe</label>
                  <input
                    type="password"
                    name="controlPass"
                    id="controlPass"
                    onChange={(e) => setControlPass(e.target.value)}
                    value={controlPass}
                    placeholder="Saisissez le même mot de passe"
                  ></input>
                  <p></p>
                </div>
              </div>
              <div className="sign__form__section--two">
                <div className="sign__form__part">
                  <label htmlFor="firstname">Votre prénom</label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    onChange={(e) => setFirstname(e.target.value)}
                    value={firstname}
                    placeholder="Indiquez votre prénom"
                  ></input>
                  <p></p>
                </div>
                <div className="sign__form__part">
                  <label htmlFor="id_job">Votre poste</label>
                  <select
                    type="select"
                    name="id_job"
                    id="selectjobs"
                    onChange={(e) => setId_job(e.target.value)}
                    value={id_job}
                  >
                    <option value="none">Sélectionner votre poste</option>
                    {listingJobs}
                  </select>
                  <p></p>
                </div>
                <div className="sign__form__cgv">
                  <input type="checkbox" id="terms" />
                  <label htmlFor="terms">
                    J'accepte les{" "}
                    <a href="/" target="_blank" rel="noopener noreferrer">
                    conditions générales
                    </a>
                  </label>
                  <p></p>
                </div>
              </div>
            </div>
            <p id="infoError"></p>
            <div className="outer btn">
              <input type="submit" value="Créer un compte" />
              <span></span>
              <span></span>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default SignUp;

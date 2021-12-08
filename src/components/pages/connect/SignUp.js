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

const SignUp = () => {
  //* Hooks pour formulaire :
  const [formSubmit, setFormSubmit] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPass, setControlPass] = useState("");
  const [firstname, setFirstname] = useState("");
  const [id_job, setId_job] = useState("");

  //* Hooks pour liste déroulante :
  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(true);

  const signUpForm = document.getElementById("signUpForm");
  const infoError = document.getElementById("infoError");
  const terms = document.getElementById("terms");

  //* ########  Controle pré-requête lors de la saisie du formulaire :

  if (signUpForm) {
    signUpForm.email.addEventListener("change", function () {
      validEmail(this);
      if (!validEmail(this)) {
        infoError.innerHTML = "Format Email : xxxxx@groupomania.xx(x)";
        infoError.classList.add("error");
      } else {
        infoError.innerHTML = "";
        infoError.classList.remove("error");
      }
    });

    signUpForm.password.addEventListener("change", function () {
      validPassword(this);
      if (!validPassword(this)) {
        infoError.innerHTML =
          "Votre mot de passe doit contenir au minimum : un nombre, une lettre minuscule, une lettre majuscule et avoir entre 6 et 16 caractères";
        infoError.classList.add("error");
      } else {
        infoError.innerHTML = "";
        infoError.classList.remove("error");
      }
    });

    signUpForm.firstname.addEventListener("change", function () {
      validName(this);
      if (!validName(this)) {
        infoError.innerHTML =
          "Votre prénom doit contenir au minimum 3 caractères, et être constitué de lettres, majuscules et/ou minuscules. Pour les prénoms composés vous pouvez utiliser un -";
        infoError.classList.add("error");
      } else {
        infoError.innerHTML = "";
        infoError.classList.remove("error");
      }
    });

    signUpForm.id_job.addEventListener("change", function () {
      validId(this);
    });

    signUpForm.controlPass.addEventListener("change", function () {
      if (controlPass === "") {
        infoError.innerHTML = "";
        infoError.classList.remove("error");
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
      infoError.classList.add("error");
      if (!terms.checked)
        infoError.innerHTML = "Merci de valider les conditions générales";
      infoError.classList.add("error");
    } else if (password === controlPass && terms.checked) {
      infoError.innerHTML = "";
      infoError.classList.remove("error");
    } else if (
      validName(signUpForm.firstname) &&
      validEmail(signUpForm.email) &&
      validPassword(signUpForm.password) &&
      validId(signUpForm.id_job)
    ) {
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
            infoError.classList.add("error");
            signUpForm.email.classList.remove("success");
            signUpForm.email.classList.add("error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //* ####### Attente du chargement pour remplissage de la liste déroulante
  const listingJobs = !loading ? (
    jobList.map((data) => (
      <option key={data.id_job.toString()} value={data.id_job}>
        {data.job_name}
      </option>
    ))
  ) : (
    <option value="charge">En chargement ...</option>
  );

  //* ####### Chargement de la liste déroulante :
  useEffect(() => {
    const getJobs = () => {
      axios({
        method: "get",
        url: process.env.REACT_APP_API_URL + "api/job/",
        withCredentials: true,
      })
        .then((res) => {
          setJobList(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getJobs();
  }, []);

  return (
    <>
      {formSubmit ? (
        //si le formulaire est correctement rempli, retour sur le signIn + message
        <>
          <SignIn />
          <p className="success">
            Enregistrement réussi, Merci de vous connecter
          </p>
          <br />
        </>
      ) : (
        //sinon , affichage du formulaire SignUp.js :
        <div className="connect">
          <AnimeGroupomania
            animation="animIcon"
            fillColor="#ffd7d6"
            lineColor="#081f43"
            height="150"
            width="150"
          ></AnimeGroupomania>
          <h2>Enregistrez-vous !</h2>
          <form
            action=""
            onSubmit={sendForm}
            className="connect__form"
            id="signUpForm"
          >
            <div className="connect__form">
              <label htmlFor="firstname">Mon prénom</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
              ></input>
              <p></p>
              <br />
              <label htmlFor="id_job">Mon poste</label>
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
              <br />
              <label htmlFor="email">Mon email</label>
              <input
                type="text"
                name="email"
                id="mail"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              ></input>
              <p></p>
              <br />
              <label htmlFor="password">Mon mot de passe</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              ></input>
              <p></p>
              <br />
              <label htmlFor="controlPass">
                Confirmation de votre mot de passe
              </label>
              <input
                type="password"
                name="controlPass"
                id="controlPass"
                onChange={(e) => setControlPass(e.target.value)}
                value={controlPass}
              ></input>
              <p></p>
              <br />
            </div>
            <p id="infoError"></p>
            <div className="connect__form--newUser">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                J'accepte les{" "}
                <a href="/" target="_blank" rel="noopener noreferrer">
                  conditions générales
                </a>
              </label>
            </div>
            <p></p>
            <br />
            <input
              type="submit"
              value="Créer mon compte"
              className="btn btn--callToAction"
            />
          </form>
        </div>
      )}
    </>
  );
};

export default SignUp;

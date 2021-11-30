import React, { useState } from "react";
import Icon from "../../svgComponents/Icon";
import axios from "axios";
import SignIn from "./SignIn";

const SignUp = () => {
  // axios({
  //   method: "get",
  //   url: process.env.REACT_APP_API_URL + "api/job/",
  //   withCredentials: true,
  // })
  //   .then((res) => {
  //     console.log(res);
  //     localStorage.setItem("jobs", JSON.stringify(res.data));
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  const [formSubmit, setFormSubmit] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [firstname, setFirstname] = useState("");
  const [job, setJob] = useState("");

  const sendForm = (e) => {
    e.preventDefault();

    const terms = document.getElementById("terms");
    const termsError = document.getElementById("termsError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const firstnameError = document.getElementById("firstnameError");
    const jobError = document.getElementById("jobError");
    const confirmPassError = document.getElementById("confirmPassError");
    const infoError = document.getElementById("infoError");

    confirmPassError.innerHTML = "";
    termsError.innerHTML = "";
    infoError.innerHTML = "";

    if (password !== confirmPass || !terms.checked) {
      if (password !== confirmPass)
        confirmPassError.innerHTML = "Les mots de passe ne correspondent pas";
      if (!terms.checked)
        termsError.innerHTML = "Merci de valider les conditions générales";
    } else {
      axios({
        method: "post",
        url: process.env.REACT_APP_API_URL + "api/user/signup",
        data: {
          email,
          firstname,
          password,
          controlPass: confirmPass,
          id_job: job,
        },
      })
        .then((res) => {
          if (res.data.regexpError) {
            console.log(res.data.regexpError);
            let i = 0;
            for (i = 0; i < res.data.regexpError.length; i++) {
              if (res.data.regexpError[i].includes("email")) {
                emailError.innerHTML = "Email non valide";
                infoError.insertAdjacentHTML(
                  "afterbegin",
                  "<p>- " +
                    res.data.regexpError[i].split(" :: ")[1] +
                    "<p><br/>"
                );
              } else if (res.data.regexpError[i].includes("password")) {
                passwordError.innerHTML = "Mot de passe non valide";
                infoError.insertAdjacentHTML(
                  "afterbegin",
                  "<p>- " +
                    res.data.regexpError[i].split(" :: ")[1] +
                    "<p><br/>"
                );
              } else if (res.data.regexpError[i].includes("name")) {
                firstnameError.innerHTML = "Prénom non valide";
                infoError.insertAdjacentHTML(
                  "afterbegin",
                  "<p>- " +
                    res.data.regexpError[i].split(" :: ")[1] +
                    "<p><br/>"
                );
              } else if (res.data.regexpError[i].includes("id")) {
                jobError.innerHTML = "Job non valide";
                infoError.insertAdjacentHTML(
                  "afterbegin",
                  "<p>- " +
                    res.data.regexpError[i].split(" :: ")[1] +
                    "<p><br/>"
                );
              }
            }
          } else if (res.status === 201) {
            setFormSubmit(true);
          } else if (res.data.message) {
            infoError.innerHTML = res.data.message;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignIn />
          <p className="success">
            Enregistrement réussi, Merci de vous connecter
          </p>
          <br />
        </>
      ) : (
        // SignUp.js :
        <div className="connect">
          <Icon
            animation="animIcon"
            fillColor="#ffd7d6"
            lineColor="#081f43"
            height="150"
            width="150"
          ></Icon>
          <h2>Enregistrez-vous !</h2>
          <form action="" onSubmit={sendForm} className="connect__form">
            <div className="connect__form">
              <label htmlFor="firstname">Mon prénom</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
              ></input>
              <div id="firstnameError" className="error"></div>
              <br />
              <label htmlFor="job">Mon poste "id"</label>
              <input
                type="text"
                name="job"
                id="job"
                onChange={(e) => setJob(e.target.value)}
                value={job}
              ></input>
              <div id="jobError" className="error"></div>
              <br />
              <label htmlFor="email">Mon email</label>
              <input
                type="text"
                name="email"
                id="mail"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              ></input>
              <div id="emailError" className="error"></div>
              <br />
              <label htmlFor="password">Mon mot de passe</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              ></input>
              <div id="passwordError" className="error"></div>
              <br />
              <label htmlFor="confirmPass">
                Confirmation de votre mot de passe
              </label>
              <input
                type="password"
                name="confirmPass"
                id="confirmPass"
                onChange={(e) => setConfirmPass(e.target.value)}
                value={confirmPass}
              ></input>
              <div id="confirmPassError" className="error"></div>
              <br />
            </div>
            <div className="connect__form--newUser">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                J'accepte les{" "}
                <a href="/" target="_blank" rel="noopener noreferrer">
                  conditions générales
                </a>
              </label>
            </div>
            <div id="termsError" className="error"></div>
            <div id="infoError" className="error"></div>
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

import React from "react";
import Welcome from "../../../medias/images/welcome.png";
import Icon from "../../svgComponents/Icon";

function RegistredUser() {
  return (
    // RegistredUser.js :
    <div className="userConnect">
      <img src={Welcome} alt="" className="userConnect__img" />
      <div className="connect">
        <Icon
          animation="animIcon"
          fillColor="#ffd7d6"
          lineColor="#081f43"
          height="200"
          width="200"
        ></Icon>
        <h2>Connectez-vous !</h2>
        <form className="connect__form">
          <label>E-mail</label>
          <input></input>
          <label>Mot de passe</label>
          <input></input>
          <button className="btn btn--callToAction">
            J'accède à mon compte
          </button>
          <a
            className="btn btn--secondaryAction"
            href="/newuser"
            //onClick={this.createNewUser}
          >
            Je n'ai pas encore de compte
          </a>
        </form>
      </div>
    </div>
  );
}

export default RegistredUser;

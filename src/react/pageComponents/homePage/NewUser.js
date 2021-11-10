import React, { Component } from "react";
import Icon from "../../svgComponents/Icon";


class NewUser extends Component {
  state = {
    service: "",
    services: [
      "",
      "Direction",
      "Administratif",
      "Logistique",
      "Securite",
      "Restauration",
    ],
    job: "",
    jobs: [""],
  };


  changeJob = (e) => {
    //Boucle à creer pour réduire
    if (e.target.value === "Direction") {
      this.setState({
        jobs: ["", "Directeur", "Assistant"],
      });
      console.log(this.state.jobs);
    } else if (e.target.value === "Administratif") {
      this.setState({
        jobs: ["", "Responsable", "Secretaire"],
      });
      console.log(this.state.jobs);
    } else if (e.target.value === "Logistique") {
      this.setState({
        jobs: ["", "Responsable", "Operateur"],
      });
      console.log(this.state.jobs);
    } else if (e.target.value === "Securite") {
      this.setState({
        jobs: ["", "Responsable", "Agent"],
      });
      console.log(this.state.jobs);
    } else if (e.target.value === "Restauration") {
      this.setState({
        jobs: ["", "Chef", "Cuisinier", "Serveur"],
      });
      console.log(this.state.jobs);
    } else {
      this.setState({
        jobs: [""],
      });
    }
  };

  render () {

    return (
        // NewUser.js :
        <div className="userConnect">
            <div className="connect">
                <Icon
                animation="animIcon"
                fillColor="#ffd7d6"
                lineColor="#081f43"
                height="200"
                width="200"
                ></Icon>
                <h2>Enregistrez-vous !</h2>
                <form className="connect__form">
                <div className="connect__form--newUser">
                    <div>
                    <label>E-mail</label>
                    <input></input>
                    <label>Mot de passe</label>
                    <input></input>
                    <label>Confirmation de votre mot de passe</label>
                    <input></input>
                    </div>
                    <div>
                    <label>Mon prénom</label>
                    <input></input>
                    <label>Mon service</label>
                    <select onChange={this.changeJob}>
                        {this.state.services.map((service) => {
                        return <option value={service}>{service}</option>;
                        })}
                    </select>
                    <label>Mon poste</label>
                    <select>
                        {this.state.jobs.map((job) => {
                        return <option value={job}>{job}</option>;
                        })}
                    </select>
                    </div>
                </div>
                <button className="btn btn--callToAction">Créer mon compte</button>
                <a className="btn btn--secondaryAction" 
                //onClick={this.loginUser}
                href="/"
                >
                    J'ai déjà un compte
                </a>
                </form>
            </div>
        </div>
    );
  }
};

export default NewUser;

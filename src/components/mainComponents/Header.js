import React, { useContext } from "react";
import { UidContext } from "../routes/AppContext";
import Navigation from "./Navigation.js";
import icon from "../../medias/icons/icon.svg";

const Header = () => {
  const uid = useContext(UidContext);
  //* #######  Simulation de connexion ######## *//

  //* ---------  Simulation de connection : FIN ----------- *//

  return (
    <header>
      <div className="logoContainer" id={uid ? "connected" : "notConnected"}>
        <img
          src={icon}
          className="logoContainer__icon"
          alt="Logo_Groupomania"
        />
        <h1 className="logoContainer__title">Groupomania</h1>
      </div>
      {uid ? <Navigation /> : ""}
    </header>
  );
};

export default Header;

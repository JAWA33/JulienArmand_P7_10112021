import React, { useContext } from "react";
import AnimeGroupomania from "../svgComponents/AnimeGroupomania.js";
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
        <img src={icon} className="logoContainer__icon" />
        <h1 className="logoContainer__title">Groupomania</h1>
      </div>
      {uid ? <Navigation /> : ""}
    </header>
  );
};

export default Header;

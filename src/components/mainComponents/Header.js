import React, { useContext } from "react";
import AnimeGroupomania from "../svgComponents/AnimeGroupomania.js";
import UserInfo from "../mainComponents/UserInfo";
import { UidContext } from "../routes/AppContext";

const Header = () => {
  const uid = useContext(UidContext);
  //* #######  Simulation de connexion ######## *//

  //* ---------  Simulation de connection : FIN ----------- *//

  return (
    <header>
      <div className="logo">
        <AnimeGroupomania
          fillColor="white"
          lineColor="transparent"
          height="80"
          width="80"
        ></AnimeGroupomania>
        <h1>Groupomania</h1>
      </div>
      {uid ? <UserInfo /> : ""}
    </header>
  );
};

export default Header;

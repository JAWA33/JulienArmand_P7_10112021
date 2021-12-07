import React, { useContext } from "react";
import Icon from "../svgComponents/Icon";
import UserInfo from "../mainComponents/UserInfo";
import { UidContext } from "../routes/AppContext";

const Header = () => {
  const uid = useContext(UidContext);
  //* #######  Simulation de connexion ######## *//

  //* ---------  Simulation de connection : FIN ----------- *//

  return (
    <header>
      <div className="logo">
        <Icon
          fillColor="white"
          lineColor="transparent"
          height="80"
          width="80"
        ></Icon>
        <h1>Groupomania</h1>
      </div>
      {uid ? <UserInfo /> : ""}
    </header>
  );
};

export default Header;

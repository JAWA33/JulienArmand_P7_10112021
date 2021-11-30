import React, { Component } from "react";
import Icon from "../svgComponents/Icon";
import UserInfo from "../mainComponents/UserInfo";

class Header extends Component {
  //* #######  Simulation de connexion ######## *//

  //* ---------  Simulation de connection : FIN ----------- *//

  render() {
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
        <UserInfo />
      </header>
    );
  }
}

export default Header;

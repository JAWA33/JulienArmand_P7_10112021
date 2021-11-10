import React, { Component } from "react";
import Icon from "../svgComponents/Icon";
import UserInfo from "../mainComponents/UserInfo";

class Header extends Component {
  //* #######  Simulation de connection ######## *//
  state = {
    connected: false,
  };

  Connect = () => {
    this.setState({
      connected: true,
    });
  };

  Disconnect = () => {
    this.setState({
      connected: false,
    });
  };

  //* ---------  Simulation de connection : FIN ----------- *//

  render() {
    const connectButton = this.state.connected ? (
      <button onClick={this.Disconnect}>Disconnect</button>
    ) : (
      <button onClick={this.Connect}>Connect</button>
    );

    const showUserInfo = this.state.connected ? (
      <UserInfo />
    ) : (
      <div>Non connecté</div>
    );

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
          {connectButton}
        </div>
        {showUserInfo}
      </header>
    );
  }
}

export default Header;

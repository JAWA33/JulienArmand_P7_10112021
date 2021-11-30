import React, { useContext } from "react";
import { UidContext } from "../routes/AppContext.js";

const UserInfo = () => {
  const uid = useContext(UidContext);

  const name = JSON.parse(sessionStorage.getItem("connectedUser"));

  return (
    <div>
      {uid ? (
        <div className="userInfo">
          <p>Bienvenue {name.user_firstname}</p>
          <img src={name.user_url_image} alt={name.user_firstname}></img>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserInfo;

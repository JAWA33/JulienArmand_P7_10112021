import React, { useContext } from "react";
import { UidContext } from "../routes/AppContext.js";
import axios from "axios";

const UserInfo = () => {
  const uid = useContext(UidContext);

  const name = JSON.parse(sessionStorage.getItem("connectedUser"));

  const logout = () => {
    axios({
      method: "delete",
      url: process.env.REACT_APP_API_URL + "api/user/logout",
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        //sessionStorage.removeItem("connectedUser");
        window.location = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {uid ? (
        <div className="userInfo">
          <img src={name.user_url_image} alt={name.user_firstname}></img>
          <div>
            <p>Bienvenue {name.user_firstname}</p>
            <button onClick={() => logout()}>Me déconnecter</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserInfo;

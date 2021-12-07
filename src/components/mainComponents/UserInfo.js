import React, { Fragment } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils/isEmpty.js";

const UserInfo = () => {
  const userData = useSelector((state) => state.userReducer);

  const logout = () => {
    axios({
      method: "delete",
      url: process.env.REACT_APP_API_URL + "api/user/logout",
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        window.location = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="userInfo">
      {isEmpty(userData) ? (
        <div>"en chargement"</div>
      ) : (
        <Fragment>
          <img
            src={userData[0].user_url_image}
            alt={userData[0].user_firstname}
          ></img>
          <div>
            <p>Bienvenue {userData[0].user_firstname}</p>
            <button onClick={() => logout()}>Me déconnecter</button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default UserInfo;

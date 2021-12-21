import React, { Fragment } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils/isEmpty.js";
import allUsers from "../../images/icons/users.svg";
import home from "../../images/icons/home.svg";
import logOut from "../../images/icons/logout.svg";
//for git
const Navigation = () => {
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
        sessionStorage.removeItem("id_user");
        sessionStorage.removeItem("connectedUser");
        window.location = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      {isEmpty(userData) ? (
        <div>"en chargement ... "</div>
      ) : (
        <div className="navigation">
          <div>
            <h2 className="navigation__user">
              Bienvenue {userData[0].user_firstname}
            </h2>
          </div>
          <div className="userInfo">
            <NavLink exact to="/" activeClassName="current">
              <div className="userInfo__btn">
                <img src={home} alt="Forum" className="userInfo__btn__icon" />
              </div>
            </NavLink>
            <NavLink exact to="/allusers" activeClassName="current">
              <div className="userInfo__btn">
                <img
                  src={allUsers}
                  alt="Tous les utilisateurs"
                  className="userInfo__btn__icon"
                />
              </div>
            </NavLink>
            <NavLink exact to="/mypage" activeClassName="current">
              <div className="userInfo__btn">
                <img
                  src={userData[0].user_url_image}
                  alt={userData[0].user_firstname}
                ></img>
              </div>
            </NavLink>
            <div className="userInfo__btn" onClick={() => logout()}>
              <img
                src={logOut}
                alt={userData[0].user_firstname}
                className="userInfo__btn__icon"
              ></img>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Navigation;

//   return (
//     <div className="userInfo">
//       {isEmpty(userData) ? (
//         <div>"en chargement"</div>
//       ) : (
//         <div>
//

//         </div>
//       )}
//     </div>
//   );
// };

// export default UserInfo;

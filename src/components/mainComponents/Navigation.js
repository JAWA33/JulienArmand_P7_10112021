import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils/isEmpty.js";
import allUsers from "../../images/icons/users.svg";
import home from "../../images/icons/home.svg";
import logOut from "../../images/icons/logout.svg";
import { logout } from "../Utils/logout.js";

const Navigation = () => {
  const userData = useSelector((state) => state.userReducer);

  return (
    <Fragment>
      {isEmpty(userData) ? (
        <div>"en chargement ... "</div>
      ) : (
        <div className="nav">
          <div className="nav__welcome">
            <p className="nav__welcome__text">
              Bienvenue, {userData[0].user_firstname} !
            </p>
          </div>
          <div className="nav__link">
            <NavLink
              exact
              to="/"
              activeClassName="current"
              className="nav__link__btn  tooltip"
              title="Forum"
            >
              <img src={home} alt="Forum" className="nav__link__btn--icon" />
            </NavLink>
            <NavLink
              exact
              to="/allusers"
              activeClassName="current"
              className="nav__link__btn  tooltip"
              title="Organigramme"
            >
              <img
                src={allUsers}
                alt="Tous les utilisateurs"
                className="nav__link__btn--icon"
              />
            </NavLink>
            <NavLink
              exact
              to="/mypage"
              activeClassName="current"
              className="nav__link__btn tooltip"
              title="Mon_Profil"
            >
              <img
                src={userData[0].user_url_image}
                alt={userData[0].user_firstname}
                className="nav__link__btn--user"
              ></img>
            </NavLink>
            <div
              title="Deconnexion"
              className="nav__link__btn  tooltip"
              onClick={() => logout()}
            >
              <img
                src={logOut}
                alt={userData[0].user_firstname}
                className="nav__link__btn--icon"
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

import React, { Fragment } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils/isEmpty.js";
import allUsers from "../../images/icons/users.svg";
import home from "../../images/icons/home.svg";
import logOut from "../../images/icons/logout.svg";

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
            <p>Bienvenue {userData[0].user_firstname}</p>
          </div>
          <div className="userInfo">
            <NavLink exact to="/" activeClassName="current">
              <div>
                <img src={home} alt="Forum" />
              </div>
            </NavLink>
            <NavLink exact to="/allusers" activeClassName="current">
              <div>
                <img src={allUsers} alt="Tous les utilisateurs" />
              </div>
            </NavLink>
            <NavLink exact to="/mypage" activeClassName="current">
              <div>
                <img
                  src={userData[0].user_url_image}
                  alt={userData[0].user_firstname}
                ></img>
              </div>
            </NavLink>
            <div onClick={() => logout()}>
              <img src={logOut} alt={userData[0].user_firstname}></img>
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

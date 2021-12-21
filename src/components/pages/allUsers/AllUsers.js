import React, { Fragment, useContext, useEffect, useState } from "react";
import { UidContext } from "../../routes/AppContext.js";
import Organization from "./Organization.js";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../../actions/allusers.action.js";
import { getJobs } from "../../../actions/job.actions.js";
import { getUser } from "../../../actions/user.actions.js";
import { isEmpty } from "../../Utils/isEmpty.js";
import MyProfil from "../myProfil/MyProfil.js";
import { getUserProfile } from "../../../actions/userProfil.action.js";
//for git
const AllUsers = () => {
  const uid = useContext(UidContext);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const jobData = useSelector((state) => state.jobReducer);
  const allUsersData = useSelector((state) => state.allUsersReducer);
  const userProfileData = useSelector((state) => state.userProfilReducer);

  useEffect(() => {
    if (loading) {
      isEmpty(allUsersData) && dispatch(getAllUsers());
      isEmpty(jobData) && dispatch(getJobs());
      isEmpty(userData) && dispatch(getUser());
      setLoading(false);
      console.log(userProfileData);
    }
  }, [loading, allUsersData, jobData, userData, userProfileData, dispatch]);

  //orage.setItem("user_selected", JSON.stringify(user));

  return (
    <div className="allUsers">
      {uid &&
      !isEmpty(userData) &&
      !isEmpty(allUsersData) &&
      !isEmpty(jobData) ? (
        <Fragment>
          <div className="allUsers__organization">
            <Organization
              allusers={allUsersData}
              jobs={jobData}
              key={"myprofil" + userData[0].id_user}
            />
          </div>
          {!isEmpty(userProfileData) ? (
            <MyProfil data={userProfileData} modif={false} />
          ) : (
            "Veuillez sélectionner un profil pour l'afficher"
          )}
        </Fragment>
      ) : (
        <div>
          <h1>Chargement en cours ... </h1>
        </div>
      )}
    </div>
  );
};

export default AllUsers;

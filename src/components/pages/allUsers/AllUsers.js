import React, { Fragment, useContext, useEffect, useState } from "react";
import { UidContext } from "../../routes/AppContext.js";
import Organization from "./Organization.js";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../../actions/allusers.action.js";
import { getJobs } from "../../../actions/job.actions.js";
import { isEmpty } from "../../Utils/isEmpty.js";
import MyProfil from "../myProfil/MyProfil.js";
import Loader from "../../mainComponents/Loader.js";

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
      //isEmpty(userData) && dispatch(getUser());
      setLoading(false);

      console.log(userProfileData);
    }
  }, [loading, allUsersData, jobData, userData, userProfileData, dispatch]);

  const changePosition = () => {
    document.getElementById("organization").classList.add("firstPlace");
    document.getElementById("profil").classList.remove("firstPlace");
  };

  return (
    <div className="allUsers">
      {uid ? (
        !isEmpty(userData) && !isEmpty(allUsersData) && !isEmpty(jobData) ? (
          <Fragment>
            <div
              className="allUsers__organization firstPlace"
              id="organization"
            >
              <Organization
                allusers={allUsersData}
                jobs={jobData}
                key={"myprofil" + userData[0].id_user}
              />
            </div>
            <div className="allUsers__profil" id="profil">
              {!isEmpty(userProfileData) ? (
                <Fragment>
                  <button
                    title="Fermer"
                    className="closeProfil closeProfil--top"
                    onClick={() => changePosition()}
                  >
                    X
                  </button>
                  <MyProfil data={userProfileData} modif={false} />
                  <button
                    title="Fermer"
                    className="closeProfil closeProfil--bottom"
                    onClick={() => changePosition()}
                  >
                    X
                  </button>
                </Fragment>
              ) : (
                <p className="allUsers__profil__waiting">
                  Veuillez sélectionner un profil pour l'afficher
                </p>
              )}
            </div>
          </Fragment>
        ) : (
          <Loader />
        )
      ) : (
        (window.location = "/")
      )}
    </div>
  );
};

export default AllUsers;

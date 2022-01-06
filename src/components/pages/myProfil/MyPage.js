import React, { Fragment, useContext } from "react";
import { UidContext } from "../../routes/AppContext.js";
import MyProfil from "./MyProfil";
import { useSelector } from "react-redux";
import Loader from "../../mainComponents/Loader.js";

const MyPage = () => {
  const uid = useContext(UidContext);

  const userData = useSelector((state) => state.userReducer);

  console.log("uid");
  console.log(uid);

  return (
    <div className="centerPage">
      {uid ? (
        userData[0] ? (
          <div className="centerPage">
            <MyProfil
              data={userData}
              key={"myprofil" + userData[0].id_user}
              modif={true}
            />
          </div>
        ) : (
          <Loader />
        )
      ) : (
        (window.location = "/")
      )}
    </div>
  );
};

export default MyPage;

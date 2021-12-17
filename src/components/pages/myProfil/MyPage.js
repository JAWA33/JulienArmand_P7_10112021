import React, { Fragment, useContext } from "react";
import { UidContext } from "../../routes/AppContext.js";
import MyProfil from "./MyProfil";
import { useSelector } from "react-redux";

const MyPage = () => {
  const uid = useContext(UidContext);

  const userData = useSelector((state) => state.userReducer);

  console.log("uid");
  console.log(uid);

  return (
    <Fragment>
      {uid ? (
        userData[0] ? (
          <div className="myPage">
            <MyProfil data={userData} key={"myprofil" + userData[0].id_user} />
          </div>
        ) : (
          ""
        )
      ) : (
        (window.location = "/")
      )}
    </Fragment>
  );
};

export default MyPage;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { UidContext } from "./components/routes/AppContext.js";
import Routes from "./components/routes/Routes.js";
import "./css/main.css";
import dotenv from "dotenv";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions.js";
dotenv.config({ path: "../../../../.env" });

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const verifToken = async () => {
      await axios({
        method: "get",
        url: process.env.REACT_APP_API_URL + "jwtid",
        withCredentials: true,
      })
        .then((res) => {
          console.log(res.data);
          setUid(res.data);
          console.log(uid);
        })
        .catch((err) => {
          console.log("No Token ERROR");
          setUid(null);
        });
      console.log(uid);
      console.log("dispatch getuser :");
      if (uid) {
        dispatch(getUser(uid));
        console.log("dispatch OK");
      } else {
        console.log(" NOT dispatch");
      }
    };
    verifToken();
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <div id="app">
        <Routes />
      </div>
    </UidContext.Provider>
  );
};

export default App;

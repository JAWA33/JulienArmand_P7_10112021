import axios from "axios";
import React, { useEffect, useState } from "react";
import { UidContext } from "./components/routes/AppContext.js";
import Routes from "./components/routes/Routes.js";
import "./css/main.css";
import dotenv from "dotenv";
dotenv.config({ path: "../../../../.env" });

const App = () => {
  const [uid, setUid] = useState(null);

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
        })
        .catch((err) => console.log("No Token ERROR"));
    };
    verifToken();
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <div id="app">
        <Routes />
      </div>
    </UidContext.Provider>
  );
};

export default App;

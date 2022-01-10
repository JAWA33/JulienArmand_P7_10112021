import React, { useEffect } from "react";
import { UidContext } from "./components/routes/AppContext.js";
import Routes from "./components/routes/Routes.js";
import "./css/main.css";
import dotenv from "dotenv";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./actions/user.actions.js";
import { getUid } from "./actions/uid.action.js";
import { isEmpty } from "./components/Utils/isEmpty.js";
dotenv.config({ path: "../../../../.env" });

const App = () => {
  const dispatch = useDispatch();

  const uidData = useSelector((state) => state.uidReducer);

  useEffect(() => {
    if (isEmpty(uidData)) {
      //console.log("pas de uidData");
      dispatch(getUid());
    } else {
      dispatch(getUser(uidData));
    }
  }, [uidData, dispatch]);

  return (
    <UidContext.Provider value={!isEmpty(uidData) && uidData}>
      <div id="app">
        <Routes />
      </div>
    </UidContext.Provider>
  );
};

export default App;

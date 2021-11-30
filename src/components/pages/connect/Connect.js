import React, { useContext } from "react";
import Log from "./Log.js";
import Forum from "../forum/Forum.js";
import { UidContext } from "../../routes/AppContext.js";

function Connect() {
  const uid = useContext(UidContext);
  return (
    <div>
      {uid ? (
        <Forum />
      ) : (
        <div>
          <h1> Bienvenue sur Groupcom</h1>
          <Log />
        </div>
      )}
    </div>
  );
}

export default Connect;

import React, { useContext } from "react";
import { UidContext } from "../../routes/AppContext.js";

const Forum = () => {
  const uid = useContext(UidContext);

  return (
    <div>
      {uid ? (
        <div>
          <h2>Ceci est le forum de discussion</h2>
          <h3>Premier message</h3>
          <h3>Second message</h3>
        </div>
      ) : (
        (window.location = "/")
      )}
    </div>
  );
};

export default Forum;

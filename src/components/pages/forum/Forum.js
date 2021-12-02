import React, { useContext } from "react";
import { UidContext } from "../../routes/AppContext.js";

import Posts from "./Posts.js";

const Forum = () => {
  const uid = useContext(UidContext);

  return (
    <div>
      {uid ? (
        <div id="forumPage">
          <Posts />
        </div>
      ) : (
        (window.location = "/")
      )}
    </div>
  );
};

export default Forum;

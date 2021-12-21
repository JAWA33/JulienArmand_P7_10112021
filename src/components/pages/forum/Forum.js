import React, { useContext } from "react";
import { UidContext } from "../../routes/AppContext.js";

import Posts from "./Posts.js";
import CreatePost from "./CreatePost.js";
//for git
const Forum = () => {
  const uid = useContext(UidContext);

  return (
    <div>
      {uid ? (
        <div id="forumPage">
          <CreatePost />
          <Posts />
        </div>
      ) : (
        (window.location = "/")
      )}
    </div>
  );
};

export default Forum;

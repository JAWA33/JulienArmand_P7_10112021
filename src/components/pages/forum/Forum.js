import React, { useContext, Fragment } from "react";
import { UidContext } from "../../routes/AppContext.js";
import Posts from "./Posts.js";
import CreatePost from "./CreatePost.js";

const Forum = () => {
  const uid = useContext(UidContext);

  return (
    <Fragment>
      {uid ? (
        <div id="forumPage">
          <CreatePost />
          <Posts />
        </div>
      ) : (
        (window.location = "/")
      )}
    </Fragment>
  );
};

export default Forum;

import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createComment,
  getAllComments,
} from "../../../actions/comment.action.js";
import { isEmpty } from "../../Utils/isEmpty.js";

//

//
const CreateComments = ({ data }) => {
  const [loadComments, setLoadComments] = useState(true);
  const [myComment, setMyComment] = useState("");

  //const commentsData = useSelector((state) => state.commentsReducer);
  const userData = useSelector((state) => state.userReducer);
  const postData = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();

  console.log("myComment");
  console.log(myComment);

  useEffect(() => {
    if (loadComments) {
      dispatch(getAllComments());
      setLoadComments(false);
    }
  }, [loadComments, dispatch]);

  const saveComment = async (idpost) => {
    if (myComment && !isEmpty(userData[0])) {
      const commentData = new FormData();
      commentData.append("comment_text", myComment);
      commentData.append("user_url_image", userData[0].user_url_image);
      commentData.append("comment_id_user", userData[0].id_user);
      postData.map((post) => {
        if (post.id_post == idpost) {
          if (post.nbr_comments)
            commentData.append("nbr_comments", post.nbr_comments);
          return commentData;
        } else {
          return null;
        }
      });
      //;
      await console.log(commentData);
      await dispatch(createComment(idpost, commentData));
      await setMyComment("");
    } else {
      alert("Merci de remplir un commentaire avant d'envoyer");
    }
  };

  //useEffect(() => {}, []);

  return (
    <Fragment>
      <hr />
      <div className="createComment">
        <h3>Faites un commentaire</h3>
        <textarea
          type="text"
          className="createComment__input"
          value={myComment}
          onChange={(e) => setMyComment(e.target.value)}
        />
        <button
          className="createComment__btn"
          onClick={() => saveComment(data.id_post)}
        >
          Envoyer
        </button>
      </div>
    </Fragment>
  );
};

export default CreateComments;

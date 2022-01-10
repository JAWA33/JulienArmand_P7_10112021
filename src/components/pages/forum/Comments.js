import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllComments,
  updateComment,
} from "../../../actions/comment.action.js";
import { isEmpty } from "../../Utils/isEmpty.js";
import EditIcon from "../../svgComponents/EditIcon.js";
import DeleteCommentAlert from "../../mainComponents/DeleteCommentAlert.js";

//

//
const Comments = ({ data }) => {
  const [loadComments, setLoadComments] = useState(true);
  const [isToUpdate, setIsToUpdate] = useState(false);
  const [commentToUpdate, setCommentToUpdate] = useState("");
  const [newComment, setNewComment] = useState("");

  const commentsData = useSelector((state) => state.commentsReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  // const deleteMyComment = async (idcomment, data) => {
  //   await dispatch(deleteComment(idcomment, data));
  // };

  const updateMyComment = async (idcomment) => {
    await dispatch(updateComment(idcomment, { comment_text: newComment }));
    await setNewComment("");
    await setIsToUpdate(!isToUpdate);
    await setCommentToUpdate("");
  };

  const toggleUpdate = (idcomment) => {
    setCommentToUpdate(idcomment);
    setIsToUpdate(!isToUpdate);
  };

  useEffect(() => {
    if (loadComments) {
      dispatch(getAllComments());
      setLoadComments(false);
    }
  }, [loadComments, dispatch]);

  return (
    <Fragment>
      {!isEmpty(commentsData[0]) &&
        !isEmpty(userData[0]) &&
        commentsData.map((comment) => {
          if (comment.comment_id_post == data.id_post) {
            return (
              <div key={"oups" + comment.id_comment}>
                <hr />
                <div className="commentContainer">
                  <div className="commentContainer__comment">
                    <div>
                      <img
                        className="commentContainer__image"
                        src={comment.user_url_image}
                        alt={"profil " + comment.comment_id_user}
                      />
                    </div>
                    {isToUpdate && commentToUpdate === comment.id_comment ? (
                      <Fragment>
                        <textarea
                          type="text"
                          defaultValue={comment.comment_text}
                          onInput={(e) => setNewComment(e.target.value)}
                        ></textarea>
                        <button
                          onClick={() => updateMyComment(comment.id_comment)}
                        >
                          Valider
                        </button>
                      </Fragment>
                    ) : (
                      <p>{comment.comment_text}</p>
                    )}
                  </div>
                  {userData[0].user_status === "Moderateur" ||
                  userData[0].id_user == comment.comment_id_user ? (
                    <div className="commentContainer__modify">
                      <div
                        className="commentContainer__modify--edit"
                        onClick={() => toggleUpdate(comment.id_comment)}
                      >
                        <EditIcon />
                      </div>
                      <div className="commentContainer__modify--delete">
                        <DeleteCommentAlert
                          idcomment={comment.id_comment}
                          data={data}
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          } else return null;
        })}
    </Fragment>
  );
};

export default Comments;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPosts,
  likePost,
  dislikePost,
} from "../../../actions/post.actions";
import EditIcon from "../../svgComponents/EditIcon.js";
import TrashIcon from "../../svgComponents/TrashIcon.js";
import { isEmpty } from "../../Utils/isEmpty.js";
import { nowToDate } from "../../Utils/nowToDate.js";

const Posts = () => {
  //* Hooks :
  const [loadPosts, setLoadPosts] = useState(true);
  const [count, setCount] = useState(3);
  let addDisplayPosts = 3;

  const dispatch = useDispatch();
  const postData = useSelector((state) => state.postReducer);
  const userData = useSelector((state) => state.userReducer);

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPosts(true);
    }
  };

  useEffect(() => {
    if (loadPosts) {
      dispatch(getAllPosts(count));
      setLoadPosts(false);
      setCount(count + addDisplayPosts);
    }

    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPosts, dispatch, count, addDisplayPosts]);

  //* Liker le post :
  const ILikePost = (idpost) => {
    dispatch(likePost(idpost));
  };

  //* Disliker le post :
  const IDislikePost = (idpost) => {
    dispatch(dislikePost(idpost));
  };

  return (
    <div>
      {!isEmpty(postData) &&
        !isEmpty(userData) &&
        postData.map((data) => (
          <div key={data.id_post} className="post" id={"post" + data.id_post}>
            <div className="post__userInfo">
              <img
                src={data.user_url_image}
                alt={"photo" + data.user_firstname}
                className="post__userInfo__img"
              ></img>
              <div className="post__userInfo__text">
                <p>
                  <strong>
                    {data.user_firstname +
                      " " +
                      (data.user_lastname !== null ? data.user_lastname : "")}
                  </strong>
                </p>
                <p>{data.job_name}</p>
                <p>{nowToDate(data.post_create)}</p>
              </div>
            </div>

            <hr />
            <div className="post__container">
              {!isEmpty(data.post_text) && (
                <div className="post__container__text">
                  <p>{data.post_text}</p>
                </div>
              )}

              {!isEmpty(data.post_video) && (
                <iframe
                  src={data.post_video}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={data.post_video}
                ></iframe>
              )}
              {!isEmpty(data.post_url_image) && (
                <img
                  src={data.post_url_image}
                  alt={"photo" + data.id_post}
                  className="post__container__img"
                ></img>
              )}
            </div>
            {userData[0].user_status === "Moderateur" ||
            userData[0].id_user === data.post_id_user ? (
              <div className="post__edit">
                <EditIcon
                  fillColor="#081f43"
                  lineColor="#081f43"
                  height="24"
                  width="24"
                ></EditIcon>
                <br />
                <TrashIcon
                  fillColor="#081f43"
                  lineColor="#081f43"
                  height="24"
                  width="24"
                ></TrashIcon>
              </div>
            ) : (
              ""
            )}

            <hr />
            <div className="post__info">
              <div className="postInfo">
                <p className="postInfo__count">
                  <strong>{data.nbr_likes}</strong> J'aime
                </p>
                <p className="postInfo__count">
                  <strong>{data.nbr_comments}</strong> Commentaires
                </p>
              </div>
              <div>module modif à afficher</div>
            </div>
            <hr />
            <div className="post__action">
              {data.i_like_post === "yes" ? (
                <div
                  className="post__action__container post__action__container--liked"
                  onClick={() => IDislikePost(data.id_post)}
                >
                  <p>X -</p>
                  <p>J'aime</p>
                </div>
              ) : (
                <div
                  className="post__action__container post__action__container--disliked"
                  onClick={() => ILikePost(data.id_post)}
                >
                  <p>O -</p>
                  <p>J'aime</p>
                </div>
              )}
              <div className="post__action__container">
                <p>O -</p>
                <p>Commenter</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Posts;

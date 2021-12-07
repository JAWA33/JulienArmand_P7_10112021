import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPosts,
  likePost,
  dislikePost,
} from "../../../actions/post.actions";
import { isEmpty } from "../../Utils/isEmpty";

const Posts = () => {
  //* Hooks :

  const postData = useSelector((state) => state.postReducer);

  const dispatch = useDispatch();

  console.log(postData);

  isEmpty(postData) ? dispatch(getAllPosts()) : console.log("déjà chargé");

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
        postData.map((data, index) => (
          <div key={index} className="post" id={"post" + data.id_post}>
            <div className="post__userInfo">
              <img
                src={data.user_url_image}
                alt={"photo" + data.user_firstname}
                className="post__userInfo__img"
              ></img>
              <div className="post__userInfo__text">
                <p>
                  <strong>
                    {data.user_firstname + " " + data.user_lastname}
                  </strong>
                </p>
                <p>{data.job_name}</p>
                <p>{data.post_create}</p>
              </div>
            </div>
            <hr />
            <div className="post__container">
              <div className="post__container__text">
                <p>{data.post_text}</p>
              </div>
              <img
                src={data.post_url_image}
                alt={"photo" + data.id_post}
                className="post__container__img"
              ></img>
            </div>
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
      ;
    </div>
  );
};

export default Posts;

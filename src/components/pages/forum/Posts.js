import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPosts,
  likePost,
  dislikePost,
  updatePost,
  deletePost,
} from "../../../actions/post.actions";
import EditIcon from "../../svgComponents/EditIcon.js";
import TrashIcon from "../../svgComponents/TrashIcon.js";
import { isEmpty } from "../../Utils/isEmpty.js";
import { nowToDate } from "../../Utils/nowToDate.js";
import PictureIcon from "../../svgComponents/PictureIcon.js";
import Comments from "./Comments.js";
import CreateComments from "./CreateComment";
import Compressor from "compressorjs";
import { Spin } from "antd";

const Posts = () => {
  //* Hooks :
  const [loadPosts, setLoadPosts] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [toUpdated, setToUpdated] = useState("");
  const [textUpdate, setTextUpdate] = useState(null);
  const [linkUpdate, setLinkUpdate] = useState("");
  const [videoUpdate, setVideoUpdate] = useState(null);
  const [pictureUpdate, setPictureUpdate] = useState(null);
  const [fileUpdate, setFileUpdate] = useState();
  const [makeComment, setMakeComment] = useState("");
  const [whatComments, setWhatComments] = useState("");

  const [count, setCount] = useState(3);
  let addDisplayPosts = 3;

  const dispatch = useDispatch();
  const postData = useSelector((state) => state.postReducer);
  const userData = useSelector((state) => state.userReducer);

  //* Gestion du infinite-scroll:
  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPosts(true);
    }
  };

  //* Lance la transformation du lien de Youtube en lien lisible par le navigateur:
  useEffect(() => {
    if (!isEmpty(linkUpdate)) {
      if (
        linkUpdate.includes("https://www.youtube") ||
        linkUpdate.includes("https://youtube")
      ) {
        let embed = linkUpdate.replace("watch?v=", "embed/");
        setVideoUpdate(embed.split("&")[0]);
        setPictureUpdate("");
      }
    }
  }, [linkUpdate]);

  //* Création du fichier lors d'un update :
  const handlePicture = (e) => {
    makeCompressor(e.target.files[0], {
      maxWidth: 500,
      quality: 0.6,
      success(imgBlob) {
        setPictureUpdate(URL.createObjectURL(imgBlob));
        setFileUpdate(imgBlob);
      },
      error(err) {
        console.log(err.message);
      },
    });
    setVideoUpdate("");
  };

  //* Compressor file :
  const makeCompressor = (file, options) => {
    return new Compressor(file, options);
  };

  //* Mise à jour du post :
  const updateMyPost = async (idpost) => {
    if (textUpdate || videoUpdate || pictureUpdate) {
      const updateData = new FormData();
      if (textUpdate) updateData.append("post_text", textUpdate);
      if (videoUpdate) updateData.append("post_video", videoUpdate);
      if (fileUpdate) updateData.append("file", fileUpdate);

      postData.map((data) => {
        console.log("DATA ID POST");
        console.log(data.id_post);
        console.log(idpost);
        if (data.id_post == idpost) {
          if (fileUpdate)
            updateData.append("url_image_toDelete", data.post_url_image);
          if (!fileUpdate)
            updateData.append("post_url_image", data.post_url_image);
          if (!videoUpdate) updateData.append("post_video", data.post_video);
          if (!textUpdate) updateData.append("post_text", data.post_text);

          return updateData;
        } else {
          return data;
        }
      });

      await dispatch(updatePost(idpost, updateData));
      await setIsUpdated(false);
      await setToUpdated("");
      await setTextUpdate(null);
      await setVideoUpdate(null);
      await setPictureUpdate(null);
      await setFileUpdate();
    } else {
      alert("Pas de modification sans changement");
      toggleUpdate(idpost);
    }
  };

  //* Effacer un post :
  const deleteMyPost = async (idpost) => {
    await dispatch(deletePost(idpost));
  };

  //* useEffect pour l'infinite-scroll :
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

  //* Activation/désactivation de la modification d'un post
  const toggleUpdate = (idpost) => {
    setIsUpdated(!isUpdated);
    setToUpdated(idpost);
    setTextUpdate(null);
    setVideoUpdate(null);
    setPictureUpdate(null);
  };

  const showComments = (idpost) => {
    idpost === whatComments ? setWhatComments("") : setWhatComments(idpost);
  };

  const addComment = (idpost) => {
    idpost === makeComment ? setMakeComment("") : setMakeComment(idpost);
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
              <div className="post__container__text">
                {(!isUpdated || toUpdated !== data.id_post) && (
                  <p>{data.post_text}</p>
                )}
                {isUpdated && toUpdated === data.id_post ? (
                  <div>
                    <textarea
                      defaultValue={data.post_text}
                      onChange={(e) => setTextUpdate(e.target.value)}
                    />
                  </div>
                ) : null}
              </div>
              {/* //? Affiche la video si elle existe et si pas d'update du post */}
              {(!isUpdated || toUpdated != data.id_post) &&
                !isEmpty(data.post_video) && (
                  <iframe
                    src={data.post_video}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={data.post_video}
                  ></iframe>
                )}
              {/* //? Affiche la modification de video si elle existe et si update du post en cours */}
              {isUpdated && toUpdated == data.id_post ? (
                <div>
                  {!isEmpty(data.post_video) && (
                    <div>
                      <iframe
                        height="200"
                        width="200"
                        src={
                          isEmpty(videoUpdate) ? data.post_video : videoUpdate
                        }
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={data.post_video}
                      ></iframe>
                      <input
                        type="text"
                        //defaultValue={data.post_video}
                        //value={!isEmpty(videoUpdate) ? videoUpdate : ""}
                        placeholder="Coller votre lien Youtube"
                        onInput={(e) => setLinkUpdate(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              ) : null}
              {/* //? Affiche l'image si elle existe et si pas d'update du post */}
              {(!isUpdated || toUpdated !== data.id_post) &&
                !isEmpty(data.post_url_image) && (
                  <img
                    src={data.post_url_image}
                    alt={"photo" + data.id_post}
                    className="post__container__img"
                  ></img>
                )}
              {/* //? Affiche la modification de video si elle existe et si update du post en cours */}
              {isUpdated && toUpdated === data.id_post ? (
                <div>
                  {!isEmpty(data.post_url_image) && (
                    <div>
                      <div>
                        <img
                          src={
                            !isEmpty(pictureUpdate)
                              ? pictureUpdate
                              : data.post_url_image
                          }
                          alt={"photo" + data.id_post}
                          className="post__container__img"
                        ></img>
                      </div>
                      <div>
                        <PictureIcon
                          fillColor="#081f43"
                          lineColor="transparent"
                          height="40"
                          width="40"
                        ></PictureIcon>
                        {/* <label htmlFor="filePost">Modifiez votre image :</label> */}
                        <input
                          type="file"
                          //id="changeFile"
                          name="file"
                          accept=".jpg, .jpeg, .png"
                          onInput={(e) => handlePicture(e)}
                        ></input>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
            {isUpdated && toUpdated === data.id_post ? (
              <div>
                <button onClick={() => updateMyPost(data.id_post)}>
                  Valider les modifications
                </button>
              </div>
            ) : null}

            {userData[0].user_status === "Moderateur" ||
            userData[0].id_user === data.post_id_user ? (
              <div className="post__edit">
                <div onClick={() => toggleUpdate(data.id_post)}>
                  <EditIcon
                    fillColor="#081f43"
                    lineColor="#081f43"
                    height="24"
                    width="24"
                  ></EditIcon>
                </div>
                <br />
                <div
                  onClick={() => {
                    if (
                      window.confirm("Voulez-vous vraiment supprimer ce post ?")
                    ) {
                      deleteMyPost(data.id_post);
                    }
                  }}
                >
                  <TrashIcon
                    fillColor="#081f43"
                    lineColor="#081f43"
                    height="24"
                    width="24"
                  ></TrashIcon>
                </div>
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
                <p
                  className="postInfo__count"
                  onClick={() => showComments(data.id_post)}
                >
                  <strong>{data.nbr_comments}</strong> Commentaire
                  {data.nbr_comments <= 1 ? "" : "s"}
                </p>
              </div>
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
              <div
                className="post__action__container"
                onClick={() => {
                  addComment(data.id_post);
                }}
              >
                <p>O -</p>
                <p>Commenter</p>
              </div>
            </div>
            {makeComment === data.id_post ? (
              <CreateComments data={data} key={"CC" + data.id_post} />
            ) : (
              ""
            )}

            {whatComments === data.id_post ? (
              <Comments data={data} key={"super" + data.id_post} />
            ) : (
              ""
            )}
          </div>
        ))}
    </div>
  );
};

export default Posts;

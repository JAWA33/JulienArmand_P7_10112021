import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../../actions/post.actions.js";
import { isEmpty } from "../../Utils/isEmpty.js";
import Compressor from "compressorjs";
//import axios from "axios";

//import { validParagraph } from "../../Utils/regExp.js";
import Loader from "../../mainComponents/Loader.js";

const CreatePost = () => {
  //* Hooks pour formulaire :
  const [isLoading, setIsLoading] = useState(true);
  const [postPicture, setPostPicture] = useState(null);
  const [textPost, setTextPost] = useState("");
  const [postVideo, setPostVideo] = useState("");
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const CreatePostForm = document.getElementById("CreatePostForm");
  const alertMessage = document.getElementById("alertMessage");

  //* ########  Controle pré-requête lors de la saisie du formulaire :
  // useEffect(() => {
  //   if (!isEmpty(textPost)) {
  //     if (CreatePostForm) {
  //       CreatePostForm.textPost.addEventListener("change", function () {
  //         validParagraph(this);
  //       });
  //     }
  //   } else {
  //     alertMessage.innerHTML = "";
  //   }
  // }, [textPost]);

  const handleVideo = () => {
    let findLink = textPost.split(" ");
    for (let i = 0; i < findLink.length; i++) {
      if (
        findLink[i].includes("https://www.youtube") ||
        findLink[i].includes("https://youtube")
      ) {
        let embed = findLink[i].replace("watch?v=", "embed/");
        setPostVideo(embed.split("&")[0]);
        findLink.splice(i, 1);
        setTextPost(findLink.join(" "));
        setPostPicture("");
      }
    }
  };

  const cancelPost = () => {
    setPostVideo("");
    setTextPost("");
    setPostPicture("");
    setFile("");
    alertMessage.innerHTML = "";
    alertMessage.classList.remove("error");
    alertMessage.classList.remove("success");
    CreatePostForm.textPost.classList.remove("error");
    CreatePostForm.textPost.classList.remove("success");
  };

  const handlePicture = (e) => {
    makeCompressor(e.target.files[0], {
      maxWidth: 700,
      quality: 0.6,
      success(imgBlob) {
        setPostPicture(URL.createObjectURL(imgBlob));
        setFile(imgBlob);
      },
      error(err) {
        console.log(err.message);
      },
    });

    setPostVideo("");
  };

  const makeCompressor = (file, options) => {
    return new Compressor(file, options);
  };

  useEffect(() => {
    if (!isEmpty(userData)) {
      setIsLoading(false);
      handleVideo();
    }
  }, [userData, textPost, postVideo]);

  const postFormSubmit = async (e) => {
    e.preventDefault();

    if (textPost || postVideo || postPicture) {
      const postData = new FormData();
      postData.append("post_text", textPost);
      postData.append("post_video", postVideo);
      postData.append("post_id_user", userData[0].id_user);
      postData.append("user_firstname", userData[0].user_firstname);
      postData.append("user_lastname", userData[0].user_lastname);
      postData.append("user_url_image", userData[0].user_url_image);
      postData.append("job_name", userData[0].job_name);
      postData.append("service_name", userData[0].service_name);
      if (file) postData.append("file", file);

      await dispatch(createPost(postData));
      await cancelPost();
    } else {
      alert("Impossible de créer un post vide");
    }

    // const postData = {
    //   post_text: textPost,
    //   userData: userData[0],
    //   post_video: postVideo,
    // };
  };

  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="createPost">
          <div className="createPost__title">
            <h2>Partagez avec le groupe</h2>
          </div>
          <div className="createPost__container">
            <form
              action=""
              className="createPost__container__form"
              id="CreatePostForm"
              onSubmit={(e) => postFormSubmit(e)}
            >
              <div>
                <div className="firstRow">
                  <textarea
                    id="myComment"
                    name="textPost"
                    onChange={(e) => setTextPost(e.target.value)}
                    value={textPost}
                    placeholder="Partagez vos succès, informez vos collègues ..."
                  ></textarea>
                  {isEmpty(postVideo) ? (
                    <div className="iconImage">
                      <label htmlFor="file">Ajoutez une image</label>
                      <input
                        type="button"
                        className="btn__profil btn__profil--select btn__profil--crop"
                        value="Choisir"
                        onClick={() =>
                          document.getElementById("myFile").click()
                        }
                      />
                      {/* <label htmlFor="filePost">Modifiez votre image :</label> */}
                      <input
                        type="file"
                        id="myFile"
                        name="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={(e) => handlePicture(e)}
                      ></input>
                    </div>
                  ) : (
                    <button
                      className="btn__profil btn__profil--select"
                      onClick={() => setPostVideo("")}
                    >
                      Supprimer la vidéo
                    </button>
                  )}
                  <p id="alertMessage"></p>
                </div>
                {postPicture || postVideo.length > 20 ? (
                  <div className="imageContainer">
                    <img src={postPicture} alt="" />
                    {postVideo && (
                      <iframe
                        src={postVideo}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={postVideo}
                      ></iframe>
                    )}
                  </div>
                ) : null}
              </div>

              <div className="secondRow">
                {textPost || postPicture || postVideo.length > 20 ? (
                  <Fragment>
                    <div className="blockBtn">
                      <input
                        type="submit"
                        className="btn__profil btn__profil--modify"
                      ></input>
                    </div>

                    <div className="blockBtn">
                      <button
                        className="btn__profil btn__profil--delete"
                        onClick={cancelPost}
                      >
                        Annuler mon post
                      </button>
                    </div>
                  </Fragment>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default CreatePost;

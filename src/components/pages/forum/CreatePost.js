import React, { useState } from "react";
//import axios from "axios";

import { validParagraph } from "../../Utils/regExp.js";

const CreatePost = () => {
  //* Hooks pour formulaire :
  const [textPost, setTextPost] = useState("");

  const CreatePostForm = document.getElementById("CreatePostForm");
  const alertMessage = document.getElementById("alertMessage");

  //* ########  Controle pré-requête lors de la saisie du formulaire :

  if (CreatePostForm) {
    CreatePostForm.textPost.addEventListener("change", function () {
      validParagraph(this);

      if (!validParagraph(this)) {
        if (CreatePostForm.textPost.value === "") {
          alertMessage.innerHTML = "";
          alertMessage.classList.remove("error");
          alertMessage.classList.remove("success");
          CreatePostForm.textPost.classList.remove("error");
          CreatePostForm.textPost.classList.remove("success");
        } else {
          alertMessage.innerHTML =
            "Mini 3 caractères, exclusion : slash, anti-slash, underscore, apostrophe";
          alertMessage.classList.add("error");
        }
      } else {
        alertMessage.innerHTML = "";
        alertMessage.classList.remove("error");
      }
    });
  }

  const postFormSubmit = (e) => {
    e.preventDefault();
    console.log(textPost);
  };

  return (
    <div className="createPost">
      <div className="createPost__title">
        <h2>Partagez avec le groupe</h2>
      </div>
      <div className="createPost__container">
        <form
          action=""
          className="createPost__container__form"
          id="CreatePostForm"
          onSubmit={postFormSubmit}
        >
          <div>
            <label htmlFor="textPost">Que souhaitez vous dire :</label>
            <textarea
              id="myComment"
              name="textPost"
              rows="5"
              cols="50"
              onChange={(e) => setTextPost(e.target.value)}
              value={textPost}
            ></textarea>
            <p id="alertMessage">alertMessage</p>
          </div>
          <div>
            <label htmlFor="filePost">Modifiez votre image :</label>
            <input type="file" id="myFile" name="filePost"></input>
          </div>
          <input type="submit"></input>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;

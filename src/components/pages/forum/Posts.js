import React, { useState, useEffect } from "react";
import axios from "axios";

const Posts = () => {
  //* Hooks :
  // postInfos stocke les datas des posts :
  const [postInfos, setPostInfos] = useState([]);
  // loading gére l'affichage de l'attente avant chargement
  const [loading, setLoading] = useState(true);

  //* Mise en attente avant chargement des données(si loading existe), puis affichage des données (si loading n'existe plus) :
  const resultsPosts = !loading ? (
    postInfos.map((data) => (
      <div
        key={data.id_post.toString()}
        className="post"
        id={"post" + data.id_post}
      >
        <div className="post__userInfo">
          <img
            src={data.user_url_image}
            alt={"photo" + data.user_firstname}
            className="post__userInfo__img"
          ></img>
          <div className="post__userInfo__text">
            <p>
              <strong>{data.user_firstname + " " + data.user_lastname}</strong>
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
          <div className="post__action__container">
            <p>O -</p>
            <p>J'aime</p>
          </div>
          <div className="post__action__container">
            <p>O -</p>
            <p>Commenter</p>
          </div>
        </div>
      </div>
    ))
  ) : (
    <h2>En attente ...</h2>
  );

  //* Chargement des données de posts lors du chargement de la page :
  useEffect(() => {
    const getPosts = () => {
      axios({
        method: "get",
        url: process.env.REACT_APP_API_URL + "api/post/all",
        withCredentials: true,
      })
        .then((res) => {
          //récupére la data dans le hooks postInfos :
          setPostInfos(res.data);
          // affiche le résultat en désactivant le loading :
          setLoading(false);
          //sessionStorage.setItem("allPosts", JSON.stringify(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getPosts();
  }, []);

  return <div>{resultsPosts}</div>;
};

export default Posts;

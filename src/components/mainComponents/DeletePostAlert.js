import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.actions.js";
import TrashIcon from "../svgComponents/TrashIcon.js";

const DeletePostAlert = (props) => {
  const dispatch = useDispatch();

  //* Effacer un post :
  const deleteMyPost = async () => {
    await dispatch(deletePost(props.idpost));
  };

  const submit = () => {
    confirmAlert({
      title: "Suppression du post",
      message:
        "Toute suppression est définitive, voulez-vous supprimer ce post ?",
      buttons: [
        {
          label: "Supprimer",
          onClick: () => deleteMyPost(),
        },
        {
          label: "Annuler",
          onClick: () => console.log("cancel"),
        },
      ],
    });
  };

  return (
    <div onClick={submit}>
      <TrashIcon />
    </div>
  );
};

export default DeletePostAlert;

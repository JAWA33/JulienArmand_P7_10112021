import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useDispatch } from "react-redux";
import { deleteComment } from "../../actions/comment.action.js";
import TrashIcon from "../svgComponents/TrashIcon.js";

const DeleteCommentAlert = (props) => {
  const dispatch = useDispatch();

  //* Effacer un commentaire :
  const deleteMyComment = async () => {
    await dispatch(deleteComment(props.idcomment, props.data));
  };

  const submit = () => {
    confirmAlert({
      title: "Suppression du commentaire",
      message:
        "Toute suppression est définitive, voulez-vous supprimer ce commentaire ?",
      buttons: [
        {
          label: "Supprimer",
          onClick: () => deleteMyComment(),
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

export default DeleteCommentAlert;

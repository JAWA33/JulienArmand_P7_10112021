import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useDispatch } from "react-redux";
import { deleteUser } from "../../actions/user.actions";
import { logout } from "../Utils/logout";

const ConfimAlert = (props) => {
  const dispatch = useDispatch();
  //* ########### Suppresion du Profil :
  const deleteMyAccount = () => {
    dispatch(deleteUser(props.iduser));
    logout();
  };

  const submit = () => {
    confirmAlert({
      title: "Suppression de compte",
      message:
        "Toute suppression de compte est définitive, vous perdrez tous vos posts, images, etc ...",
      buttons: [
        {
          label: "Supprimer",
          onClick: () => deleteMyAccount(),
        },
        {
          label: "Annuler",
          onClick: () => console.log("cancel"),
        },
      ],
    });
  };

  return (
    <div className="container">
      <button onClick={submit} className="btn__profil btn__profil--delete">
        Supprimer mon compte
      </button>
    </div>
  );
};

export default ConfimAlert;

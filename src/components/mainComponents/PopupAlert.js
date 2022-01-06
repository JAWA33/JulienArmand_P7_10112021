import React from "react";
import Warper from "../mainComponents/Wraper.js";
import Popup from "reactjs-popup";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../actions/user.actions";

//

const contentStyle = {
  maxWidth: "600px",
  width: "90%",
};

const PopupAlert = (props) => {
  //const dispatch = useDispatch();
  //* ########### Suppresion du Profil :
  const deleteMyAccount = () => {
    console.log("iduser");
    console.log(props.iduser);
    //sessionStorage.removeItem("id_user");
    //sessionStorage.removeItem("connectedUser");
    //dispatch(deleteUser(iduser));
    //window.location = "/";
  };

  return (
    <Popup
      trigger={
        <button className="btn__profil btn__profil--delete">
          Supprimer mon compte
        </button>
      }
      modal
      contentStyle={contentStyle}
    >
      {(close) => (
        <div className="modal">
          <a className="close" onClick={close}>
            &times;
          </a>
          <div className="header"> Alerte : Suppression de compte </div>
          <div className="content">
            {" "}
            <p>Souhaitez-vous réellement supprimer votre compte ?</p>
            <br />
            <p>
              Toute suppression de compte est définitive, vous perdrez tous vos
              posts, images, etc ...
            </p>
          </div>
          <div className="actions">
            <button
              className="btn__profil btn__profil--cancel"
              onClick={(props) => {
                console.log("props");
                console.log(props.name);
                console.log(props.iduser);
                deleteMyAccount();
                //close();
              }}
            >
              Oui, je supprime mon compte
            </button>
            <button
              className="btn__profil btn__profil--select"
              onClick={() => {
                console.log("modal closed ");
                close();
              }}
            >
              Non, je conserve mon compte
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default Warper(PopupAlert);

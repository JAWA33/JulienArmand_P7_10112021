import React, { Fragment, useContext } from "react";
import Log from "./Log.js";
import Forum from "../forum/Forum.js";
import { UidContext } from "../../routes/AppContext.js";

function Connect() {
  const uid = useContext(UidContext);

  return (
    <Fragment>
      {uid ? (
        <Forum />
      ) : (
        <section className="loginPage">
          <div className="loginPage__info">
            <h2 className="loginPage__info__title textLog--title">
              Bienvenue sur Group'com !
            </h2>
            <p className="loginPage__info__text textLog--text">
              Rejoignez votre réseau interne d’entreprise, dédié aux employés de
              Groupomania.
            </p>

            <p className="loginPage__info__text textLog--text">
              <hr />
              Discutez, échangez, communiquez !
            </p>
          </div>
          <Log />
        </section>
      )}
    </Fragment>
  );
}

export default Connect;

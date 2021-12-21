import React, { Fragment, useState, useContext, useEffect } from "react";
import { isEmpty } from "../../Utils/isEmpty";
import { myAge } from "../../Utils/myAge";
import { UidContext } from "../../routes/AppContext.js";
import { pickerAge } from "../../Utils/pickerAge";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../../../actions/job.actions";
import { deleteUser, updateUser } from "../../../actions/user.actions";
import Compressor from "compressorjs";
import {
  validName,
  validParagraph,
  validPhone,
  validId,
  addError,
  removeError,
} from "../../Utils/regExpProfil.js";
import { stringToDate } from "../../Utils/stringToDate";
import ImageCropDialog from "./ImageCropDialog.js";

const MyProfil = ({ data, modif }) => {
  console.log("MODIFIY");
  console.log(modif);
  const uid = useContext(UidContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateFirstname, setUpdateFirstname] = useState("");
  const [updateLastname, setUpdateLastname] = useState("");
  const [updatePhone, setUpdatePhone] = useState("");
  const [updateAge, setUpdateAge] = useState("");
  const [updateBio, setUpdateBio] = useState("");
  const [updateSkill, setUpdateSkill] = useState("");
  const [updateHobbie, setUpdateHobbie] = useState("");
  const [updateUserImage, setUpdateUserImage] = useState(
    data[0].user_url_image
  );
  const [updateFile, setUpdateFile] = useState();
  const [updateJobId, setUpdateJobId] = useState("");
  //* Hooks pour liste déroulante :
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const jobData = useSelector((state) => state.jobReducer);

  const UpdateProfilForm = document.getElementById("UpdateProfilForm");

  //!!
  console.log("updateUserImage");
  console.log(updateUserImage);
  console.log("updateFile");
  console.log(updateFile);

  const makeCompressor = (file, options) => {
    return new Compressor(file, options);
  };

  //!! FAIRE LA VERIFICATION DES CHAMPS ENVOYES !!!!!!!!!!!!!!!!!!

  //* ####### Attente du chargement pour remplissage de la liste déroulante
  const listingJobs = !isEmpty(jobData) ? (
    jobData.map((job) => (
      <option key={job.id_job.toString()} value={job.id_job}>
        {job.job_name}
      </option>
    ))
  ) : (
    <option value="charge">En chargement ...</option>
  );

  //* ####### Chargement de la liste déroulante :
  useEffect(() => {
    if (loading) {
      dispatch(getJobs());
      setLoading(false);
    }
  }, [jobData, loading, dispatch]);

  //* ########### Suppression des erreurs si présentes :
  useEffect(() => {
    if (UpdateProfilForm) {
      removeError(UpdateProfilForm.firstname);
      removeError(UpdateProfilForm.lastname);
      removeError(UpdateProfilForm.job);
      removeError(UpdateProfilForm.phone);
      removeError(UpdateProfilForm.bio);
      removeError(UpdateProfilForm.skill);
      removeError(UpdateProfilForm.hobbie);
    }
  }, [
    updateFirstname,
    updateLastname,
    updateJobId,
    updatePhone,
    updateSkill,
    updateBio,
    updateHobbie,
  ]);

  //* ########### Suppresion du Profil :
  const deleteMyAccount = (iduser) => {
    sessionStorage.removeItem("id_user");
    sessionStorage.removeItem("connectedUser");
    dispatch(deleteUser(iduser));
    window.location = "/";
  };
  //* ########### Update du Profil :
  const updateProfil = async (e, iduser) => {
    e.preventDefault();

    if (
      (isEmpty(updateFirstname) || validName(updateFirstname)) &&
      (isEmpty(updateLastname) || validName(updateLastname)) &&
      (isEmpty(updateJobId) || validId(updateJobId)) &&
      (isEmpty(updatePhone) || validPhone(updatePhone)) &&
      (isEmpty(updateSkill) || validParagraph(updateSkill)) &&
      (isEmpty(updateBio) || validParagraph(updateBio)) &&
      (isEmpty(updateHobbie) || validParagraph(updateHobbie))
    ) {
      if (
        !isEmpty(updateFirstname) ||
        !isEmpty(updateLastname) ||
        !isEmpty(updatePhone) ||
        !isEmpty(updateSkill) ||
        !isEmpty(updateBio) ||
        !isEmpty(updateHobbie) ||
        !isEmpty(updateAge) ||
        !isEmpty(updateJobId) ||
        !isEmpty(updateFile)
      ) {
        console.log("Informations modifiées");
        const newJob = jobData
          .map((job) => (job.id_job == updateJobId ? job.job_name : null))
          .join("");

        const newService = jobData
          .map((job) => (job.id_job == updateJobId ? job.service_name : null))
          .join("");

        const updateData = new FormData();
        updateData.append("id_user", userData[0].id_user);
        !isEmpty(updateFirstname)
          ? updateData.append("user_firstname", updateFirstname)
          : updateData.append("user_firstname", userData[0].user_firstname);
        !isEmpty(updateLastname)
          ? updateData.append("user_lastname", updateLastname)
          : updateData.append("user_lastname", userData[0].user_lastname);
        !isEmpty(updatePhone)
          ? updateData.append("user_phone", updatePhone)
          : updateData.append("user_phone", userData[0].user_phone);
        !isEmpty(updateSkill)
          ? updateData.append("user_skill", updateSkill)
          : updateData.append("user_skill", userData[0].user_skill);
        !isEmpty(updateBio)
          ? updateData.append("user_bio", updateBio)
          : updateData.append("user_bio", userData[0].user_bio);
        !isEmpty(updateHobbie)
          ? updateData.append("user_hobbie", updateHobbie)
          : updateData.append("user_hobbie", userData[0].user_hobbie);
        !isEmpty(updateAge)
          ? updateData.append("user_age", updateAge)
          : updateData.append("user_age", stringToDate(userData[0].user_age));
        !isEmpty(updateJobId)
          ? updateData.append("job_name", newJob)
          : updateData.append("job_name", userData[0].job_name);
        !isEmpty(updateJobId)
          ? updateData.append("id_job", updateJobId)
          : updateData.append("id_job", userData[0].id_job);
        !isEmpty(updateJobId)
          ? updateData.append("service_name", newService)
          : updateData.append("service_name", userData[0].service_name);

        !isEmpty(updateFile)
          ? updateData.append("user_url_image", updateUserImage)
          : updateData.append("user_url_image", userData[0].user_url_image);
        !isEmpty(updateFile) && updateData.append("file", updateFile);

        await dispatch(updateUser(iduser, updateData));
        await setIsUpdating(false);
      } else {
        setIsUpdating(false);
      }
    } else {
      if (!isEmpty(updateFirstname) && !validName(updateFirstname)) {
        addError(
          UpdateProfilForm.firstname,
          "3 lettres mini, pas de chiffre ni caractères spéciaux sauf '-'"
        );
      } else {
        removeError(UpdateProfilForm.firstname);
      }
      if (!isEmpty(updateLastname) && !validName(updateLastname)) {
        addError(
          UpdateProfilForm.lastname,
          "3 lettres mini, pas de chiffre ni caractères spéciaux sauf '-'"
        );
      } else {
        removeError(UpdateProfilForm.lastname);
      }
      if (!isEmpty(updateJobId) && !validId(updateJobId)) {
        addError(UpdateProfilForm.job, "Merci de selectionnez votre poste");
      } else {
        removeError(UpdateProfilForm.job);
      }
      if (!isEmpty(updatePhone) && !validPhone(updatePhone)) {
        addError(
          UpdateProfilForm.phone,
          "Format autorisé : 0X.XX.XX.XX.XX ou OXXXXXXXXX"
        );
      } else {
        removeError(UpdateProfilForm.phone);
      }
      if (!isEmpty(updateBio) && !validParagraph(updateBio)) {
        addError(
          UpdateProfilForm.bio,
          'Mini 3 caractères, Caractères exclus: \\ " _'
        );
      } else {
        removeError(UpdateProfilForm.bio);
      }
      if (!isEmpty(updateSkill) && !validParagraph(updateSkill)) {
        addError(
          UpdateProfilForm.skill,
          'Mini 3 caractères, Caractères exclus: \\ " _'
        );
      } else {
        removeError(UpdateProfilForm.skill);
      }
      if (!isEmpty(updateHobbie) && !validParagraph(updateHobbie)) {
        addError(
          UpdateProfilForm.hobbie,
          'Mini 3 caractères, Caractères exclus: \\ " _'
        );
      } else {
        removeError(UpdateProfilForm.hobbie);
      }
    }
  };

  //* CROPPER ###################### :
  const initData = [
    {
      id: data[0].id_user,
      imageUrl: data[0].user_url_image,
      croppedImageUrl: null,
    },
  ];

  useEffect(() => {
    const updateDataImage = [
      {
        id: data[0].id_user,
        imageUrl: updateUserImage,
        croppedImageUrl: null,
      },
    ];
    setCars(updateDataImage);
  }, [updateUserImage]);

  const [cars, setCars] = useState(initData);
  const [selectedCar, setSelectedCar] = useState(null);

  const onCancel = () => {
    setSelectedCar(null);
  };

  const setCroppedFileFor = (file) => {
    const myFile = new File([file], "newImage" + data[0].id_user + ".jpg", {
      type: file.type,
    });
    makeCompressor(myFile, {
      maxWidth: 150,
      quality: 0.8,
      success(imgBlob) {
        setUpdateUserImage(URL.createObjectURL(imgBlob));
        setUpdateFile(imgBlob);
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  const setCroppedImageFor = (id, crop, zoom, aspect, croppedImageUrl) => {
    const newCarsList = [...cars];
    const carIndex = cars.findIndex((x) => x.id === id);
    const car = cars[carIndex];
    const newCar = { ...car, croppedImageUrl, crop, zoom, aspect };
    newCarsList[carIndex] = newCar;
    setCars(newCarsList);
    setSelectedCar(null);
  };

  const resetImage = (id) => {
    setCroppedImageFor(id);
  };

  //* CROPPER ###################### :

  return (
    <div className="myProfil">
      {isUpdating ? (
        <Fragment>
          //* CROPPER ###################### :<h1>Cropper React </h1>
          {selectedCar ? (
            <ImageCropDialog
              id={selectedCar.id}
              imageUrl={selectedCar.imageUrl}
              cropInit={selectedCar.crop}
              zoomInit={selectedCar.zoom}
              aspectInit={selectedCar.aspect}
              onCancel={onCancel}
              setCroppedImageFor={setCroppedImageFor}
              setCroppedFileFor={setCroppedFileFor}
              resetImage={resetImage}
            />
          ) : null}
          {cars.map((car) => (
            <div className="imageCard" key={car.id}>
              <img
                id="cropperImg"
                src={car.croppedImageUrl ? car.croppedImageUrl : car.imageUrl}
                onClick={() => setSelectedCar(car)}
              />
            </div>
          ))}
          //* CROPPER ###################### :
          <form
            action=""
            className="updateProfil"
            id="UpdateProfilForm"
            onSubmit={(e) => updateProfil(e, data[0].id_user)}
          >
            <div className="myProfil__contact">
              <div className="myProfil__contact__name">
                <div>
                  <label htmlFor="firstname">Mon nom :</label>
                  <input
                    type="text"
                    name="firstname"
                    defaultValue={data[0].user_firstname}
                    onChange={(e) => setUpdateFirstname(e.target.value)}
                  ></input>
                  <p className="errorText"></p>
                </div>
                <div>
                  <label htmlFor="lastname">Mon prénom :</label>
                  <input
                    type="text"
                    name="lastname"
                    defaultValue={data[0].user_lastname}
                    onChange={(e) => setUpdateLastname(e.target.value)}
                  ></input>
                  <p className="errorText"></p>
                </div>
              </div>
              <div className="myProfil__contact__info"></div>
              {jobData ? (
                <Fragment>
                  <label htmlFor="job">Changer de poste :</label>
                  <select
                    name="job"
                    type="select"
                    defaultValue={data[0].id_job}
                    onChange={(e) => setUpdateJobId(e.target.value)}
                  >
                    <option value="none">Sélectionner votre poste</option>
                    {listingJobs}
                  </select>
                  <p className="errorText"></p>
                </Fragment>
              ) : (
                <Fragment>
                  <h3>En attente des différents postes ...</h3>
                </Fragment>
              )}
              <br />
              <h3>{data[0].user_email}</h3>
              <div>
                <label htmlFor="phone">Mon téléphone :</label>
                <input
                  type="text"
                  name="phone"
                  defaultValue={data[0].user_phone}
                  onChange={(e) => setUpdatePhone(e.target.value)}
                ></input>
                <p className="errorText"></p>
              </div>
            </div>
            <div className="myProfil__myInfo">
              <div className="myProfil__myInfo__age">
                <div>
                  <label htmlFor="date">Ma date de naissance :</label>
                  <input
                    type="date"
                    name="date"
                    value={updateAge ? updateAge : pickerAge(data[0].user_age)}
                    onChange={(e) => setUpdateAge(e.target.value)}
                  ></input>
                  <p className="errorText"></p>
                </div>
              </div>
              <div className="myProfil__myInfo__bio">
                <label htmlFor="bio">Ce qu'il faut savoir sur moi :</label>
                <textarea
                  name="bio"
                  defaultValue={data[0].user_bio}
                  onChange={(e) => setUpdateBio(e.target.value)}
                ></textarea>
                <p className="errorText"></p>
              </div>
              <div className="myProfil__myInfo__bio">
                <label htmlFor="skill">Mes compétences :</label>
                <textarea
                  name="skill"
                  defaultValue={data[0].user_skill}
                  onChange={(e) => setUpdateSkill(e.target.value)}
                ></textarea>
                <p className="errorText"></p>
                <div className="myProfil__myInfo__bio">
                  <label htmlFor="hobbie">Mes hobbies :</label>
                  <textarea
                    name="hobbie"
                    defaultValue={data[0].user_hobbie}
                    onChange={(e) => setUpdateHobbie(e.target.value)}
                  ></textarea>
                  <p className="errorText"></p>
                </div>
              </div>
            </div>
            <div id="textErrors"></div>
            {modif === true &&
            (data[0].user_status === "Moderateur" ||
              data[0].id_user === uid) ? (
              <div className="myProfil__modif">
                <input type="submit" />
                <br />
                <button onClick={() => setIsUpdating(false)}>
                  Annuler la modification
                </button>
              </div>
            ) : (
              ""
            )}
          </form>
        </Fragment>
      ) : (
        <Fragment>
          <div className="myProfil__contact">
            <div className="myProfil__contact__picture">
              <img
                src={data[0].user_url_image}
                alt={"utilisateur" + data[0].user_firstname}
              />
            </div>
            <div className="myProfil__contact__name">
              <h2>
                {isEmpty(data[0].user_lastname)
                  ? data[0].user_firstname
                  : data[0].user_firstname + " " + data[0].user_lastname}
              </h2>
            </div>
            <div className="myProfil__contact__info">
              <h3>{data[0].service_name}</h3>
              <h3>{data[0].job_name}</h3>
              <br />
              <h3>{data[0].user_email}</h3>
              <h3>
                Tel:{" "}
                {isEmpty(data[0].user_phone)
                  ? "Non renseigné"
                  : data[0].user_phone}
              </h3>
            </div>
          </div>
          <hr />
          <div className="myProfil__myInfo">
            <div className="myProfil__myInfo__age">
              <h2>Age :</h2>
              <p>
                {isEmpty(data[0].user_age)
                  ? " Non renseigné"
                  : myAge(data[0].user_age)}
              </p>
            </div>
            <div className="myProfil__myInfo__bio">
              <h2>Ce qu'il faut savoir sur moi :</h2>
              <p>
                {isEmpty(data[0].user_bio) ? "Non renseigné" : data[0].user_bio}
              </p>
            </div>
            <div className="myProfil__myInfo__bio">
              <h2>Mes compétences :</h2>
              <p>
                {isEmpty(data[0].user_skill)
                  ? "Non renseigné"
                  : data[0].user_skill}
              </p>
              <div className="myProfil__myInfo__bio">
                <h2>Mes hobbies :</h2>
                <p>
                  {isEmpty(data[0].user_hobbie)
                    ? "Non renseigné"
                    : data[0].user_hobbie}
                </p>
              </div>
            </div>
          </div>

          {modif === true &&
          (data[0].user_status === "Moderateur" || data[0].id_user === uid) ? (
            <div className="myProfil__modif">
              <button onClick={() => setIsUpdating(true)}>
                Modifier mon profil
              </button>
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Voulez-vous vraiment supprimer votre compte ?"
                    )
                  ) {
                    deleteMyAccount(data[0].id_user);
                  }
                }}
              >
                Supprimer mon compte
              </button>
            </div>
          ) : (
            ""
          )}
        </Fragment>
      )}
    </div>
  );
};

export default MyProfil;

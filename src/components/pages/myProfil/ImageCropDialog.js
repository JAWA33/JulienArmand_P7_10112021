import React, { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage.js";

const aspectRatios = [
  { value: 1 / 1, text: "1/1" },
  { value: 4 / 3, text: "4/3" },
  { value: 16 / 9, text: "16/9" },
];

const ImageCropDialog = ({
  id,
  imageUrl,
  cropInit,
  zoomInit,
  aspectInit,
  onCancel,
  setCroppedImageFor,
  setCroppedFileFor,
  resetImage,
}) => {
  console.log("imageCropDialog");

  if (zoomInit == null) {
    zoomInit = 1;
  }
  if (cropInit == null) {
    cropInit = { x: 0, y: 0 };
  }
  if (aspectInit == null) {
    aspectInit = aspectRatios[0];
  }

  const [zoom, setZoom] = useState(zoomInit);
  const [crop, setCrop] = useState(cropInit);
  const [aspect, setAspect] = useState(aspectInit);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [newFile, setNewFile] = useState();
  const [newImage, setNewImage] = useState();

  console.log("newFile");
  console.log(newFile);
  console.log("newImage");
  console.log(newImage);

  const changeNewFile = (e) => {
    setNewFile(e.target.files[0]);
    setNewImage(URL.createObjectURL(e.target.files[0]));
    //imageUrl = newImage;
  };

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };
  const onAspectChange = (e) => {
    const value = e.target.value;
    const ratio = aspectRatios.find((ratio) => ratio.value == value);
    setAspect(ratio);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
    //window.localStorage.setItem("croppedArea", JSON.stringify(croppedArea));
  };

  let croppedImageUrl;
  const getUrl = (blob_file) => {
    croppedImageUrl = URL.createObjectURL(blob_file);
  };

  const onCrop = async () => {
    const imageToCrop = newImage ? newImage : imageUrl;
    const croppedImageFile = await getCroppedImg(
      imageToCrop,
      croppedAreaPixels
    );
    console.log("myNewBLOB");
    console.log(croppedImageFile);

    await getUrl(croppedImageFile);
    await setCroppedFileFor(croppedImageFile);
    await setCroppedImageFor(id, crop, zoom, aspect, croppedImageUrl);
  };

  const onResetImage = () => {
    resetImage(id);
  };

  return (
    <div>
      <div className="backdrop"></div>
      <div className="crop-container">
        <Cropper
          image={newImage ? newImage : imageUrl}
          zoom={zoom}
          crop={crop}
          aspect={aspect.value}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropComplete}
        />
      </div>

      <div className="controls">
        <div className="controls-upper-area">
          <div className="maskInput">
            <label htmlFor="file">Choisissez une image</label>
            <input
              type="button"
              className="btn__profil btn__profil--select btn__profil--crop"
              value="Choisir"
              onClick={() => document.getElementById("myFile").click()}
            />
            <input
              type="file"
              id="myFile"
              name="file"
              accept=".jpg, .jpeg, .png"
              onInput={(e) => changeNewFile(e)}
            />
          </div>

          <div className="slider">
            <label htmlFor="zoom">Ajuster le zoom et positionner l'image</label>
            <input
              type="range"
              name="zoom"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onInput={(e) => {
                onZoomChange(e.target.value);
              }}
            />
          </div>

          {/* <select onChange={(e) => onAspectChange(e)}>
            {aspectRatios.map((ratio) => (
              <option
                key={ratio.text}
                value={ratio.value}
                selected={ratio.value === aspect.value}
              >
                {ratio.text}
              </option>
            ))}
          </select> */}
          <div className="button-area">
            <button
              className="btn__profil btn__profil--modify btn__profil--crop"
              onClick={onCrop}
            >
              Valider
            </button>
            <button
              className="btn__profil btn__profil--delete btn__profil--crop"
              onClick={onCancel}
            >
              Annuler
            </button>
            {/* <button onClick={onResetImage}>Reset</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropDialog;

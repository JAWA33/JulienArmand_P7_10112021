import React, { Fragment, useContext, useState } from "react";
import { UidContext } from "../../routes/AppContext.js";
import ImageCropDialog from "./ImageCropDialog.js";

const initData = [
  {
    id: 1,
    imageUrl: "images/car1.jpg",
    croppedImageUrl: null,
  },
  {
    id: 2,
    imageUrl: "images/car2.jpg",
    croppedImageUrl: null,
  },
  {
    id: 3,
    imageUrl: "images/car3.jpg",
    croppedImageUrl: null,
  },
];

function AllUsers() {
  const uid = useContext(UidContext);

  const [cars, setCars] = useState(initData);
  const [selectedCar, setSelectedCar] = useState(null);

  const onCancel = () => {
    setSelectedCar(null);
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
  return (
    <div>
      {uid ? (
        <Fragment>
          <h1>Cropper React </h1>
          {selectedCar ? (
            <ImageCropDialog
              id={selectedCar.id}
              imageUrl={selectedCar.imageUrl}
              cropInit={selectedCar.crop}
              zoomInit={selectedCar.zoom}
              aspectInit={selectedCar.aspect}
              onCancel={onCancel}
              setCroppedImageFor={setCroppedImageFor}
              resetImage={resetImage}
            />
          ) : null}
          {cars.map((car) => (
            <div className="imageCard" key={car.id}>
              <img
                src={car.croppedImageUrl ? car.croppedImageUrl : car.imageUrl}
                onClick={() => setSelectedCar(car)}
              />
            </div>
          ))}
        </Fragment>
      ) : (
        <div>
          <h1>Tous les utilisateurs: Pas de UID</h1>
        </div>
      )}
    </div>
  );
}

export default AllUsers;

import React, { useState } from "react";

const Footer = () => {
  const [colorChange, setColorChange] = useState("0");

  console.log(colorChange);
  // document.write(
  //   <style type="text/css"> {$rotationValue : '+colorChange+'}  </style>
  // );

  return (
    <footer>
      <label htmlFor="colorStyle">Changer la couleur du site</label>
      <input
        type="range"
        name="colorStyle"
        min="0"
        max="360"
        defaultValue="0"
        step="10"
        onChange={(e) => setColorChange(e.target.value)}
      />
    </footer>
  );
};

export default Footer;

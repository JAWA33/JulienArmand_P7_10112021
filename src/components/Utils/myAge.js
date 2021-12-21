export const myAge = (date) => {
  //for git
  let startingDate = new Date(date);
  let today = Date.now();

  let diffTime = Math.abs(startingDate - today);

  let inYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));

  if (inYears >= 1) {
    return inYears + " an" + (inYears <= 1 ? "" : "s");
  } else {
    return "Erreur";
  }
};

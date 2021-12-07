export const nowToDate = (date) => {
  let startingDate = new Date(date);
  let today = Date.now();

  let diffTime = Math.abs(startingDate - today);

  let inYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
  let inMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
  let inDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  let inHours = Math.floor(diffTime / (1000 * 60 * 60));
  let inMinutes = Math.floor(diffTime / (1000 * 60));
  let inSecondes = Math.floor(diffTime / 1000);

  if (inSecondes < 60) {
    return "il y a " + inSecondes + " seconde" + (inSecondes <= 1 ? "" : "s");
  } else if (inMinutes <= 60) {
    return "il y a " + inMinutes + " minute" + (inMinutes <= 1 ? "" : "s");
  } else if (inHours >= 1 && inHours < 24) {
    return "il y a " + inHours + " heure" + (inHours <= 1 ? "" : "s");
  } else if (inDays >= 1 && inDays < 30) {
    return "il y a " + inDays + " jour" + (inDays < 1 ? "" : "s");
  } else if (inMonths >= 1 && inMonths < 12) {
    return "il y a " + inMonths + " mois";
  } else if (inYears >= 1) {
    return "il y a " + inYears + " année" + (inYears < 1 ? "" : "s");
  } else {
    return "Erreur";
  }
};

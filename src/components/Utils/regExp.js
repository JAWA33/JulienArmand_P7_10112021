//* DEFINITION DES REGEXP #####################################################
//! Vérifer si la Regexp existe ou si elle correspond à ce que vous souhaitez valider, ou ajouter une nouvelle :

//? Regex de type password : ############################# //
const validPassword = (input) => {
  let regexPassword = new RegExp(
    "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.-_*])([a-zA-Z0-9@#$%^&+=*.-_]){6,16}$"
  ).test(input.value);
  return returnResponse(input, regexPassword);
};

//? Regex de type Email : ############################# //
//! EMAIL  SPECIFIQUE AU PROJET 7 : xxxxx@groupomania.xx(x)
const validEmail = (input) => {
  let regexEmail = new RegExp(
    "^[A-Za-z--]+@groupomania+[.]{1}[a-z]{2,3}$"
  ).test(input.value);
  return returnResponse(input, regexEmail);
};

//? Regex de type "nom" : 3 lettres mini, pas de chiffre ni caractères spéciaux sauf "-" ############## //
const validName = (input) => {
  console.log("TEST NAME");
  let regexName = new RegExp("^[A-Za-z-éèàïî]{3,}$").test(input.value);
  return returnResponse(input, regexName);
};

//? Regex de type numérique : uniquement des nombres positifs ############################# //
const validId = (input) => {
  let regexId = new RegExp("^[0-9]{1,}$").test(input.value);
  return returnResponse(input, regexId);
};

//? Regex de type paragraphe : ############################# //
// Mini 3 caractères,autorise: lettres, chiffres et certains caractères spéciaux, exclusion : / et ' et _
const validParagraph = (input) => {
  let regexParagraph = new RegExp(
    "^[A-Za-zéèà0-9-@#$%^€,;!?' )(&+=.-:\\n\\t]{3,}$"
  ).test(input.value);
  return returnResponse(input, regexParagraph);
};

//? Regex de type téléphone (France) : ############################# //
// Format : 0X.XX.XX.XX.XX ou OXXXXXXXXX :
const validPhone = (input) => {
  let regexPhone = new RegExp(
    "^[0][1-9][.][0-9]{2}[.]{0,1}[0-9]{2}[.]{0,1}[0-9]{2}[.]{0,1}[0-9]{2}$"
  ).test(input.value);
  return returnResponse(input, regexPhone);
};

//? Regex de type date (date) : YYYY-MM-DD ############################# //
const validDate = (input) => {
  let regexDate = new RegExp(
    "^([0-9]{4})[-]([0][1-9]|[1][0-2])[-]([0-1-2][0-9]|[3][0|1])$"
  ).test(input.value);
  return returnResponse(input, regexDate);
};

const returnResponse = (input, test) => {
  let errorText = input.nextElementSibling;

  if (test) {
    errorText.innerHTML = "";
    errorText.classList.remove("messageError");
    input.classList.remove("inputError");
    input.classList.add("inputSuccess");
    return true;
  } else {
    errorText.innerHTML = "Vérifiez votre saisie";
    errorText.classList.add("messageError");
    input.classList.remove("inputSuccess");
    input.classList.add("inputError");
    return false;
  }
};

module.exports = {
  validEmail,
  validPassword,
  validId,
  validName,
  validParagraph,
  validPhone,
  validDate,
};

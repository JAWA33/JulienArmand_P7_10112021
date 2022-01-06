//* DEFINITION DES REGEXP #####################################################
//! Vérifer si la Regexp existe ou si elle correspond à ce que vous souhaitez valider, ou ajouter une nouvelle :

//? Regex de type "nom" : 3 lettres mini, pas de chiffre ni caractères spéciaux sauf "-" ############## //
const validName = (input) => {
  console.log("TEST NAME");
  let regexName = new RegExp("^[A-Za-z-éèàïî]{3,}$").test(input);

  if (regexName) {
    return true;
  } else {
    return false;
  }
};

//? Regex de type numérique : uniquement des nombres positifs ############################# //
const validId = (input) => {
  let regexId = new RegExp("^[0-9]{1,}$").test(input);

  if (regexId) {
    return true;
  } else {
    return false;
  }
};

//? Regex de type paragraphe : ############################# //
// Mini 3 caractères,autorise: lettres, chiffres et certains caractères spéciaux, exclusion : / et '"' et _
const validParagraph = (input) => {
  let regexParagraph = new RegExp(
    "^[A-Za-zéèà0-9-@#$%^€,;!?' )(&+=.-:\\n\\t]{3,}$"
  ).test(input);

  if (regexParagraph) {
    return true;
  } else {
    return false;
  }
};

//? Regex de type téléphone (France) : ############################# //
// Format : 0X.XX.XX.XX.XX ou OXXXXXXXXX :
const validPhone = (input) => {
  let regexPhone = new RegExp(
    "^[0][1-9][.][0-9]{2}[.]{0,1}[0-9]{2}[.]{0,1}[0-9]{2}[.]{0,1}[0-9]{2}$"
  ).test(input);

  if (regexPhone) {
    return true;
  } else {
    return false;
  }
};

const addError = (form, text) => {
  form.classList.add("inputError");
  form.nextElementSibling.innerHTML = text;
  form.nextElementSibling.classList.add("error_text");
};

const removeError = (form) => {
  form.classList.remove("inputError");
  form.nextElementSibling.innerHTML = "";
  form.nextElementSibling.classList.remove("error_text");
};

module.exports = {
  validId,
  validName,
  validParagraph,
  validPhone,
  addError,
  removeError,
};

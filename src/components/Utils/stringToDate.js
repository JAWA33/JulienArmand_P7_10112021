export const stringToDate = (date) => {
  let myDate;
  if (date === null) {
    return null;
  } else if (isNaN(date) === true) {
    myDate = date.split("T")[0];
    return myDate;
  } else if (isNaN(date) === false) {
    myDate = date;
    return myDate;
  }
};
//for git

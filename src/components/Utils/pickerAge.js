export const pickerAge = (date) => {
  //for git
  if (date === null) {
    return null;
  } else {
    let birthdayDate = new Date(date).toISOString().split("T")[0];

    return birthdayDate;
  }
};

export const pickerAge = (date) => {
  if (date === null) {
    return null;
  } else {
    let birthdayDate = new Date(date).toISOString().split("T")[0];

    return birthdayDate;
  }
};

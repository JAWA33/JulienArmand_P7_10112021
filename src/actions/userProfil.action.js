export const GET_USER_PROFIL = "GET_USER_PORFILE";

export const getUserProfile = (data) => {
  return (dispatch) => {
    return (
      console.log(data), dispatch({ type: GET_USER_PROFIL, payload: data })
    );
  };
};

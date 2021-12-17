import axios from "axios";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

export const GET_USER = "GET_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";

export const getUser = (uid) => {
  return async (dispatch) => {
    return await axios
      .get(process.env.REACT_APP_API_URL + "api/user/" + uid)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const updateUser = (iduser, data) => {
  return async (dispatch) => {
    return await axios({
      method: "put",
      url: process.env.REACT_APP_API_URL + "api/user/update/" + iduser,
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        console.log("Modifié");
        dispatch({ type: UPDATE_USER, payload: data });
      })
      .catch((err) => console.log(err));
  };
  //dispatch({ type: UPDATE_USER, payload: data });
};

export const deleteUser = (iduser) => {
  return async (dispatch) => {
    return await axios({
      method: "delete",
      url: process.env.REACT_APP_API_URL + "api/user/delete/" + iduser,
      withCredentials: true,
    })
      .then((res) => {
        const deleteData = {
          id_user: iduser,
        };
        dispatch({ type: DELETE_USER, payload: deleteData });
      })
      .catch((err) => console.log(err));
  };
};

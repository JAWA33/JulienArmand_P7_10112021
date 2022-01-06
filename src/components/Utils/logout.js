import axios from "axios";

export const logout = () => {
  axios({
    method: "delete",
    url: process.env.REACT_APP_API_URL + "api/user/logout",
    withCredentials: true,
  })
    .then((res) => {
      console.log(res);
      console.log(res.data);
      sessionStorage.removeItem("id_user");
      sessionStorage.removeItem("connectedUser");
      window.location = "/";
    })
    .catch((err) => {
      console.log(err);
    });
};

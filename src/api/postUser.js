import axios from "axios";

function postUser(formData, token) {
  return axios
    .post(
      "https://frontend-test-assignment-api.abz.agency/api/v1/users",
      formData,
      {
        headers: {
          Token: token,
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((res) => res)
    .catch((error) => console.log(error));
}

export default postUser;

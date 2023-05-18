import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const fetchData = (endpoint) => {
  return axios
    .get(`${API_URL}/${endpoint}`)
    .then((res) => {
      return res;
    })
    .catch((error) => console.log(error));
};
export default fetchData;

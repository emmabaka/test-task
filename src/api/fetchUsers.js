import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

function fetchUsers(link = `${API_URL}/users?page=1&count=6`) {
  return axios
    .get(link)
    .then((res) => {
      return res;
    })
    .catch((error) => console.log(error));
}
export default fetchUsers;

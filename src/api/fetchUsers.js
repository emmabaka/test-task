import axios from "axios";

function fetchUsers(
  link = "https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6"
) {
  return axios.get(link).then((res) => {
    // console.log(res);
    return res;
  });
}
export default fetchUsers;

import axios from "axios";

function fetchToken() {
  return axios
    .get("https://frontend-test-assignment-api.abz.agency/api/v1/token")
    .then((res) => {
      return res;
    });
}
export default fetchToken;

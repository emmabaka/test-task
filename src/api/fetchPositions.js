import axios from "axios";

function fetchPositions(
  link = "https://frontend-test-assignment-api.abz.agency/api/v1/positions"
) {
  return axios.get(link).then((res) => {
    return res;
  });
}
export default fetchPositions;

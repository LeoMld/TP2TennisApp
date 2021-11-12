import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/parties";

class MatchService {
  getMatchs() {
    console.log(API_URL)
    return axios.get(API_URL);
  }

  getMatch(id) {
    return axios.get(API_URL + "/" + id);
  }
}

export default new MatchService();

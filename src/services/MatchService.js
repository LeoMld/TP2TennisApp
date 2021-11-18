import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

class MatchService {
  getMatchs() {
    console.log(API_URL+"/parties")
    return axios.get(API_URL + "/parties");
  }

  getMatch(id) {
    return axios.get(API_URL + "/parties/" + id);
  }

  bet(id, payload) {
    return axios.post(`${API_URL}/parties/${id}/parier`, payload);
  }
}

export default new MatchService();

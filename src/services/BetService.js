import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/utilisateurs";

class BetService {
    getBets(id) {
        return axios.get(API_URL+"/"+id+"/paris");
    }
}

export default new BetService();

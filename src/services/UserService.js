import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8081/api/v1/users";

class UserService {

    getUser(){
        return axios.get(USER_API_BASE_URL);
    }

    addUser(user){
        return axios.post(USER_API_BASE_URL,user);
    }

}

export default new UserService();
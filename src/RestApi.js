import axios from "axios";

const url = 'http://localhost:4600/user/';

class RestApi {
    async getUser(username) {
        await axios.get(url + username);
    }

    async getAllUsers() {
        return await axios.get(url);
    }

    async saveUser(userObject) {
        await axios.post(url, userObject);
    }
}
export default new RestApi();
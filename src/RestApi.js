import axios from "axios";

const url = 'http://localhost:5000/user/';

class RestApi {
    async üyeGetir(username) {
        await axios.get(url + username);
    }

    async üyeleriGetir() {
        return await axios.get(url);
    }

    async üyeKaydet(üyeObjesi) {
        await axios.post(url, üyeObjesi);
    }
}
export default new RestApi();
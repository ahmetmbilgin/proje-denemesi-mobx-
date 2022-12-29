import axios from "axios";

const url = 'http://localhost:5000/user/';

class RestApi {

    url = 'http://localhost:5000/user';

    async üyeGetir(username) {
        await axios.get(url + username)
    }

    async üyeleriGetir() {
        return await axios.get(url)
    }

    async üyeKaydet(üyeObjesi) {
        await axios.post(url, üyeObjesi)
    }
}
export default new RestApi();
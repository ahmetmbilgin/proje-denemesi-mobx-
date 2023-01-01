import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import 'react-responsive-modal/styles.css';
import { Link } from "react-router-dom";
import GlobalStates from "../../GlobalStates";
import RestApi from "../../RestApi";

const LoginForm = () => {

    const [userList, setUserList] = useState([])
    const [user, setUser] = useState({ username: '', password: '' })
    const [userError, setUserError] = useState({ username: true, password: true })
    const [userConfirm, setUserConfirm] = useState(true)

    useEffect(() => {
        RestApi.üyeleriGetir()
            .then(cevap => {
                setUserList(cevap.data)
            })
            .catch(error => alert(error))
    }, [])

    const filtering = (username, password) => userList.filter(user => user.username === username && user.password === password).length > 0
    const userSearch = (username, password) => {
        if (filtering(username, password)) {
            setUserConfirm(false);
            GlobalStates.setUsername(username);
            localStorage.setItem("username", username);
            return true;
        } else {
            return false
        }
    }

    const login = () => {
        setUserError(user);
        if (user.username && user.password) {
            userSearch(user.username, user.password) ? setUserConfirm(true) : setUserConfirm(false);
        }
    }

    return (<>
        <form action="">
            <div style={{ padding: 40, gap: 10, width: 250, display: "flex", flexDirection: "column", alignItems: "center" }} >
                <div style={{ width: 250, display: "flex", flexDirection: "column" }}>
                    <input onChange={(e) => setUser(prevState => ({ ...prevState, username: e.target.value }))} type="text" placeholder="username" value={user.username} />
                    {!userError.username && <div>Lütfen bu alanı doldurunuz</div>}
                </div>
                <div style={{ width: 250, display: "flex", flexDirection: "column" }}>
                    <input onChange={(e) => setUser(prevState => ({ ...prevState, password: e.target.value }))} type="password" placeholder="password" value={user.password} />
                    {!userError.password && <div>Lütfen bu alanı doldurunuz</div>}
                </div>
                <Link onClick={(e) => login()} style={{ textDecoration: "none", marginTop: 5, border: "1px solid", borderRadius: 5, padding: "0px 20px 0px 20px" }} to={filtering(user.username, user.password) && `/user/${user.username}`}>Giriş</Link>
                {!userConfirm && <div style={{ color: 'red', fontSize: 12 }}>Kullanıcı veya şifre hatalıdır</div>}
            </div>
        </form>
    </>)
}

export default LoginForm;
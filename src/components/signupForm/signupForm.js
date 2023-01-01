import { useEffect, useState } from "react";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import Spinner from "../spinner/Spinner";
import RestApi from "../../RestApi";

const SignupForm = () => {

    const [newUser, setNewUser] = useState({ username: '', password: '', name: '', surname: '', email: '' });
    const [verifyPassword, setVeriyfyPassword] = useState('');
    const [signInError, setSignInError] = useState({ username: true, password: true, name: true, surname: true, email: true });
    const [usernameExis, setUsernameExis] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [userList, setUserList] = useState([]);

    useEffect(() => {

        RestApi.üyeleriGetir()
            .then(üyeler => {
                setUserList(üyeler.data);
            })
            .catch(error => alert(error));
    }, [])

    const usernameControl = (username) => {
        const üyeIsimleri = userList.map(üyeObjesi => üyeObjesi.username);
        if (üyeIsimleri.some(isim => isim === username)) {
            return false;
        } else {
            return true;
        }
    }

    const kayitOl = (e) => {
        setSignInError(newUser);
        if (verifyPassword === newUser.password) {
            if (Object.values(newUser).every(value => value)) {
                if (usernameControl(newUser.username)) {
                    setUsernameExis(true);
                    setLoading(true);
                    RestApi.üyeKaydet(newUser)
                        .then(() => {
                            setNewUser({ username: '', password: '', name: '', surname: '', email: '' });
                            setSignInError({ username: true, password: true, name: true, surname: true, email: true });
                            setVeriyfyPassword('');
                        })
                        .catch(error => alert(error))
                        .finally(() => {
                            setLoading(false);
                            setLoading2(true);
                            setTimeout(()=>setLoading2(false),1000);
                        });
                } else {
                    setUsernameExis(false);
                }
            }
        } else alert('Şifrenizi kontrol ediniz');
    }
    return (
        <>
            <form action="">
                <div style={{ padding: 40, gap: 10, width: 250, display: "flex", flexDirection: "column" }} >
                    <div style={{ width: 250, display: "flex", flexDirection: "column" }}>
                        <input onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))} value={newUser.name} placeholder="Name" type="text" />
                        {signInError.name ? null : <div>Lütfen bu alanı doldurunuz</div>}
                    </div>
                    <div style={{ width: 250, display: "flex", flexDirection: "column" }}>
                        <input onChange={(e) => setNewUser(prev => ({ ...prev, surname: e.target.value }))} value={newUser.surname} placeholder="Surname" type="text" />
                        {signInError.surname ? null : <div>Lütfen bu alanı doldurunuz</div>}
                    </div>
                    <div style={{ width: 250, display: "flex", flexDirection: "column" }}>
                        <input onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))} value={newUser.email} placeholder="Email" type="text" />
                        {signInError.email ? null : <div>Lütfen bu alanı doldurunuz</div>}
                    </div>
                    <div style={{ width: 250, display: "flex", flexDirection: "column" }}>
                        <input onChange={(e) => setNewUser(prev => ({ ...prev, username: e.target.value }))} value={newUser.username} placeholder="username" type="text" />
                        {usernameExis ? null : <div>Bu kullanıcı ismi mevcut</div>}
                        {signInError.username ? null : <div>Lütfen bu alanı doldurunuz</div>}
                    </div>
                    <div style={{ width: 250, display: "flex", flexDirection: "column" }}>
                        <input onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))} value={newUser.password} placeholder="password" type="password" />
                        {signInError.password ? null : <div>Lütfen bu alanı doldurunuz</div>}
                    </div>
                    <div style={{ gap: 10, width: 250, display: "flex", flexDirection: "column" }}>
                        <input onChange={(e) => setVeriyfyPassword(e.target.value)} value={verifyPassword} placeholder="verify password" type="password" />
                        <button onClick={(e) => {
                            e.preventDefault();
                            kayitOl();
                        }}>Kayıt Ol</button>
                    </div>
                </div>
            </form>
            <Modal closeOnEsc={false} closeOnOverlayClick={false} showCloseIcon={false} open={loading} center>
                <h2>Kaydınız yapılıyor, bekleyiniz</h2>
                <Spinner />
            </Modal>
            <Modal closeOnEsc={false} closeOnOverlayClick={false} showCloseIcon={false} open={loading2} center>
                <h2>Başarılı Kayıt</h2>
            </Modal>
        </>
    )
}

export default SignupForm;
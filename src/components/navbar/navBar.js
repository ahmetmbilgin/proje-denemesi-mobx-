import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import GlobalStates from "../../GlobalStates";
import './style.css';


const Navbar = () => {

    useEffect(() => {
        GlobalStates.setUsername(localStorage.getItem("username"));
    }, [])

    return (<>
        <div className="navbar">
            <div className="hermes">
                Acıktım
            </div>
            <div className="links">
                {GlobalStates.username ?
                    <>
                        <ul className="login-signin">
                            <li>
                                <Link to={`/user/${localStorage.getItem("username")}`}>Account</Link>
                            </li>
                            <li>
                                <Link onClick={(e) => {
                                    GlobalStates.setUsername('');
                                    localStorage.clear();
                                }} to="/">Logout</Link>
                            </li>
                        </ul>
                        <span>{GlobalStates.username}</span>
                    </>
                    :
                    <ul className="login-signin">
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/signin">Signin</Link>
                        </li>
                    </ul>}
                <ul className="pages">
                    <li className="home">
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/foods">Foods</Link>
                    </li>
                    <li>
                        <Link to="/coffees">Coffees</Link>
                    </li>
                    <li>
                        <Link to="/snacks">Snacks</Link>
                    </li>
                    <Link to="/" />
                    <Link to="*" />
                </ul>
            </div>
        </div>
        {/* <Outlet /> */}
    </>
    )
}

export default observer(Navbar);
import { Button, Icon, Intent, Popover, PopoverInteractionKind, Position } from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import 'react-responsive-modal/styles.css';
import { Link } from "react-router-dom";
import GlobalStates from "../../GlobalStates";
import RestApi from "../../RestApi";
import './style.css';

const NavBar = () => {

    const [userList, setUserList] = useState([]);
    const [user, setUser] = useState({ username: '', password: '' });
    const [userError, setUserError] = useState({ username: true, password: true });
    const [userConfirm, setUserConfirm] = useState(true);

    useEffect(() => {
        RestApi.getAllUsers()
            .then(response => {
                setUserList(response.data);
            })
            .catch(error => alert(error));
        GlobalStates.setUsername(localStorage.getItem("username"));
    }, [])

    const filtering = (username, password) => userList.filter(user => user.username === username && user.password === password).length > 0;
    const userSearch = (username, password) => {
        if (filtering(username, password)) {
            setUser({ username: '', password: '' });
            setUserConfirm(false);
            GlobalStates.setUsername(username);
            localStorage.setItem("username", username);
            return true;
        } else {
            return false;
        }
    }

    const login = () => {
        setUserError(user);
        if (user.username && user.password) {
            userSearch(user.username, user.password) ? setUserConfirm(true) : setUserConfirm(false);
        }
    }

    return (
        <nav className="bp4-navbar bp4-dark">
            <div>
                <div className="bp4-navbar-group bp4-align-left">
                    <Icon icon="shop" size={36} color="#cd8808" />
                    <div className="bp4-navbar-heading">Acıktım</div>
                </div>
                <div className="bp4-navbar-group bp4-align-right">
                    <Link to="/">
                        <button className="bp4-button bp4-minimal bp4-icon-home">Home</button>
                    </Link>
                    <Link to="/foods">
                        <button className="bp4-button bp4-minimal">Foods</button>
                    </Link>
                    <Link to="/coffees">
                        <button className="bp4-button bp4-minimal">Coffees</button>
                    </Link>
                    <Link to="/snacks">
                        <button className="bp4-button bp4-minimal">Snacks</button>
                    </Link>
                    <span className="bp4-navbar-divider"></span>
                    {GlobalStates.username ?
                        <div>
                            <Link to={`/user/${localStorage.getItem("username")}`}>
                                <Button intent="success" rightIcon="user" className="bp4-icon-" title="My Account"> {localStorage.getItem("username")}</Button>
                            </Link>
                            <Link to="/">
                                <Button title="Logout" icon="log-out" intent="danger" className="bp4-popover-dismiss"
                                    onClick={(e) => {
                                        GlobalStates.setUsername('');
                                        localStorage.clear();
                                    }}>Logout</Button>
                            </Link>
                        </div>
                        : <div>
                            <Popover
                                interactionKind={PopoverInteractionKind.CLICK}
                                popoverClassName="bp4-popover-content-sizing"
                                position={Position.BOTTOM}
                            >
                                <Button title="Login" rightIcon="user" className="bp4-icon-" intent={Intent.PRIMARY}>Login</Button>
                                <div>
                                    <Button onClick={() => {
                                        setUser({ username: '', password: '' });
                                        setUserConfirm(true);
                                        setUserError({ username: true, password: true });
                                    }} className="bp4-popover-dismiss popover-x-button">X</Button>
                                    <div className="bp4-input-group">
                                        <input value={user.username}
                                            onChange={(e) => setUser(prevState => ({ ...prevState, username: e.target.value }))}
                                            type="text" className="bp4-input" placeholder="username..." />
                                        {!userError.username && <div>Lütfen bu alanı doldurunuz</div>}
                                        <Icon icon="at" size={14} />
                                    </div>
                                    <div className="bp4-input-group">
                                        <input value={user.password}
                                            onChange={(e) => setUser(prevState => ({ ...prevState, password: e.target.value }))}
                                            type="password" className="bp4-input" placeholder="password..." />
                                        {!userError.password && <div>Lütfen bu alanı doldurunuz</div>}
                                        <Icon icon="lock" size={14} />
                                    </div>
                                    <div className="bp4-input-group">
                                        <Link onClick={login} to={filtering(user.username, user.password) && '/'}>
                                            <Button intent="success" className={filtering(user.username, user.password) && "bp4-popover-dismiss"}>Enter</Button>
                                        </Link>
                                        {!userConfirm && <div>Kullanıcı veya şifre hatalıdır !</div>}
                                    </div>
                                    <Link to="/" />
                                    <Link to="*" />
                                </div>
                            </Popover>
                            <Link to="/signup">
                                <Button title="Signup" icon="add" className="bp4-icon-" intent={Intent.WARNING}>Signup</Button>
                            </Link>
                        </div>
                    }
                </div>
            </div >
        </nav >
    )
}
export default observer(NavBar);
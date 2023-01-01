import LoginForm from "../../components/loginForm/loginForm";
import Fruits from '../../images/fruits.jpg';
import './style.css';

const Login = () => {
    return (
        <div className="login-container">
            <LoginForm />
            <img src={Fruits} alt='fruits'></img>
        </div>
    )
}

export default Login;
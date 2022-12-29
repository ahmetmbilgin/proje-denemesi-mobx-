import 'react-responsive-modal/styles.css';
import SignupForm from "../../components/signupForm/signupForm";
import Fruits from '../../images/fruits.jpg'
import './style.css'

const Signup = () => {

    return (
        <div className='signup-container'>
            <SignupForm />
            <img src={Fruits} alt='fruits'></img>
        </div>
    )
}

export default Signup;
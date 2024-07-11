import React, { useState, useEffect, useContext } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPopup = ({ setShowLogIn }) => {
    const [currentState, setCurrentState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    const { url, setToken } = useContext(StoreContext);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();

        let newUrl = url;
        let toastMessage = "";

        if (currentState === "Login") {
            newUrl += "/api/user/login";
            toastMessage = "Logged in successfully";
        } else {
            newUrl += "/api/user/register";
            toastMessage = "Registered successfully";
        }

        try {
            const response = await axios.post(newUrl, data);

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogIn(false);
                toast.success(toastMessage);
                console.log(response.data.token)
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleNavigate = (path) => {
        setShowLogIn(false);
        navigate(path);
    };

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogIn(false)} src={assets.cross_icon} alt="Close" />
                </div>
                <div className="login-popup-inputs">
                    {currentState === 'Login' ? <></>
                        : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                    <div className="password-input-container">
                        <input
                            name='password'
                            onChange={onChangeHandler}
                            value={data.password}
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Password'
                            required
                        />
                        <span
                            className="password-toggle-icon"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>
                        By continuing, I agree to the <span></span>
                        <span onClick={() => handleNavigate("/terms-of-use")}>
                            terms of use & privacy policy
                        </span>
                    </p>
                </div>
                <button type='submit'>
                    {currentState === 'Sign Up' ? "Create account" : "Login"}
                </button>
                {currentState === "Login" ? (
                    <p>
                        Create a new account? <span onClick={() => setCurrentState('Sign Up')}>Click here</span>
                    </p>
                ) : (
                    <p>
                        Already have an account? <span onClick={() => setCurrentState('Login')}>Login here</span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default LoginPopup;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form"; 
import Header from '../components/Header'; 
const Login = () => {
    const { register, handleSubmit, setError, formState: { errors }, watch } = useForm(); 
    const [otp, setOtp] = useState(""); 
    const [screen, setScreen] = useState(1);    
    const [timeRemaining, setTimeRemaining] = useState(300); 
    const [disableOTPSubmitButton, setDisableOTPSubmitButton] = useState(false);
    const [userId, setUserId] = useState(null); 
    const navigate = useNavigate();
    useEffect(() => {
        if (screen === 2 && timeRemaining > 0) {
            const timer = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [timeRemaining, screen]);

    const handleLogin = (data) => {
        const { email, password } = data;
        
        axios.post("http://localhost:3000/api/auth/login", { email, password })
            .then((response) => {
                setUserId(response.data.id);
                setScreen(2);
            })
            .catch((error) => {
                setError("email", { type: "manual", message: "Invalid email or password" });
            });
            
    };

    const handleOtpSubmit = (data) => {
        const { otp } = data;
        // setDisableOTPSubmitButton(true);
        
        axios.post(`http://localhost:3000/api/auth/verify2FA/${userId}`, { otp }, {
            withCredentials: true, 
          })
          
            .then((response) => {
                Swal.fire('Login Successful!', 'You have been logged in.', 'success');
            const accessToken = response.data.accessToken; 
   
             localStorage.setItem('accessToken', accessToken); 
             navigate('/')
             const token = localStorage.getItem('accessToken');
if (token) {
    console.log("Access token found:", token);
    const decodedToken = JSON.parse(atob(token.split('.')[1])); 
    const expirationTime = decodedToken.exp * 1000;

    if (Date.now() >= expirationTime) {
        console.log("Access token has expired.");
    } else {
        console.log("Access token is still valid.");
    }
} else {
    console.log("Access token not found.");
}

const getCookie = (cookieName) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${cookieName}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

const refreshToken = getCookie('refreshToken');
if (refreshToken) {
    console.log('Refresh token is stored in cookies.');
} else {
    console.log('Refresh token not found in cookies.');
}


            })
            .catch((error) => {
                setError("otp", { type: "manual", message: "Invalid OTP" });
            });
    };

    const resendOtp = async () => {
        setTimeRemaining(300); 
        setDisableOTPSubmitButton(false);

        try {
            const response = await axios.post(`http://localhost:3000/api/auth/resend-otp/${userId}`);
            Swal.fire('OTP Resent!', response.data.message, 'success');
        } catch (error) {
            Swal.fire('Error!', 'Failed to resend OTP.', 'error');
        }
    };

    // Watch email and password fields for real-time validation
    const email = watch("email");
    const password = watch("password");

    return (
        <>
        <Header />
        <div>
            <section className="vh-100" style={{ backgroundColor: "#f5f5f5", overflow: "hidden" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img src="illustration.png" className="img-fluid" alt="Phone image" />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <div className="login-block move-right">
                                <img className="logo-login" src="logo.png" width="150px" alt="Logo" />
                                <h2>Login</h2>

                                <form onSubmit={handleSubmit(screen === 1 ? handleLogin : handleOtpSubmit)}>
                                    {screen === 1 && (
                                        <div>
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="email"
                                                    placeholder="-- Enter Email address --"
                                                    className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                                                    {...register("email", { 
                                                        required: "Email is required",
                                                        pattern: {
                                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                            message: "Invalid email format"
                                                        }
                                                    })}
                                                />
                                                {errors.email && <span className="text-danger">{errors.email.message}</span>}
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input
                                                    type="password"
                                                    placeholder="-- Enter Password --"
                                                    className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                                                    {...register("password", { 
                                                        required: "Password is required",
                                                        minLength: {
                                                            value: 6,
                                                            message: "Password must be at least 6 characters"
                                                        }
                                                    })}
                                                />
                                                {errors.password && <span className="text-danger">{errors.password.message}</span>}
                                            </div>
                                        </div>
                                    )}

                                    {screen === 2 && (
                                        <>
                                            <div className="form-outline mb-4">
                                                {timeRemaining > 0 ? (
                                                    <>
                                                        <h4 className="expiry-time">
                                                            OTP Expires in {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                                                        </h4>
                                                        <input
                                                            type="number"
                                                            placeholder="-- Enter OTP --"
                                                            className={`form-control form-control-lg ${errors.otp ? 'is-invalid' : ''}`}
                                                            {...register("otp", { required: "OTP is required" })}
                                                        />
                                                        {errors.otp && <span className="text-danger">{errors.otp.message}</span>}
                                                    </>
                                                ) : (
                                                    <button onClick={resendOtp} className="btn-refresh">
                                                        <i className="fa fa-refresh" aria-hidden="true"></i> Resend OTP
                                                    </button>
                                                )}
                                            </div>
                                        </>
                                    )}

                                          {!disableOTPSubmitButton && (
    <button type="submit" className="btn btn-primary btn-lg w-100">Sign in</button>
                                          )}

                                    {screen === 1 && (
                                        <a href="/forgetPassword"> Forget password</a>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </>
    );
};

export default Login;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

const Login = () => {
    const [email, setEmail] = useState("");          
    const [password, setPassword] = useState("");  
    const [otp, setOtp] = useState(""); 
    const [screen, setScreen] = useState(1);    
    const [errors, setErrors] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(10); 
    const [disableOTPSubmitButton, setDisableOTPSubmitButton] = useState(false);
    const [minutes, setMinutes] = useState(Math.floor(timeRemaining / 60));
    const [seconds, setSeconds] = useState(timeRemaining % 60);
    const [userId, setUserId] = useState(null); 
    useEffect(() => {
        // Mettre à jour le minuteur toutes les secondes
        if (screen === 2 && timeRemaining > 0) {
            const timer = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
                setMinutes(Math.floor(timeRemaining / 60));
                setSeconds(timeRemaining % 60);
            }, 1000);
            return () => clearInterval(timer); 
        }
    }, [timeRemaining, screen]);

    const handleLogin = () => {
        if (screen === 1) {
    
         axios.post("http://localhost:3000/api/auth/login", { email, password })
                .then((response) => {
                    setUserId(response.data.id); 
                    setScreen(2);
                })
                .catch((error) => {
                    setErrors({ email: "Invalid email or password" });
                });
        } else if (screen === 2) {
            // Vérification de l'OTP ici
          
            axios.post(`http://localhost:3000/api/auth/verify2FA/${userId}`, { otp })
                .then((response) => {
                    Swal.fire('Login Successful!', 'You have been logged in.', 'success');
                })
                .catch((error) => {
                    setErrors({ otp: "Invalid OTP" });
                });
        }
    };

    const resendOtp = async () => {
        setTimeRemaining(300); // Réinitialiser le minuteur
        setDisableOTPSubmitButton(false); // Réactiver le bouton de soumission de l'OTP
    
        try {
            const response = await axios.post(`http://localhost:3000/api/auth/resend-otp/${userId}`); // Appel API pour renvoyer l'OTP
            Swal.fire('OTP Resent!', response.data.message, 'success');
        } catch (error) {
            Swal.fire('Error!', 'Failed to resend OTP.', 'error');
        }
    };
    

    return (
        <div>
            <section className="vh-100" style={{ backgroundColor: "#f5f5f5", overflow: "hidden" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img
                                src="illustration.png" 
                                className="img-fluid" alt="Phone image"
                            />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <div className="login-block move-right">
                                <img className="logo-login" src="logo.png" width="150px" alt="Logo" />
                                <h2>Login</h2>

                                {screen === 1 && (
                                    <div>
                                        <div className="form-outline mb-4">
                                            <input type="email"
                                                value={email}
                                                id="form1Example13"
                                                placeholder="-- Enter Email address --"
                                                className="form-control form-control-lg"
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <span className="text-danger">{errors['email']}</span>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="password"
                                                id="form1Example23"
                                                placeholder="-- Enter Password --"
                                                className="form-control form-control-lg"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <span className="text-danger">{errors['password']}</span>
                                        </div>

                                    </div>
                                    
                                )}

                                {screen === 2 && (
                                    <>
                                        <div className="form-outline mb-4">
                                            {timeRemaining > 0 ? (
                                                <>
                                                    <h4 className="expiry-time">
                                                        OTP Expires in {minutes}:{seconds.toString().padStart(2, '0')}
                                                    </h4>
                                                    <input
                                                        type="number"
                                                        value={otp}
                                                        id="form1Example13"
                                                        placeholder="-- Enter OTP --"
                                                        className="form-control form-control-lg"
                                                        onChange={(e) => setOtp(e.target.value)}
                                                    />
                                                    <span className="text-danger">{errors['otp']}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={resendOtp} className="btn-refresh">
                                                        <i className="fa fa-refresh" aria-hidden="true"></i> Resend OTP
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </>
                                )}

                                {!disableOTPSubmitButton && (
                                    <button onClick={handleLogin} className="btn btn-primary btn-lg w-100">Sign in</button>
                                )}
                               {screen === 1 ? (
    <a href="/forgetPassword"> Forget password</a>
) : null}


                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;

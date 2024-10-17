import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import illustration from "../assets/illustration.png";
import Swal from 'sweetalert2';
import Cookies from 'js-cookie'; 
import { useSelector } from "react-redux";
import Header from '../components/Header'; 
// import logo from "../assets/logo.png"; 

const Register = () => {
    // const { value } = useSelector(state => state.counter);
    // console.log(value);
    console.log("Register component loaded");

    const [name, setName] = useState("");            
    const [email, setEmail] = useState("");          
    const [password, setPassword] = useState("");    
    const [phoneNumber, setPhoneNumber] = useState("");  
    const [address, setAddress] = useState("");      
    const [role, setRole] = useState("client");
    const [errors, setErrors] = useState({});       

    const handleRegister = async (e) => {
      e.preventDefault();
    
      const userData = {
        name,
        email,
        password,
        phoneNumber,
        address,
        role, 
      };
    
      try {
        const response = await axios.post('http://localhost:3000/api/auth/register', userData);
    
        Swal.fire({
          icon: 'success',
          title: 'Inscription réussie',
          html: `Utilisateur enregistré. Veuillez vérifier votre email pour la vérification. 
                 <br> <a href="https://mail.google.com/" target="_blank">Accéder à ma boîte de réception</a>`,
        });
    
        // const accessToken = response.data.accessToken; 
   
        // localStorage.setItem('accessToken', accessToken); 
   
        setName('');
        setEmail('');
        setPassword('');
        setPhoneNumber('');
        setAddress('');
        setRole('client');
        
      } catch (error) {
        console.error("Error during registration:", error);
        
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: error.response?.data?.message || 'Une erreur est survenue, veuillez réessayer.',
        });
      }
    };
    

    return (
        <>
         <Header />
        <div>
            <section className="vh-full-screen" style={{ backgroundColor: "#f5f5f5", overflow: "hidden" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img src={illustration} className="img-fluid  w-100" alt="register" />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <div className="login-block move-right">
                                {/* <img className="logo-login" src={logo} width="150px" alt="Logo" /> */}
                                <h2>Register</h2>

                                {/* Nom */}
                                <div className="form-outline mb-4">
                                    <input
                                        type="text"
                                        value={name}
                                        id="name"
                                        placeholder="-- Enter your name --"
                                        className="form-control form-control-lg"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <span className="text-danger">{errors['name']}</span>
                                </div>

                                {/* Email */}
                                <div className="form-outline mb-4">
                                    <input
                                        type="email"
                                        value={email}
                                        id="email"
                                        placeholder="-- Enter Email address --"
                                        className="form-control form-control-lg"
                                
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <span className="text-danger">{errors['email']}</span>
                                </div>
                                
                                {/* Mot de passe */}
                                <div className="form-outline mb-4">
                                    <input
                                        type="password"
                                        value={password}
                                        id="password"
                                        placeholder="-- Enter your password --"
                                        className="form-control form-control-lg"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span className="text-danger">{errors['password']}</span>
                                </div>
                            
                                {/* Numéro de téléphone */}
                                <div className="form-outline mb-4">
                                    <input
                                        type="text"
                                        value={phoneNumber}
                                        id="phoneNumber"
                                        placeholder="-- Enter your phone number --"
                                        className="form-control form-control-lg"
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                    <span className="text-danger">{errors['phoneNumber']}</span>
                                </div>

                                {/* Adresse */}
                                <div className="form-outline mb-4">
                                    <input
                                        type="text"
                                        value={address}
                                        id="address"
                                        placeholder="-- Enter your address --"
                                        className="form-control form-control-lg"
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                    <span className="text-danger">{errors['address']}</span>
                                </div>
                                         {/* Boutons radio pour choisir le rôle */}
                                   <div className="form-check">
                                       <input
                                              className="form-check-input"
          type="radio"
          name="role"
          id="clientRole"
          value="client"
          checked={role === "client"} 
                                               onChange={(e) => setRole(e.target.value)}
                                         />
                                      <label className="form-check-label" htmlFor="clientRole">
                                        Client
                                      </label>
                                   </div>
                                   <div className="form-check">
                                  <input
                                    className="form-check-input"
          type="radio"
          name="role"
          id="livreurRole"
          value="livreur"
          checked={role === "livreur"} 
                                    onChange={(e) => setRole(e.target.value)}
                                  />
                                  <label className="form-check-label" htmlFor="livreurRole">
                                  Livreur
                                  </label>
                                </div>

      {/* Affiche le rôle sélectionné */}

                                <button onClick={handleRegister} className="btn btn-primary btn-lg w-100">
                                    Sign up
                                </button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </>
    );
};

export default Register;

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header'; 
const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); 
  const [message, setMessage] = useState('Verification in progress...');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post(`http://localhost:3000/api/auth/verify-user/${token}`);
        setMessage(response.data.message);
        setTimeout(() => navigate('/login'), 3000); 
      } catch (error) {
        setMessage(error.response?.data?.message || 'Failed to verify email.');
        setIsError(true);
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setMessage('Invalid or missing token.');
      setIsError(true);
    }
  }, [token, navigate]);

  return (
    <>
     <Header />
    <section className="vh-100" style={{ backgroundColor: "#f5f5f5", overflow: "hidden" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="illustration.png"
              className="img-fluid"
              alt="Verification illustration"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <div className="login-block p-4 bg-white shadow rounded">
              <img className="logo-login mb-3" src="logo.png" width="150px" alt="Logo" />
              <h2 className="mb-4">Email Verification</h2>

              <p style={{ color: isError ? 'red' : 'green' }}>{message}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default VerifyEmail;

import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Header from '../components/Header'; 
const ForgetPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/auth/forgetpassword`, { email: data.email });
      setMessage(response.data.message);
      setError('');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong, please try again later.');
      }
      setMessage('');
    }
  };

  return (
    <>
     <Header />
    <div>
      <section className="vh-100" style={{ backgroundColor: "#f5f5f5", overflow: "hidden" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="illustration.png"
                className="img-fluid"
                alt="Phone illustration"
              />
            </div>
            
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <div className="login-block move-right">
                <img className="logo-login" src="logo.png" width="150px" alt="Logo" />

                <h2>Forgot Your Password?</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                  <div className="form-group mb-3">
                    <label htmlFor="email">Email Address:</label>
                    <input
                      type="email"
                      id="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      {...register('email', { 
                        required: "Email is required", 
                        pattern: { 
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                          message: "Invalid email format" 
                        }
                      })}
                    />
                    {errors.email && <span className="text-danger">{errors.email.message}</span>}
                  </div>

                  <button type="submit" className="btn btn-primary btn-block">
                    Reset Password
                  </button>
                </form>

                {/* Display success or error messages */}
                {message && <p className="mt-3 text-success">{message}</p>}
                {error && <p className="mt-3 text-danger">{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default ForgetPassword;

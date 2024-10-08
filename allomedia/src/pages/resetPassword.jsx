import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const ResetPasswordForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('token'); // Récupérer le token depuis l'URL

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/auth/reset-password/${token}`, { newPassword: data.newPassword });
      setSuccessMessage(response.data.message);
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  // Pour valider si les mots de passe correspondent
  const newPassword = watch('newPassword'); // Regarde la valeur de newPassword

  return (
    <section className="vh-100" style={{ backgroundColor: "#f5f5f5", overflow: "hidden" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="illustration.png"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <div className="login-block p-4 bg-white shadow rounded">
              <img className="logo-login mb-3" src="logo.png" width="150px" alt="Logo" />

              <h2 className="mb-4">Reset Your Password</h2>

              {error && <p style={{ color: 'red' }}>{error}</p>}
              {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-3">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    id="newPassword"
                    type="password"
                    className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
                    {...register('newPassword', {
                      required: 'New password is required',
                      minLength: { value: 6, message: 'Password must be at least 6 characters long' }
                    })}
                  />
                  {errors.newPassword && <span className="text-danger">{errors.newPassword.message}</span>}
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    {...register('confirmPassword', {
                      required: 'Confirm password is required',
                      validate: value => value === newPassword || 'Passwords do not match'
                    })}
                  />
                  {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordForm;

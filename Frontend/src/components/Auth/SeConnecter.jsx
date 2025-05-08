import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

function SeConnecter({ onCloseModal }) {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'emailOrPhone') {
      setEmailOrPhone(value);
    } else if (id === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailOrPhone,
          password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Email ou mot de passe incorrect");
      }

      // Store user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.role);

      // Dispatch custom event to notify navbar of login
      window.dispatchEvent(new Event('loginStateChange'));

      // Close modal if exists
      onCloseModal?.();

      // Navigate to appropriate dashboard
      navigate(data.role === 'student' ? '/dashboard-student' : '/dashboard-teacher');

    } catch (err) {
      setError(err.message || "Une erreur est survenue lors de la connexion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Connexion</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="mx-auto" style={{ maxWidth: '400px' }} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="emailOrPhone" className="form-label">Email</label>
          <input
            type="text"
            className="form-control"
            id="emailOrPhone"
            value={emailOrPhone}
            onChange={handleChange}
            placeholder="ex: nom@example.com"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={handleChange}
            placeholder="Votre mot de passe"
            required
          />
        </div>
        <div className="mb-3 text-end">
          <Link to="/mot-de-passe-oublie" className="text-decoration-none">Mot de passe oublié ?</Link>
        </div>
        <button 
          type="submit" 
          className="btn btn-primary w-100"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <FaSpinner className="fa-spin me-2" />
              Connexion...
            </>
          ) : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}

export default SeConnecter;
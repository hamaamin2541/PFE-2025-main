import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaEnvelope, FaLock, FaIdCard, FaCreditCard, FaUserTag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { initializeNewStudent } from '../../services/studentInitializer';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    studentCard: '',
    teacherId: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    securityCode: '',
    cardHolderName: ''
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const { fullName, email, password, confirmPassword, role, studentCard, teacherId, cardNumber, expiryMonth, expiryYear, securityCode, cardHolderName } = formData;

    if (!role) {
      setError('Veuillez sélectionner un rôle');
      setIsLoading(false);
      return;
    }

    if (fullName.length < 3 || /\d/.test(fullName)) {
      setError("Le nom complet doit contenir au moins 3 caractères sans chiffres");
      setIsLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError("Veuillez saisir une adresse email valide");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      setIsLoading(false);
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError("Le mot de passe doit contenir majuscules, minuscules, chiffres et caractères spéciaux");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setIsLoading(false);
      return;
    }
    

    if (role === 'student') {
      if (!/^\d{8}$/.test(studentCard)) {
        setError("Le numéro de la carte étudiant doit contenir exactement 8 chiffres");
        setIsLoading(false);
        return;
      }
    }

    if (role === 'teacher') {
      if (!/^[A-Za-z0-9]{5,}$/.test(teacherId)) {
        setError("L'identifiant enseignant est invalide");
        setIsLoading(false);
        return;
      }

      if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
        setError("Le numéro de carte bancaire doit contenir 16 chiffres");
        setIsLoading(false);
        return;
      }

      if (!/^\d{2}$/.test(expiryMonth) || !/^\d{2}$/.test(expiryYear)) {
        setError("Date d’expiration invalide (format MM/YY)");
        setIsLoading(false);
        return;
      }

      if (!/^\d{3}$/.test(securityCode)) {
        setError("Code de sécurité invalide (3 chiffres)");
        setIsLoading(false);
        return;
      }

      if (cardHolderName.trim().length < 3) {
        setError("Le nom du titulaire est invalide");
        setIsLoading(false);
        return;
      }
    }

    try {
      // Create the request body with only the needed fields
      const requestBody = {
        fullName,
        email,
        password,
        role,
        ...(role === 'student' && { 
          studentCard,
          ...initializeNewStudent // Initialize empty data
        }),
        ...(role === 'teacher' && { 
          teacherId,
          paymentInfo: {
            cardNumber: cardNumber.replace(/\s/g, ''),
            expiryMonth,
            expiryYear,
            securityCode,
            cardHolderName
          }
        })
      };

      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.user.role);
        alert('Inscription réussie !');
        
        // Navigate based on role
        if (data.user.role === 'teacher') {
          navigate('/dashboard-teacher');
        } else if (data.user.role === 'student') {
          navigate('/dashboard-student');
        }
      } else {
        setError(data.message || 'Erreur lors de l\'inscription');
      }
    } catch (error) {
      setError('Erreur de connexion au serveur');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5 p-4 shadow rounded bg-light" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-center">Créer un compte</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Nom Complet */}
        <div className="mb-3">
          <label className="form-label"><FaUser className="me-2" />Nom complet</label>
          <input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleChange} />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label"><FaEnvelope className="me-2" />Adresse Email</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
        </div>

        {/* Mot de passe */}
        <div className="mb-3">
          <label className="form-label"><FaLock className="me-2" />Mot de passe</label>
          <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} />
        </div>

        {/* Confirmation mot de passe */}
        <div className="mb-3">
          <label className="form-label"><FaLock className="me-2" />Confirmer le mot de passe</label>
          <input type="password" className="form-control" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        </div>

        {/* Choix du rôle */}
        <div className="mb-3">
          <label className="form-label"><FaUserTag className="me-2" />Rôle</label>
          <select className="form-select" name="role" value={formData.role} onChange={handleChange}>
            <option value="">-- Sélectionnez un rôle --</option>
            <option value="student">Étudiant</option>
            <option value="teacher">Enseignant</option>
          </select>
        </div>

        {/* Si étudiant : numéro carte */}
        {formData.role === 'student' && (
          <div className="mb-3">
            <label className="form-label"><FaIdCard className="me-2" />Numéro carte étudiant</label>
            <input type="text" className="form-control" name="studentCard" value={formData.studentCard} onChange={handleChange} />
          </div>
        )}

        {/* Si enseignant : identifiant et infos paiement */}
        {formData.role === 'teacher' && (
          <>
            <div className="mb-3">
              <label className="form-label"><FaIdCard className="me-2" />Identifiant enseignant</label>
              <input type="text" className="form-control" name="teacherId" value={formData.teacherId} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label"><FaCreditCard className="me-2" />Numéro carte bancaire</label>
              <input type="text" className="form-control" name="cardNumber" value={formData.cardNumber} onChange={handleChange} maxLength="16" />
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Mois</label>
                <input type="text" className="form-control" name="expiryMonth" value={formData.expiryMonth} onChange={handleChange} placeholder="MM" maxLength="2" />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Année</label>
                <input type="text" className="form-control" name="expiryYear" value={formData.expiryYear} onChange={handleChange} placeholder="YY" maxLength="2" />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Code</label>
                <input type="text" className="form-control" name="securityCode" value={formData.securityCode} onChange={handleChange} placeholder="CVV" maxLength="3" />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Nom du titulaire</label>
              <input type="text" className="form-control" name="cardHolderName" value={formData.cardHolderName} onChange={handleChange} />
            </div>
          </>
        )}

        <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
          {isLoading ? 'Inscription...' : 'S’inscrire'}
        </button>
      </form>
    </div>
  );
};

export default Register;

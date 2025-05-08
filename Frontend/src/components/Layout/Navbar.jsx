import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import {
  Home,
  Mail,
  UserRound,
  Languages,
  ListTodo,
  Presentation,
  LayoutDashboard,
  LogOut,
  LogIn,
  UserPlus,
} from 'lucide-react';
import './Navbar.css';
import logo from '../../Assets/logo.png';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Check login status whenever component mounts and token changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      const userRole = localStorage.getItem('userRole');
      setIsLoggedIn(!!(token && userRole));
    };

    checkLoginStatus();

    // Listen for custom login/logout events
    window.addEventListener('loginStateChange', checkLoginStatus);
    
    return () => {
      window.removeEventListener('loginStateChange', checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('loginStateChange'));
    navigate('/');
  };

  const handleNavigation = () => {
    const role = localStorage.getItem('userRole');
    if (role === 'teacher') {
      navigate('/dashboard-teacher');
    } else if (role === 'student') {
      navigate('/dashboard-student');
    }
  };

  const handleLanguageChange = (lang) => {
    i18next.changeLanguage(lang);
  };

  const handleDeleteAccount = async () => {
    if (window.confirm(t('Are you sure you want to delete your account?'))) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/users/delete', {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.success) {
          alert(t('Account deleted successfully.'));
          handleLogout();
        } else {
          alert(data.message || t('Failed to delete account.'));
        }
      } catch (error) {
        alert(t('An error occurred while deleting your account.'));
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
      <div className="container-fluid">
        <Link className="navbar-custom-brand fw-bold text-light" to="/">
          <img src={logo} alt="Logo" className="navbar-custom-logo" />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-custom-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="navbar-custom-nav-item">
              <Link className="navbar-custom-nav-link navbar-custom-btn ms-2" to="/Accueil">
                <Home className="navbar-icon" size={18} />{t('Accueil')}
              </Link>
            </li>

            <li className="navbar-custom-nav-item">
              <Link className="navbar-custom-nav-link navbar-custom-btn ms-2" to="/Contact">
                <Mail className="navbar-icon" size={18} />{t('Contact')}
              </Link>
            </li>

            <li className="navbar-custom-nav-item">
              <Link
                className="navbar-custom-nav-link navbar-custom-btn ms-2"
                to="/NotreContenu"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/NotreContenu');
                }}
              >
                <ListTodo className="navbar-icon" size={18} />{t('NotreContenu')}
              </Link>
            </li>

            <li className="navbar-custom-nav-item">
              <Link className="navbar-custom-nav-link navbar-custom-btn ms-2" to="/NosProfesseurs">
                <Presentation className="navbar-icon" size={18} />{t('NosProfesseurs')}
              </Link>
            </li>

            <li className="navbar-custom-nav-item">
              <Dropdown>
                <Dropdown.Toggle variant="outline-light" className="ms-2 navbar-custom-btn navbar-custom-dropdown-toggle">
                  <UserRound className="navbar-icon" size={18} /> {t('MonCompte')}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {isLoggedIn ? (
                    <>
                      <Dropdown.Item onClick={() => navigate('/dashboard-' + localStorage.getItem('userRole'))}>
                        <LayoutDashboard className="navbar-icon" size={16} />
                        <span className="ms-2">{t('Dashboard')}</span>
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleLogout}>
                        <LogOut className="navbar-icon" size={16} />
                        <span className="ms-2">{t('Déconnexion')}</span>
                      </Dropdown.Item>
                    </>
                  ) : (
                    <>
                      <Dropdown.Item onClick={() => navigate('/SeConnecter')}>
                        <LogIn className="navbar-icon" size={16} />
                        <span className="ms-2">{t('connexion')}</span>
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => navigate('/Register')}>
                        <UserPlus className="navbar-icon" size={16} />
                        <span className="ms-2">{t('inscription')}</span>
                      </Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </li>

            <li className="navbar-custom-nav-item">
              <Dropdown>
                <Dropdown.Toggle variant="outline-light" className="ms-2 navbar-custom-btn navbar-custom-dropdown-toggle">
                  <Languages className="navbar-icon" size={18} />{i18next.language ? i18next.language.toUpperCase() : 'LANG'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item className="navbar-custom-dropdown-item" onClick={() => handleLanguageChange('fr')}>Français</Dropdown.Item>
                  <Dropdown.Item className="navbar-custom-dropdown-item" onClick={() => handleLanguageChange('ar')}>العربية</Dropdown.Item>
                  <Dropdown.Item className="navbar-custom-dropdown-item" onClick={() => handleLanguageChange('en')}>English</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
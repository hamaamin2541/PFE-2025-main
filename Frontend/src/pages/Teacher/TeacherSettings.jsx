import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Card, Image, Alert } from 'react-bootstrap';
import { Upload } from 'lucide-react';
import { API_BASE_URL } from '../../config/api';
import axios from 'axios';
import { useTeacher } from '../../context/TeacherContext';

const TeacherSettings = () => {
  const { updateTeacherData } = useTeacher();
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    bio: ''
  });
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/api/users/dashboard`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.success) {
          const { fullName, email, phone, bio, profileImage } = response.data.data;
          setPersonalInfo({ fullName, email, phone: phone || '', bio: bio || '' });
          if (profileImage) {
            const imageUrl = `${API_BASE_URL}/${profileImage}`;
            setPreviewImage(imageUrl);
            localStorage.setItem('teacherProfileImage', imageUrl);
            updateTeacherData({ profileImage: imageUrl });
          }
        }
      } catch (err) {
        setError('Erreur lors du chargement des données');
      }
    };

    fetchTeacherData();
  }, []);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (!profileImage) return;
    
    try {
      const formData = new FormData();
      formData.append('profileImage', profileImage);

      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/api/users/upload-profile-image`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        const imageUrl = `${API_BASE_URL}/${response.data.imagePath}`;
        setSuccess('Photo de profil mise à jour avec succès');
        setPreviewImage(imageUrl);
        updateTeacherData({ profileImage: imageUrl });
      }
    } catch (err) {
      setError('Erreur lors du téléchargement de l\'image');
    }
  };

  const handlePersonalInfoSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_BASE_URL}/api/users/update-profile`,
        personalInfo,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setSuccess('Informations personnelles mises à jour avec succès');
        updateTeacherData({ fullName: personalInfo.fullName });
      }
    } catch (err) {
      setError('Erreur lors de la mise à jour des informations');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_BASE_URL}/api/users/change-password`,
        {
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setSuccess('Mot de passe modifié avec succès');
        setPasswords({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
    } catch (err) {
      setError('Erreur lors du changement de mot de passe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-container p-4">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Photo de profil</Card.Title>
          <div className="d-flex align-items-center mb-3">
            <Image
              src={previewImage || '/images/default-profile.jpg'}
              roundedCircle
              width={100}
              height={100}
              className="me-3"
              style={{ objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = '/images/default-profile.jpg';
              }}
            />
            <Button
              variant="outline-primary"
              onClick={() => fileInputRef.current.click()}
            >
              <Upload size={16} className="me-2" />
              Changer la photo
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>
          {previewImage && (
            <Button onClick={handleImageUpload} disabled={loading}>
              Enregistrer la nouvelle photo
            </Button>
          )}
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Informations personnelles</Card.Title>
          <Form onSubmit={handlePersonalInfoSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nom complet</Form.Label>
              <Form.Control
                type="text"
                placeholder="Votre nom complet"
                value={personalInfo.fullName}
                onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={personalInfo.email}
                onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Téléphone</Form.Label>
              <Form.Control
                type="tel"
                value={personalInfo.phone}
                onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={personalInfo.bio}
                onChange={(e) => setPersonalInfo({...personalInfo, bio: e.target.value})}
              />
            </Form.Group>

            <Button type="submit" disabled={loading}>
              Enregistrer les modifications
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title>Changer le mot de passe</Card.Title>
          <Form onSubmit={handlePasswordChange}>
            <Form.Group className="mb-3">
              <Form.Label>Mot de passe actuel</Form.Label>
              <Form.Control
                type="password"
                value={passwords.currentPassword}
                onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nouveau mot de passe</Form.Label>
              <Form.Control
                type="password"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirmer le nouveau mot de passe</Form.Label>
              <Form.Control
                type="password"
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
              />
            </Form.Group>

            <Button type="submit" disabled={loading}>
              Changer le mot de passe
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TeacherSettings;
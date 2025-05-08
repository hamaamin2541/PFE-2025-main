import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';
import { Row, Col, Card, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import './NosProfesseurs.css';
import FAQ from '../components/FAQ';

function NosProfesseurs() {
  const [teachers, setTeachers] = useState([]);
  const [teachersLoading, setTeachersLoading] = useState(true);
  const [textAdvice, setTextAdvice] = useState([]);
  const [videoAdvice, setVideoAdvice] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setTeachersLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/users/byRole/teacher`);
        if (response.data.success) {
          setTeachers(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching teachers:', err);
        setError('Erreur lors du chargement des professeurs');
      } finally {
        setTeachersLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        setLoading(true);
        // Changed endpoint to match backend route
        const response = await axios.get(`${API_BASE_URL}/api/teacher-advice/all`);
        if (response.data.success) {
          const adviceWithTeachers = response.data.data;
          setTextAdvice(adviceWithTeachers.filter(advice => advice.type === 'text'));
          setVideoAdvice(adviceWithTeachers.filter(advice => advice.type === 'video'));
        }
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement des conseils des professeurs');
        console.error('Error fetching advice:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAdvice();
  }, []);

  const renderTextAdvice = () => (
    <div className="row mt-4">
      <h3 className="text-center mb-4">Conseils Textuels</h3>
      {textAdvice.length > 0 ? (
        textAdvice.map((advice) => (
          <div className="col-md-4 mb-4" key={advice._id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <div>
                    <h5 className="card-title mb-0 text-primary">
                      {advice.teacher?.fullName || 'Professeur'}
                    </h5>
                    <small className="text-muted d-block">
                      {advice.teacher?.specialty || 'Enseignant'}
                    </small>
                  </div>
                </div>
                <p className="card-text">{advice.content}</p>
                <small className="text-muted d-block text-end">
                  {new Date(advice.createdAt).toLocaleDateString()}
                </small>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-12 text-center">
          <p>Aucun conseil textuel disponible pour le moment.</p>
        </div>
      )}
    </div>
  );

  const renderVideoAdvice = () => (
    <div className="row mt-4">
      <h3 className="text-center mb-4">Conseils Vidéo</h3>
      {videoAdvice.length > 0 ? (
        videoAdvice.map((advice) => (
          <div className="col-md-4 mb-4" key={advice._id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <div>
                    <h5 className="card-title mb-0 text-primary">
                      {advice.teacher?.fullName || 'Professeur'}
                    </h5>
                    <small className="text-muted d-block">
                      {advice.teacher?.specialty || 'Enseignant'}
                    </small>
                  </div>
                </div>
                <div className="ratio ratio-16x9 mb-3">
                  <iframe
                    src={advice.videoUrl}
                    title={`Conseil vidéo de ${advice.teacher?.fullName}`}
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="card-text">{advice.content}</p>
                <small className="text-muted d-block text-end">
                  {new Date(advice.createdAt).toLocaleDateString()}
                </small>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-12 text-center">
          <p>Aucun conseil vidéo disponible pour le moment.</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Nos Professeurs Experts</h1>
      
      <div className="section-description text-center mb-5">
        <p className="lead">
          Un contenu précieux et riche sous la supervision des meilleurs professeurs et enseignants de Tunisie. <br />
          La plateforme <strong>we learn</strong> cherche à attirer les meilleurs professeurs et enseignants 
          les plus qualifiés de tout le pays pour accompagner vos enfants dans leur cheminement vers la réussite.
        </p>
      </div>

      <Row className="mb-5">
        {teachersLoading ? (
          <div className="text-center w-100">
            <p>Chargement des professeurs...</p>
          </div>
        ) : teachers.length > 0 ? (
          teachers.map(teacher => (
            <Col key={teacher._id} md={4} className="mb-4">
              <Card className="h-100 teacher-card">
                <Card.Img 
                  variant="top" 
                  src={`${API_BASE_URL}/${teacher.profileImage}`}
                  onError={(e) => {
                    e.target.src = '/images/default-profile.jpg';
                  }}
                  className="teacher-image"
                />
                <Card.Body>
                  <Card.Title>{teacher.fullName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {teacher.specialty || 'Enseignant'} • {teacher.experience || 'Expérimenté'}
                  </Card.Subtitle>
                  <Card.Text>{teacher.bio || 'Professeur dévoué à l\'enseignement'}</Card.Text>
                  <Button variant="outline-primary">Contacter</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div className="text-center w-100">
            <p>Aucun professeur disponible pour le moment.</p>
          </div>
        )}
      </Row>

      {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

      <div className="teacher-advice-section mb-5">
        <h2 className="text-center mb-4">Conseils des Professeurs</h2>
        {loading ? (
          <div className="text-center">Chargement des conseils...</div>
        ) : (
          <>
            {renderTextAdvice()}
            {renderVideoAdvice()}
          </>
        )}
      </div>

      <FAQ />
    </div>
  );
}

export default NosProfesseurs;

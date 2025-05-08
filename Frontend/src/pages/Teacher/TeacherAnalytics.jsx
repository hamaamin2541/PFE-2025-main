import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Users, BookOpen, DollarSign, Star, BarChart2, TrendingUp } from 'lucide-react';
import { API_BASE_URL } from '../../config/api';

const PlaceholderChart = ({ icon: Icon, title }) => (
  <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: 300 }}>
    <div className="text-center text-muted">
      <Icon size={48} className="mb-3" />
      <h6>{title}</h6>
      <p className="small">Aucune donnée disponible</p>
    </div>
  </div>
);

export const TeacherAnalytics = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalRevenue: 0,
    averageRating: 0,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/courses/teacher/analytics`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const { data } = await response.json();
        setStats({
          totalStudents: data.totalStudents || 0,
          totalCourses: data.totalCourses || 0,
          totalRevenue: data.totalRevenue || 0,
          averageRating: parseFloat(data.averageRating) || 0,
          isLoading: false,
          error: null
        });
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
        setStats(prev => ({
          ...prev,
          isLoading: false,
          error: error.message
        }));
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <Container fluid className="p-4">
      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Total Étudiants</h6>
                  <h3 className="mb-0">{stats.totalStudents}</h3>
                </div>
                <Users size={24} className="text-primary" />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Total Cours</h6>
                  <h3 className="mb-0">{stats.totalCourses}</h3>
                </div>
                <BookOpen size={24} className="text-success" />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Revenus</h6>
                  <h3 className="mb-0">{stats.totalRevenue}€</h3>
                </div>
                <DollarSign size={24} className="text-warning" />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Note Moyenne</h6>
                  <h3 className="mb-0">{stats.averageRating}</h3>
                </div>
                <Star size={24} className="text-info" />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <h5 className="mb-4">Vues des cours</h5>
              <PlaceholderChart icon={TrendingUp} title="Statistiques des vues" />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <h5 className="mb-4">Inscriptions</h5>
              <PlaceholderChart icon={BarChart2} title="Statistiques des inscriptions" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TeacherAnalytics;
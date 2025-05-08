import React, { useState, useEffect, useRef } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Nav, 
  ProgressBar, 
  Button,
  Image,
  Modal,
  Form,
  Dropdown
} from 'react-bootstrap';
import { 
  BookOpen, 
  DollarSign, 
  BarChart2, 
  MessageSquare, 
  Star, 
  Settings, 
  HelpCircle, 
  Plus,
  Upload 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import { useTeacher } from '../../context/TeacherContext';
import './DashboardTeacher.css';
import { TeacherAnalytics } from './TeacherAnalytics';
import TeacherMessages from './TeacherMessages';
import AddCourse from './AddCourse';
import AddTextAdvice from './conseiltest/AddTextAdvice';
import AddVideoAdvice from './conseiltest/AddVideoAdvice';
import AddTest from './conseiltest/AddTest';
import TeacherCourses from './TeacherCourses';
import TeacherSettings from './TeacherSettings';

const DashboardTeacher = () => {
  const { teacherData } = useTeacher();
  const [activeTab, setActiveTab] = useState('courses');
  const [stats, setStats] = useState({
    totalStudents: 0,    // No students yet
    totalEarnings: 0,    // No earnings yet
    avgRating: 0,        // No ratings yet
    coursesPublished: 1  // One course published
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      // For a new teacher with one course
      setStats({
        totalStudents: 0,
        totalEarnings: 0,
        avgRating: 0,
        coursesPublished: 13
      });
    };
    
    fetchStats();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <TeacherAnalytics />;
      case 'messages':
        return <TeacherMessages />;
      case 'settings':
        return <TeacherSettings />;
      case 'add-course':
        return <AddCourse />;
      case 'add-advice':
        return <AddTextAdvice />;
      case 'add-video-advice':
        return <AddVideoAdvice />;
      case 'add-test':
        return <AddTest />;
      default:
        return <TeacherCourses />;
    }
  };

  return (
    <Container fluid className="teacher-dashboard px-0">
      <Row className="g-0">
        <Col md={3} className="teacher-sidebar">
          <div className="profile-section text-center p-4">
            <div className="avatar mb-3">
              <Image 
                src={teacherData.profileImage || '/images/default-profile.jpg'} 
                alt="Profile" 
                roundedCircle 
                width={120} 
                height={120} 
                style={{ objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = '/images/default-profile.jpg';
                }}
              />
            </div>
            <h5>{teacherData.fullName || 'Loading...'}</h5>
            <p className="text-muted">{teacherData.role || 'Enseignant'}</p>
            <div className="rating mb-3">
              <span className="ms-1">{teacherData.rating || '0'}</span>
            </div>
          </div>
          <div>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link 
                  active={activeTab === 'courses'} 
                  onClick={() => setActiveTab('courses')}
                >
                  <BookOpen size={18} className="me-2" />
                  Mes cours
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  active={activeTab === 'analytics'} 
                  onClick={() => setActiveTab('analytics')}
                >
                  <BarChart2 size={18} className="me-2" />
                  Analytics
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  active={activeTab === 'messages'} 
                  onClick={() => setActiveTab('messages')}
                >
                  <MessageSquare size={18} className="me-2" />
                  Messages
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  active={activeTab === 'settings'} 
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings size={18} className="me-2" />
                  Paramètres
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  active={activeTab === 'add-course'} 
                  onClick={() => setActiveTab('add-course')}
                >
                  <Plus size={18} className="me-2" />
                  Nouveau cours
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  active={activeTab === 'add-advice'} 
                  onClick={() => setActiveTab('add-advice')}
                >
                  <Plus size={18} className="me-2" />
                  Nouveau Conseil
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  active={activeTab === 'add-video-advice'} 
                  onClick={() => setActiveTab('add-video-advice')}
                >
                  <Plus size={18} className="me-2" />
                  Ajouter Conseil Vidéo
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  active={activeTab === 'add-test'} 
                  onClick={() => setActiveTab('add-test')}
                >
                  <Plus size={18} className="me-2" />
                  Ajouter Test
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </Col>

        <Col md={9} className="teacher-content">
          <div className="dashboard-header p-4">
            <h2>
              {activeTab === 'courses' && `Mes Cours (${stats.coursesPublished})`}
              {activeTab === 'analytics' && 'Analytics'}
              {activeTab === 'messages' && 'Messages'}
              {activeTab === 'settings' && 'Paramètres'}
              {activeTab === 'add-course' && 'Nouveau cours'}
              {activeTab === 'add-advice' && 'Nouveau Conseil'}
              {activeTab === 'add-video-advice' && 'Conseil Vidéo'} 
              {activeTab === 'add-test' && 'Test'} 
            </h2>
          </div>

          <div className="dashboard-content p-4">
            {renderContent()}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardTeacher;

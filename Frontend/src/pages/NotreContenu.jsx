import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { useLocation } from 'react-router-dom';
import './NotreContenu.css';
import FAQ from '../components/FAQ';

const categories = {
  'Systèmes d\'Information': ['Bases de données', 'Cybersécurité', 'Cloud Computing'],
  'Certifications Informatiques': ['AWS Certified', 'Google IT Support', 'Cisco CCNA'],
  'Leadership': ['Gestion d\'équipe', 'Communication', 'Développement personnel'],
  'Développement Web': ['HTML & CSS', 'JavaScript', 'React', 'Node.js']
};

const courses = {
  'Bases de données': ['MySQL pour débutants', 'MongoDB Essentials'],
  'Cybersécurité': ['Introduction à la cybersécurité', 'Sécurité des réseaux'],
  'Cloud Computing': ['AWS Fondamentaux', 'Introduction à Azure'],

  'AWS Certified': ['AWS Cloud Practitioner', 'AWS Solutions Architect'],
  'Google IT Support': ['Google IT Support Pro Certificate'],
  'Cisco CCNA': ['Formation complète CCNA'],

  'Gestion d\'équipe': ['Leadership pour managers', 'Gestion de conflits'],
  'Communication': ['Communication efficace', 'Techniques de présentation'],
  'Développement personnel': ['Productivité & Time Management'],

  'HTML & CSS': ['Créer des sites web modernes', 'CSS Flexbox & Grid'],
  'JavaScript': ['JavaScript de A à Z', 'Projets pratiques en JS'],
  'React': ['React pour débutants', 'React avancé avec hooks'],
  'Node.js': ['Node.js complet', 'Créer API avec Express']
};

const NotreContenu = () => {
  const location = useLocation();

  

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);

  // Reset state when navigating to this page
  useEffect(() => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSearchTerm('');
  }, [location]);

  // Filter courses based on search and category
  useEffect(() => {
    const filterCourses = () => {
      let filtered = [];
      Object.entries(courses).forEach(([subCategory, courseList]) => {
        const matchingCourses = courseList.filter(course =>
          course.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (matchingCourses.length > 0) {
          filtered.push(...matchingCourses);
        }
      });
      setFilteredCourses(filtered);
    };

    filterCourses();
  }, [searchTerm, courses]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setSelectedSubCategory(null); // Reset subcategory
  };

  const handleSubCategoryClick = (sub) => {
    setSelectedSubCategory(sub);
  };

  return (
    <Container className="notre-contenu-container position-relative">
      <div className="explore-hero py-5 mb-4">
        <h1 className="hero-title">Développez vos compétences</h1>
        <p className="hero-subtitle">Apprenez avec les meilleurs instructeurs</p>
        
        <Form className="search-form mt-4">
          <div className="search-input-container">
            <Search className="search-icon" />
            <Form.Control
              type="text"
              placeholder="Rechercher des cours..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <Button 
            variant="primary" 
            className="search-button"
            onClick={(e) => {
              e.preventDefault();
              // Search is already handled by useEffect
            }}
          >
            Rechercher
          </Button>
        </Form>
      </div>

      {error && (
        <div className="alert alert-danger text-center mb-4">
          {error}
        </div>
      )}

      {/* Main Categories */}
      <div className="main-buttons mb-4 d-flex justify-content-center flex-wrap" style={{ zIndex: 1 }}>
        {Object.keys(categories).map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'dark' : 'outline-dark'}
            className="m-2"
            onClick={(e) => {
              e.stopPropagation();
              handleCategoryClick(category);
            }}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Subcategories */}
      {selectedCategory && (
        <div className="subcategory-buttons mb-4 d-flex justify-content-center flex-wrap animate-fade">
          {categories[selectedCategory].map((sub) => (
            <Button
              key={sub}
              variant={selectedSubCategory === sub ? 'primary' : 'outline-primary'}
              className="m-2"
              onClick={() => handleSubCategoryClick(sub)}
            >
              {sub}
            </Button>
          ))}
        </div>
      )}

      {/* Display filtered results if there's a search term */}
      {searchTerm && (
        <Row className="mt-4 animate-slide">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, idx) => (
              <Col key={idx} md={6} lg={4} className="mb-4">
                <Card className="course-card">
                  <Card.Body>
                      <Card.Title>{course}</Card.Title>
                      <Card.Text>
                        Découvrez ce cours pour améliorer vos compétences!
                      </Card.Text>
                      <Button variant="success" size="sm">Voir le cours</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col xs={12} className="text-center">
              <p>Aucun résultat trouvé pour "{searchTerm}"</p>
            </Col>
          )}
        </Row>
      )}

      {/* Show regular category-based content when no search */}
      {!searchTerm && selectedSubCategory && (
        <Row className="mt-4 animate-slide">
          {courses[selectedSubCategory].map((course, idx) => (
            <Col key={idx} md={6} lg={4} className="mb-4">
              <Card className="course-card h-100 shadow-sm hover-effect">
                <Card.Body>
                  <Card.Title className="h5 mb-3">{course}</Card.Title>
                  <Card.Text>
                    Découvrez ce cours pour améliorer vos compétences!
                  </Card.Text>
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center">
                      <Button variant="success" size="sm">
                        Voir le cours
                      </Button>
                      <span className="text-muted small">4.5 ⭐</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {isLoading && (
        <div className="text-center my-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      )}

      <div className="mt-5">
        <FAQ />
      </div>
    </Container>
  );
};

export default NotreContenu;
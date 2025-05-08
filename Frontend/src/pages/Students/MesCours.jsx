import React, { useState } from 'react';
import { Card, Button, Container, Row, Col, Form, Modal } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './MesCours.css';
import PurchaseCourseForm from './PurchaseCourseForm'; // Importer le formulaire d'achat

const MesCours = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const coursesPerPage = 6;

  const cours = [
    {
      id: 1,
      titre: 'React pour Débutants',
      description: 'Apprenez les bases de React rapidement.',
      categorie: 'Web',
      image: 'https://picsum.photos/300/200?random=1'
    },
    {
      id: 2,
      titre: 'Laravel Complet',
      description: 'Maîtrisez Laravel de A à Z.',
      categorie: 'Web',
      image: 'https://picsum.photos/300/200?random=2'
    },
    {
      id: 3,
      titre: 'Machine Learning',
      description: 'Démarrez dans le monde de l\'IA.',
      categorie: 'Data Science',
      image: 'https://picsum.photos/300/200?random=3'
    },
    {
      id: 4,
      titre: 'Node.js Backend',
      description: 'Construisez des APIs puissantes avec Node.js.',
      categorie: 'Web',
      image: 'https://picsum.photos/300/200?random=4'
    },
    {
      id: 5,
      titre: 'Analyse de Données',
      description: 'Maîtrisez l\'analyse de données avec Python.',
      categorie: 'Data Science',
      image: 'https://picsum.photos/300/200?random=5'
    },
    {
      id: 6,
      titre: 'UI/UX Design',
      description: 'Devenez un designer UI/UX expert.',
      categorie: 'Design',
      image: 'https://picsum.photos/300/200?random=6'
    },
    {
      id: 7,
      titre: 'Deep Learning',
      description: 'Apprenez les réseaux neuronaux profonds.',
      categorie: 'Data Science',
      image: 'https://picsum.photos/300/200?random=7'
    }
  ];

  // 🔥 Filtres combinés
  const filteredCours = cours.filter(cours =>
    (selectedCategory === 'Toutes' || cours.categorie === selectedCategory) &&
    (cours.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cours.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCours.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCours.length / coursesPerPage);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // Revenir à la première page après changement de catégorie
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleShowPurchaseForm = (course) => {
    setSelectedCourse(course);
    setShowPurchaseForm(true); // Ouvre le formulaire d'achat
  };

  const handleClosePurchaseForm = () => {
    setShowPurchaseForm(false);
    setSelectedCourse(null); // Réinitialiser le cours sélectionné
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4 fw-bold">Mes Cours</h1>

      {/* 🔎 Search + Category Filter */}
      <Row className="mb-5">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Rechercher un cours..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={6}>
          <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="Toutes">Toutes les catégories</option>
            <option value="Développement web">Développement web</option>
            <option value="leadership">leadership</option>
            <option value="Certifications Informatiques">Certifications Informatiques</option>
            <option value="Systèmes d'Information">Systèmes d'Information</option>
          </Form.Select>
        </Col>
      </Row>

      {/* 🔥 Cours affichés */}
      <Row className="g-4">
        {currentCourses.length > 0 ? (
          currentCourses.map((cours, index) => (
            <Col key={cours.id} xs={12} md={6} lg={4}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-100 shadow-sm border-0 card-hover">
                  <Card.Img variant="top" src={cours.image} style={{ height: '200px', objectFit: 'cover' }} />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{cours.titre}</Card.Title>
                    <Card.Text className="flex-grow-1">{cours.description}</Card.Text>
                    <Button
                      variant="success"
                      className="mt-auto btn-animated"
                      onClick={() => handleShowPurchaseForm(cours)} // Ouvrir le formulaire d'achat
                    >
                      acheter
                    </Button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))
        ) : (
          <p className="text-center">Aucun cours trouvé 😕</p>
        )}
      </Row>

      {/* 🔥 Pagination */}
      <div className="d-flex justify-content-center mt-4">
        {[...Array(totalPages)].map((_, idx) => (
          <Button
            key={idx}
            variant={currentPage === idx + 1 ? 'primary' : 'outline-primary'}
            onClick={() => handlePageChange(idx + 1)}
            className="mx-1"
          >
            {idx + 1}
          </Button>
        ))}
      </div>

      {/* 🔥 Modal Formulaire d'Achat */}
      <Modal show={showPurchaseForm} onHide={handleClosePurchaseForm} centered>
        <Modal.Header closeButton>
          <Modal.Title>Acheter le cours: {selectedCourse?.titre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PurchaseCourseForm selectedCourse={selectedCourse} /> {/* Passer les données du cours sélectionné au formulaire */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePurchaseForm}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MesCours;

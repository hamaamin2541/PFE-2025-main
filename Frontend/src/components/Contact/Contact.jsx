import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import SocialCardsCarousel from "./SocialCardsCarousel";
import FAQ from '../FAQ';
const Contact = () => {
  return (
    <Container className="py-5" style={{ background: "#f9f9f9" }}>
      <Row className="justify-content-center mb-4">
        <Col md={8} className="text-center">
          <h2 className="mb-3" style={{ color: "#2c3e50" }}>Contactez-nous</h2>
          <p className="text-muted">Nous sommes là pour répondre à vos questions et suggestions.</p>
          <div className="d-flex justify-content-center gap-3 mt-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-facebook" style={{ fontSize: "1.5rem", color: "#3b5998" }}></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-instagram" style={{ fontSize: "1.5rem", color: "#e4405f" }}></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-linkedin" style={{ fontSize: "1.5rem", color: "#0077b5" }}></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-twitter" style={{ fontSize: "1.5rem", color: "#1da1f2" }}></i>
            </a>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-4">
          <Card className="p-4 shadow rounded-4 border-0">
            <Form>
              <Form.Group className="mb-3" controlId="formNom">
                <Form.Label>Nom complet</Form.Label>
                <Form.Control type="text" placeholder="Votre nom" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Votre email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Écrivez votre message ici..." />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 rounded-pill">
                Envoyer
              </Button>
            </Form>
            <SocialCardsCarousel />
          </Card>
        </Col>

        <Col md={6} className="mb-4">
          <Card className="p-3 border-0 shadow rounded-4 h-100">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12769.302712004614!2d10.16579!3d36.81897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1302c94ebf4f91cf%3A0x9a837187e89e2ca6!2sTunis!5e0!3m2!1sfr!2stn!4v1713795079111!5m2!1sfr!2stn"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "1rem", minHeight: "350px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <Card className="p-4 shadow-sm rounded-4 border-0 bg-white">
            <h3 className="mb-3" style={{ color: "#2c3e50" }}>À propos de nous</h3>
            <p className="text-muted">
              Nous sommes une équipe passionnée par l'éducation et l'innovation. Notre mission est de rendre l'apprentissage accessible à tous, peu importe où ils se trouvent.
            </p>

            <h4 className="mt-4" style={{ color: "#2c3e50" }}>Notre histoire</h4>
            <p className="text-muted">
              Depuis notre lancement en 2025, nous avons aidé des centaines d'apprenants à atteindre leurs objectifs professionnels grâce à des cours de qualité, des outils interactifs, et une communauté engagée.
            </p>

            <h4 className="mt-4" style={{ color: "#2c3e50" }}>Nos valeurs</h4>
            <ul className="text-muted">
              <li>Accessibilité à l'éducation</li>
              <li>Qualité et innovation</li>
              <li>Communauté et entraide</li>
              <li>Transparence et confiance</li>
            </ul>
            <FAQ />  {/* FAQ ici */}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;

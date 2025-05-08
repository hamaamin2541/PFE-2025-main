import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, InputGroup, Form, Button } from 'react-bootstrap';
import { Search, Mail, Inbox, Send, Trash2, Star, Archive } from 'lucide-react';

const TeacherMessages = () => {
  const [activeFolder, setActiveFolder] = useState('inbox');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messages, setMessages] = useState({
    inbox: [],
    sent: [],
    trash: []
  });

  const handleSearch = (e) => {
    // Add search functionality
  };

  return (
    <Container fluid className="p-4">
      <Row style={{ height: 'calc(100vh - 100px)' }}>
        {/* Folders Sidebar */}
        <Col md={2} className="border-end">
          <div className="folders-sidebar">
            <h5 className="mb-3">Messages</h5>
            <ListGroup variant="flush">
              <ListGroup.Item 
                action 
                active={activeFolder === 'inbox'}
                onClick={() => setActiveFolder('inbox')}
              >
                <Inbox size={16} className="me-2" />
                Boîte de réception
              </ListGroup.Item>
              <ListGroup.Item 
                action 
                active={activeFolder === 'sent'}
                onClick={() => setActiveFolder('sent')}
              >
                <Send size={16} className="me-2" />
                Envoyés
              </ListGroup.Item>
              <ListGroup.Item 
                action 
                active={activeFolder === 'trash'}
                onClick={() => setActiveFolder('trash')}
              >
                <Trash2 size={16} className="me-2" />
                Corbeille
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Col>

        {/* Message List */}
        <Col md={3} className="border-end p-0">
          <div className="message-list">
            <div className="p-3 border-bottom">
              <InputGroup>
                <InputGroup.Text>
                  <Search size={16} />
                </InputGroup.Text>
                <Form.Control 
                  placeholder="Rechercher des messages..." 
                  onChange={handleSearch}
                />
              </InputGroup>
            </div>

            {messages[activeFolder].length === 0 ? (
              <div className="text-center p-4 text-muted">
                <Mail size={40} />
                <p className="mt-2">Aucun message</p>
              </div>
            ) : (
              <ListGroup variant="flush">
                {messages[activeFolder].map((message, index) => (
                  <ListGroup.Item
                    key={index}
                    action
                    active={selectedMessage?.id === message.id}
                    onClick={() => setSelectedMessage(message)}
                    className="border-bottom"
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="mb-1">{message.subject}</h6>
                        <small>{message.from}</small>
                      </div>
                      <small className="text-muted">{message.date}</small>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>
        </Col>

        {/* Message Content */}
        <Col md={7} className="p-0">
          {selectedMessage ? (
            <div className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4>{selectedMessage.subject}</h4>
                <div>
                  <Button variant="light" size="sm" className="me-2">
                    <Star size={16} />
                  </Button>
                  <Button variant="light" size="sm" className="me-2">
                    <Archive size={16} />
                  </Button>
                  <Button variant="light" size="sm">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
              <div className="message-content">
                {selectedMessage.content}
              </div>
            </div>
          ) : (
            <div className="text-center p-5 text-muted">
              <Mail size={48} />
              <h5 className="mt-3">Sélectionnez un message pour le lire</h5>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TeacherMessages;
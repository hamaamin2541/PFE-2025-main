// Messages.jsx
import React, { useState, useEffect } from 'react';
import './Messages.css';
import { Card, ListGroup, Form, InputGroup, Button, Badge } from 'react-bootstrap';
import { 
  Search, Mail, Send, Archive, AlertCircle, Star, Trash2 
} from 'lucide-react';

export const Messages = () => {
  const [activeFolder, setActiveFolder] = useState('inbox');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Get messages from student data or use empty array
    const studentData = JSON.parse(localStorage.getItem('studentData')) || {};
    setMessages(studentData.messages || []);
  }, []);

  const filteredMessages = messages.filter(msg => msg.folder === activeFolder);

  // Add unread messages count calculation
  const unreadCount = messages.filter(msg => msg.folder === 'inbox' && !msg.read).length;

  return (
    <div className="messages-container">
      <Card>
        <Card.Body className="p-0">
          <div className="d-flex" style={{ minHeight: '600px' }}>
            {/* Sidebar unique pour les dossiers */}
            <div className="sidebar message-folders">
              <Button variant="primary" className="w-100 rounded-0 mb-3">
                <Send size={16} className="me-2" />
                Nouveau message
              </Button>

              <ListGroup variant="flush">
                <ListGroup.Item 
                  action 
                  active={activeFolder === 'inbox'}
                  onClick={() => setActiveFolder('inbox')}
                >
                  <Mail size={16} className="me-2" />
                  Boîte de réception
                  {unreadCount > 0 && (
                    <Badge bg="primary" className="ms-2">{unreadCount}</Badge>
                  )}
                </ListGroup.Item>
                <ListGroup.Item 
                  action 
                  active={activeFolder === 'starred'}
                  onClick={() => setActiveFolder('starred')}
                >
                  <Star size={16} className="me-2" />
                  Favoris
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

            {/* Liste des messages */}
            <div className="message-list border-end" style={{ width: '350px' }}>
              <div className="p-3 border-bottom">
                <InputGroup>
                  <InputGroup.Text>
                    <Search size={16} />
                  </InputGroup.Text>
                  <Form.Control placeholder="Rechercher des messages..." />
                </InputGroup>
              </div>

              {messages.length === 0 ? (
                <div className="text-center p-4 text-muted">
                  <Mail size={40} />
                  <p className="mt-2">Votre boîte de réception est vide</p>
                </div>
              ) : (
                <ListGroup variant="flush">
                  {filteredMessages.map(message => (
                    <ListGroup.Item 
                      key={message.id}
                      action 
                      active={selectedMessage?.id === message.id}
                      onClick={() => setSelectedMessage(message)}
                      className={!message.read ? 'fw-bold' : ''}
                    >
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          {message.starred && <Star fill="#f4c150" size={14} className="me-1" />}
                          {message.from}
                        </div>
                        <small className="text-muted">{message.time}</small>
                      </div>
                      <div className="text-truncate">{message.subject}</div>
                      <div className="text-truncate text-muted small">{message.content}</div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </div>

            {/* Contenu du message sélectionné */}
            <div className="message-content flex-grow-1">
              {selectedMessage ? (
                <div className="p-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5>{selectedMessage.subject}</h5>
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

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center">
                      <div className="avatar me-2">
                        <img 
                          src="https://randomuser.me/api/portraits/men/32.jpg" 
                          alt="Avatar" 
                          className="rounded-circle"
                          width="40"
                          height="40"
                        />
                      </div>
                      <div>
                        <div>{selectedMessage.from}</div>
                        <small className="text-muted">À moi</small>
                      </div>
                    </div>
                    <small className="text-muted">{selectedMessage.time}</small>
                  </div>

                  <div className="message-body mb-4">
                    <p>{selectedMessage.content}</p>
                    <p>Cordialement,</p>
                    <p>Jean Dupont</p>
                  </div>

                  <div className="border-top pt-3">
                    <Button variant="primary" className="me-2">
                      <Send size={16} className="me-2" />
                      Répondre
                    </Button>
                    <Button variant="outline-secondary">
                      <AlertCircle size={16} className="me-2" />
                      Signaler
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="d-flex justify-content-center align-items-center h-100">
                  <div className="text-center text-muted">
                    <Mail size={48} className="mb-3" />
                    <h5>Sélectionnez un message pour le lire</h5>
                    <p>Ou composez un nouveau message</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Messages;

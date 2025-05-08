import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import ModalForm from './components/Auth/ModalConnexion';
import ChatBubble from './components/Chat/ChatBubble';
import Chatbot from './components/Chat/Chatbot';
import { StudentProvider } from './context/StudentContext';
import { FormationProvider } from './context/FormationContext';
import { TeacherProvider } from './context/TeacherContext';

// Pages d'authentification
import SeConnecter from './components/Auth/SeConnecter';
import Register from './components/Auth/Register';

// Pages publiques
import Accueil from './components/Accueil/Accueil';
import Contact from './components/Contact/Contact';
import FAQ from './components/FAQ';
import NotreContenu from './pages/NotreContenu';
import NosProfesseurs from './pages/NosProfesseurs';

// Tableaux de bord
import DashboardStudent from './pages/Students/DashboardStudent';
import DashboardTeacher from './pages/Teacher/DashboardTeacher';

// Pages étudiant
import MesCours from './pages/Students/MesCours';
import Tests from './pages/Students/Tests';
import Messages from './pages/Students/Messages';
import Parametres from './pages/Students/Parametres';

// Pages professeur
import TeacherMessages from './pages/Teacher/TeacherMessages';
import { TeacherAnalytics } from './pages/Teacher/TeacherAnalytics';
import AddCourse from './pages/Teacher/AddCourse';
import AddTextAdvice from './pages/Teacher/conseiltest/AddTextAdvice';
import AddVideoAdvice from './pages/Teacher/conseiltest/AddVideoAdvice';
import AddTest from './pages/Teacher/conseiltest/AddTest';
import EditCourse from './pages/Teacher/EditCourse';

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <StudentProvider>
      <FormationProvider>
        <TeacherProvider>
          <BrowserRouter>
            <div className="app-container">
              <Navbar onShowModal={handleShowModal} />
        
              <Routes>
                <Route path="/" element={<Navigate to="/Accueil" />} />
                <Route path="/Accueil" element={<Accueil onShowModal={handleShowModal} />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/NotreContenu" element={<NotreContenu />} />
                <Route path="/NosProfesseurs" element={<NosProfesseurs />} />
                <Route path="/SeConnecter" element={<SeConnecter onCloseModal={handleCloseModal} />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/dashboard-student" element={<DashboardStudent />} />
                <Route path="/dashboard-teacher" element={<DashboardTeacher />} />
                <Route path="/dashboard-teacher/edit-course/:id" element={<EditCourse />} />
                <Route path="*" element={<Navigate to="/Accueil" />} />
              </Routes>

              <ModalForm show={showModal} handleClose={handleCloseModal} />
              <Chatbot />
              <ChatBubble />
            </div>
          </BrowserRouter>
        </TeacherProvider>
      </FormationProvider>
    </StudentProvider>
  );
}

export default App;
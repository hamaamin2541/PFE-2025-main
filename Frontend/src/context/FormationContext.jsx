import React, { createContext, useContext, useState } from 'react';

const FormationContext = createContext();

export const FormationProvider = ({ children }) => {
  const [formations, setFormations] = useState([]);
  const [currentPage, setCurrentPage] = useState('overview');

  const updateFormations = async (studentId) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/students/${studentId}/formations`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setFormations(data);
    } catch (error) {
      console.error('Error fetching formations:', error);
    }
  };

  const navigateToPage = (pageName) => {
    setCurrentPage(pageName);
  };

  return (
    <FormationContext.Provider value={{ 
      formations, 
      updateFormations,
      currentPage,
      navigateToPage
    }}>
      {children}
    </FormationContext.Provider>
  );
};

export const useFormation = () => useContext(FormationContext);

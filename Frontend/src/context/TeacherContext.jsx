import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const TeacherContext = createContext();

export const TeacherProvider = ({ children }) => {
  const [teacherData, setTeacherData] = useState({
    fullName: '',
    profileImage: localStorage.getItem('teacherProfileImage') || '',
    rating: 0,
    role: 'teacher'
  });

  useEffect(() => {
    const fetchTeacherData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return;  // Don't fetch if no token
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/users/teacher-profile`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.data.success) {
          setTeacherData(prev => ({
            ...prev,
            ...response.data.data
          }));
          if (response.data.data.profileImage) {
            localStorage.setItem('teacherProfileImage', response.data.data.profileImage);
          }
        }
      } catch (error) {
        console.error('Error fetching teacher data:', error);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
        }
      }
    };

    fetchTeacherData();
  }, []);

  const updateTeacherData = (data) => {
    setTeacherData(prev => {
      const newData = { ...prev, ...data };
      if (data.profileImage) {
        localStorage.setItem('teacherProfileImage', data.profileImage);
      }
      return newData;
    });
  };

  return (
    <TeacherContext.Provider value={{ teacherData, updateTeacherData }}>
      {children}
    </TeacherContext.Provider>
  );
};

export const useTeacher = () => {
  const context = useContext(TeacherContext);
  if (!context) {
    throw new Error('useTeacher must be used within a TeacherProvider');
  }
  return context;
};

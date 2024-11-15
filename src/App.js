import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importing components
import MainPage from './MainPage'; 
import NursePage from './NursePage'; 
import JuniorDoctor from './JuniorDoctor';
import SeniorDoctorPage from './SeniorDoctorPage';
import SurveillanceForm from './SurveillanceForm'; 
import SurgeryForm from './SurgeryForm'; 
import AntibioticForm from './AntibioticForm'; 
import MicrobiologyForm from './MicrobiologyForm'; 
import EventDetailsForm from './EventDetailsForm';
import SSIEvaluationForm from './SSIEvaluationForm';
import LoginPage from './LoginPage'; // Import LoginPage component
import NotFound from './NotFound'; // Not Found Component

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(""); // Track the role of the user

  // This function is called when a user logs in
  const handleAuthentication = (isAuth, userRole) => {
    setIsAuthenticated(isAuth);
    setRole(userRole);
  };

  return (
    <Router>
      <Routes>
        {/* Main Page should be accessible without authentication */}
        <Route path="/" element={<MainPage />} />

        {/* Login Page Route */}
        <Route 
          path="/login" 
          element={<LoginPage setIsAuthenticated={handleAuthentication} />} 
        />

        {/* Authenticated Routes */}
        <Route 
          path="/nurse" 
          element={isAuthenticated && role === "nurse" ? <NursePage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/junior_doctor" 
          element={isAuthenticated && role === "junior_doctor" ? <JuniorDoctor /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/senior_doctor" 
          element={isAuthenticated && role === "senior_doctor" ? <SeniorDoctorPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/surveillance-form" 
          element={isAuthenticated ? <SurveillanceForm /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/surgery-form" 
          element={isAuthenticated ? <SurgeryForm /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/antibiotic-form" 
          element={isAuthenticated ? <AntibioticForm /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/microbiology-form" 
          element={isAuthenticated ? <MicrobiologyForm /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/event-details-form" 
          element={isAuthenticated ? <EventDetailsForm /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/ssi-evaluation" 
          element={isAuthenticated ? <SSIEvaluationForm /> : <Navigate to="/login" />} 
        />

        {/* Fallback Route for unknown pages */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

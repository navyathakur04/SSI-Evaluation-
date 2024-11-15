import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NursePage.css';
import logo from './logo.png'; // Ensure you have the logo.png in your project

const formOptions = [
  { path: '/surveillance-form', label: 'Administration Details' },
  { path: '/surgery-form', label: 'Surgery Details' },
  { path: '/antibiotic-form', label: 'Antibiotic Details' },
  { path: '/microbiology-form', label: 'Microbiology Details' },
  { path: '/event-details-form', label: 'Event Details' },
  { path: '/ssi-evaluation', label: 'SSI Evaluation' },
];

const NursePage = () => {
  const navigate = useNavigate();

  return (
    <div className="nurse-page">
      {/* Taskbar Section */}
      <div className="taskbar">
        <div className="logo-container">
          <img src={logo} alt="Nurse Portal Logo" className="logo" />
          <h1 className="hospital-name">Nurse Portal</h1>
        </div>
      </div>

      {/* Form Selection Section */}
      <div className="form-selection-container">
        {/* <h1 className="page-title">Fill Out Forms</h1> */}
        <p className="page-text">Select a form to fill out:</p>

        <div className="form-buttons">
          {formOptions.map((option) => (
            <button
              key={option.path}
              onClick={() => navigate(option.path)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NursePage;

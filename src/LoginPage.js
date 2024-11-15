import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoginPage.css';
import logo from './logo.png';
import image4 from './image4.png';

const departments = [
  'Cardiothoracic Surgery', 'Internal Medicine', 'Anesthesia', 'Cardiology',
  'Hemato-Oncology & Bone Marrow Transplant', 'Liver Transplant & Surgical Gastroenterology',
  'Oncology', 'GI & Hepato-Pancreatico-Biliary Surgery', 'Critical Care',
  'Pulmonary Medicine & Critical Care', 'Radiodiagnosis & Imaging', 'Nephrology',
  'Urology & Renal Transplant', 'Plastic & Aesthetic Surgery', 'Gastroenterology',
  'Orthopedics & Joint Replacement', 'NeuroSciences', 'Pediatric', 'Laboratory Medicine',
  'Endocrinology', 'General & Minimally Access Surgery', 'Obstetrics & Gynaecology',
  'Dental Department', 'Nuclear Medicine', 'Dermatology', 'Rheumatology', 'IVF & Reproductive Medicine',
  'Orthopedic Spine', 'Onco Surgery', 'Medical Services', 'Ophthalmology', 'ENT',
  'Respiratory, Critical Care & Sleep Medicine', 'Behavioral Sciences'
];

const LoginPage = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [phone_number, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [newUserDetails, setNewUserDetails] = useState({
    name: '',
    email: '',
    gender: '',
    department: '',
    phone_number: '',
    role: '',
    date_of_birth: ''
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { role: selectedRole } = location.state || {};

  useEffect(() => {
    if (selectedRole) {
      setNewUserDetails((prevDetails) => ({ ...prevDetails, role: selectedRole }));
    }
  }, [selectedRole]);

  const handleLogin = () => {
    setIsAuthenticated(true, selectedRole);

    if (selectedRole) {
      navigate(`/${selectedRole.replace(' ', '_')}`);
    } else {
      navigate('/');
    }
  };

  const handleRegister = () => {
    setIsAuthenticated(true, newUserDetails.role);

    if (newUserDetails.role) {
      navigate(`/${newUserDetails.role.replace(' ', '_')}`);
    } else {
      navigate('/');
    }
  };

  const handleSendOtp = () => {
    alert('OTP has been sent!');
    setShowOtpBox(true);
  };

  const handleResendOtp = () => {
    alert('OTP has been resent!');
  };

  const handleVerifyOtp = () => {
    alert('OTP Verified!');
  };

  return (
    <div className="login-page">
      <div className="side-panel">
        <img src={image4} alt="Hospital Illustration" className="side-image" />
      </div>
      <div className="form-container">
        <img src={logo} alt="Logo" className="logo" />
        <div className="toggle-buttons">
          <button onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>
            Login 
          </button>
          <button onClick={() => setIsLogin(false)} className={!isLogin ? 'active' : ''}>
            Register
          </button>
        </div>
        {isLogin ? (
          <div className="login-form">
            {/* <h2>Login</h2> */}
            <input
              type="text"
              placeholder="Phone Number"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button onClick={handleSendOtp}>Send OTP</button>

            {showOtpBox && (
              <>
                <input
                  type="text"
                  placeholder="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <div className="otp-actions">
                  <button onClick={handleResendOtp}>Resend OTP</button>
                  <button onClick={handleVerifyOtp}>Verify OTP</button>
                </div>
              </>
            )}
            <button onClick={handleLogin}>Login</button>
          </div>
        ) : (
          <div className="register-form">
            {/* <h2>Register</h2> */}
            <input
              type="text"
              placeholder="Name"
              value={newUserDetails.name}
              onChange={(e) => setNewUserDetails({ ...newUserDetails, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newUserDetails.email}
              onChange={(e) => setNewUserDetails({ ...newUserDetails, email: e.target.value })}
            />
            <select
              value={newUserDetails.gender}
              onChange={(e) => setNewUserDetails({ ...newUserDetails, gender: e.target.value })}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <select
              value={newUserDetails.department}
              onChange={(e) => setNewUserDetails({ ...newUserDetails, department: e.target.value })}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Phone Number"
              value={newUserDetails.phone_number}
              onChange={(e) => setNewUserDetails({ ...newUserDetails, phone_number: e.target.value })}
            />
            <label>Date of Birth :</label>
            <input
              type="date"
             
              value={newUserDetails.date_of_birth}
              onChange={(e) => setNewUserDetails({ ...newUserDetails, date_of_birth: e.target.value })}
            />
            <button onClick={handleRegister}>Register</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;

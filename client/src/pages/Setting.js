import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from "../AuthContext";

import "./setting.css";

function Setting() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    name: `${user.firstName} ${user.lastName}`,
    phone: user.phoneNumber || '',
    address: user.address || '',
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const localStorageData = JSON.parse(localStorage.getItem("user")); 

  useEffect(() => {
    setUserData({
      name: `${user.firstName} ${user.lastName}`,
      phone: user.phoneNumber || '',
      address: user.address || '',
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const changePassword = async () => {
    try {
      console.log('Old Password:', userData.password);
      console.log('New Password:', userData.newPassword);
      console.log('Confirm New Password:', userData.confirmNewPassword);
  
      if (
        localStorageData &&
        localStorageData.password === userData.password &&
        userData.newPassword === userData.confirmNewPassword
      ) {
        // Update password in local storage
        localStorageData.password = userData.newPassword;
        console.log('Updated local storage:', localStorageData);
        localStorage.setItem("user", JSON.stringify(localStorageData));
  
        // Update password in MongoDB
        const response = await axios.put('/api/users/change-password', {
          userId: localStorageData.id,
          newPassword: userData.newPassword,
        });
        
        // Optionally, you can handle the response from the server
        console.log('Password updated successfully:', response.data);
      } else {
        setErrorMessage('Password change failed. Please check your inputs.');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      // Handle error here
      setErrorMessage('Password change failed. Please try again later.');
    }
  };
  
  
  return (
    <div className="setting-container">
      <h2 className="setting-title">User Settings</h2>
      <div className="menu-footer1">
        <div className="profile-section1">
          <img
            alt="Profile"
            src={localStorageData.imageUrl}
            className="profile-image1"
          />
          <div>
            <p>
              <strong>{user.firstName}</strong>
            </p>
          </div>
        </div>
      </div>
      <div className="setting-section">
        <div className="profile-info">
          <h3>Your Profile Information</h3>
          <label className="setting-label">Name:</label>
          <input
            type="text"
            name="name"
            value={localStorageData.firstName}
            onChange={handleInputChange}
          />
          <label className="setting-label">Phone:</label>
          <input
            type="text"
            name="phone"
            value={localStorageData.phoneNumber}
            onChange={handleInputChange}
            className="setting-input"
          />
          <label className="setting-label">Email:</label>
          <input
            type="text"
            name="email"
            value={localStorageData.email}
            onChange={handleInputChange}
            className="setting-input"
          />
        </div>
        <div className="change-password">
          <h3>Change Password</h3>
          <label className="setting-label">Old Password:</label>
          <input
            type="password"
            name="oldPassword"
            value={userData.oldPassword}
            onChange={handleInputChange}
            className="setting-input"
          />
          <label className="setting-label">New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={userData.newPassword}
            onChange={handleInputChange}
            className="setting-input"
          />
          <label className="setting-label">Confirm New Password:</label>
          <input
            type="password"
            name="confirmNewPassword"
            value={userData.confirmNewPassword}
            onChange={handleInputChange}
            className="setting-input"
          />
          <button onClick={changePassword} className="setting-button">Change Password</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default Setting;

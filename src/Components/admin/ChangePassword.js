import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.css';
const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/change-password', {
        currentPassword,
        newPassword,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error changing password');
    }
  };

  return (
    <div className="bg-dark text-light min-vh-100 bg-gradient-primary ">
      <div className="container py-5">
        <h2 className="text-center mb-4">Change Password</h2>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleChangePassword}>
              <div className="form-group">
                <label className="text-light">Current Password</label>
                <input
                  type="password"
                  className="form-control bg-dark text-light"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-light">New Password</label>
                <input
                  type="password"
                  className="form-control bg-dark text-light"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="text-light">Confirm New Password</label>
                <input
                  type="password"
                  className="form-control bg-dark text-light"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {message && <div className="alert alert-info mt-3">{message}</div>}
              <button type="submit" className="btn btn-primary mt-3 btn-block">Change Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

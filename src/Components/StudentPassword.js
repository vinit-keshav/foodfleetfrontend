import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ChangePassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const handleChangePassword = async (e) => {
        e.preventDefault();
      
        if (newPassword !== confirmPassword) {
          setError('New passwords do not match');
          return;
        }
      
        try {
          const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage
      
          const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/changePassword`, {
            newPassword
          }, {
            headers: {
              'Authorization': `Bearer ${token}` // Include the JWT token in the request headers
            },
            withCredentials: true
          });
      
          if (response.status === 200) {
            setSuccess('Password changed successfully');
            setError('');
          }
        } catch (error) {
          setError(error.response?.data?.message || 'Error changing password');
          setSuccess('');
        }
      };
    // const handleChangePassword = async (e) => {
    //     e.preventDefault();

    //     if (newPassword !== confirmPassword) {
    //         setError('New passwords do not match');
    //         return;
    //     }

    //     try {
    //         const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/changePassword`, {
    //             newPassword
    //         }, { withCredentials: true });

    //         if (response.status === 200) {
    //             setSuccess('Password changed successfully');
    //             setError('');
    //         }
    //     } catch (error) {
    //         setError(error.response?.data?.message || 'Error changing password');
    //         setSuccess('');
    //     }
    // };
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark">
             <div className="container p-4 rounded bg-secondary">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        {/* <div className="bg-dark text-white p-4 rounded"> */}
                            <h2 className="text-center">Change Password</h2>
                            <form onSubmit={handleChangePassword}>
                                <div className="form-group">
                                    <label htmlFor="newPassword">New Password</label>
                                    <input
                                        type="password"
                                        className="form-control bg-dark text-white"
                                        id="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm New Password</label>
                                    <input
                                        type="password"
                                        className="form-control bg-dark text-white"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
                                {success && <div className="alert alert-success">{success}</div>}
                                <button type="submit" className="btn btn-primary btn-block">Change Password</button>
                            </form>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ASignup.css'; // Custom styles
import svgFood from '../svgfood.svg'; // Ensure the path is correct

function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    instituteName: '',
    uniqueID: '' // Add uniqueID to the state
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'uniqueID' ? parseInt(value, 10) : value // Parse uniqueID as an integer
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/signupp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Signup successful!');
        alert("You have signed up successfully as an admin.")
        navigate('/login')
      } else {
        console.error('Signup failed:', response.statusText);
        alert("Email may already exist.")
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="signup-container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4" style={{ width: '100%', maxWidth: '500px' }}>
            <div className="text-center mb-4">
                <img src={svgFood} alt="Food" className="svg-rotate" style={{ width: '150px' }} />
                <h3 className="mt-2 font-italic font-cursive">FoodFleet</h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Organization Name:</label>
                    <input
                        type="text"
                        name="instituteName"
                        value={formData.instituteName}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Unique ID:</label>
                    <input
                        type="number" // Change input type to number
                        name="uniqueID"
                        value={formData.uniqueID}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Signup</button>
            </form>
            <div className="text-center mt-3">
                <div className="d-flex align-items-center">
                    <hr className="flex-grow-1" />
                    <span className="mx-2">OR</span>
                    <hr className="flex-grow-1" />
                </div>
                <Link to="/admin" className="btn btn-link text-decoration-none">Login</Link>
            </div>
        </div>
    </div>
);
}

export default Signup;
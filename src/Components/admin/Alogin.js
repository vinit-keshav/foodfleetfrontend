
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css'; // Custom styles
import svgFood from '../svgfood.svg'; // Assuming the SVG is named svgfood.svg
import LoadingSpinner from '../LoadingSpinner'; 


function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('adminUniqueID', data.uniqueID);
        console.log('Login successful!');
        // Use data.firstName and data.rollNo from the response
        navigate('/ahome', { state: { id: data.firstName, rollNo: data.rollNo } });
      } else {
        console.error('Login failed:', response.statusText);
        alert("Invalid login or password")
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
    finally {
      setIsLoading(false); // Hide loading spinner
  }
  };

  return (
    <div className="login-container1 d-flex justify-content-center align-items-center vh-100">
         {isLoading && <LoadingSpinner />} {/* Show loading spinner if loading */}
         <div className={`card p-4 ${isLoading ? 'd-none' : ''}`} style={{ width: '100%', maxWidth: '400px' }}>
            <div className="text-center mb-4">
                <img src={svgFood} alt="Food" className="svg-rotate" style={{ width: '150px' }} />
                <h3 className="mt-2 font-italic font-cursive">FoodFleet</h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
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
                <div className="form-group">
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
                <button type="submit" className="btn btn-primary btn-block">Login</button>
            </form>
            <div className="text-center mt-3">
                <div className="d-flex align-items-center">
                    <hr className="flex-grow-1" />
                    <span className="mx-2">OR</span>
                    <hr className="flex-grow-1" />
                </div>
                <Link to="/signupp" className="btn btn-link text-decoration-none">Signup</Link>
            </div>
        </div>
    </div>
);
}

export default LoginForm;
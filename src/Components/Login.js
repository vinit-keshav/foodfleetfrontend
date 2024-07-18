
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from './LoadingSpinner'; 
import "./Login.css"; // Import CSS file for custom styles
import svgfood1 from './svgfood.svg';

axios.defaults.withCredentials = true;

function Login() {
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
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/`, formData);
            
            console.log('Response from server:', response.data); // Log the entire response data
    
            if (response.data.status === "success") {
                console.log('User data:', response.data.user);
    
                const token = response.data.token; // Assuming token is directly in response.data
                console.log('Token received and stored after login:', token);
    
                // Store JWT token in localStorage
                localStorage.setItem('token', token);
    
                const { firstName, rollNo } = response.data.user;
                navigate('/home', { state: { id: firstName, rollNo } });
            } else {
                console.error('Login failed:', response.data.message);
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("An error occurred while logging in. Please try again.");
        }
        finally {
            setIsLoading(false); // Hide loading spinner
        }
    };
    
    
    const [showModal, setShowModal] = useState(false);
    
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <div className="container-fluid login-container d-flex justify-content-center align-items-center vh-100">
             {isLoading && <LoadingSpinner />} {/* Show loading spinner if loading */}
             <div className={`card p-4 login-form-container col-12 col-md-10 col-lg-8 ${isLoading ? 'd-none' : ''}`}>
            {/* <div className="card p-4 login-form-container col-12 col-md-10 col-lg-8"> */}
                <div className="text-center mb-4">
                    <img src={svgfood1} alt="Food" className="svg-rotate" style={{ width: '150px' }} />
                    <h3 className="mt-2 font-italic font-cursive">FoodFleet</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
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
                    <Link to="/signup" className="btn btn-link text-decoration-none">Sign Up</Link>
                    <Link to="/admin" className="btn btn-link text-decoration-none">Admin</Link>
                </div>
                <div className="text-center mt-3">
                    <button onClick={handleShow} className="btn btn-link text-decoration-none">Know FoodFleet?</button>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">About FoodFleet</h5>
                                <button type="button" className="close" onClick={handleClose} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Food Fleet is an innovative app designed for organizations, allowing users to sign up and place food orders using their unique organization ID. Key features include:</p>
                                <ul>
                                    <li><strong>User Signup and Order:</strong> Individuals can sign up with their organization's unique ID and order food without payment. Order details are automatically sent to the organization's admin.</li>
                                    <li><strong>Admin Features:</strong> Admins, identified by the same unique ID, can view order history along with user information and order amounts. They also have the capability to add new menu items, which are visible only to members of their organization, and manage organization members by adding new users.</li>
                                    <li><strong>Food Guessing Game:</strong> Users can engage in a fun food guessing game within the app.</li>
                                </ul>
                                <p>Food Fleet simplifies food ordering for organizations by centralizing menu management, order tracking, and user engagement in a seamless, payment-free environment.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;

// const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/`, formData);
        
//         if (response.data.status === "success") {
//             console.log(response.data.user)
//             const { firstName, rollNo } = response.data.user;
//             navigate('/home', { state: { id: firstName, rollNo } });
//         }
        
//         else {
//             alert(response.data.message);
//         }
//     } catch (error) {
//         console.error("Error logging in:", error);
//         alert("An error occurred while logging in. Please try again.");
//     }
// };
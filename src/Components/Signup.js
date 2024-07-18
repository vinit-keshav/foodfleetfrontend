
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; // Custom CSS for additional styles
import "bootstrap/dist/css/bootstrap.min.css";
import svgFood1 from './svgfood.svg';

function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        rollNo: '',
        email: '',
        password: '',
        instituteName: '',
        uniqueID: '' // Add uniqueID to the state
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup`, formData);
            if (response.status === 201) {
                // navigate('/home', { state: { id: formData.firstName, rollNo: formData.rollNo } });
                alert("You have signed up successfully.");
                navigate('/');
            } else {
                alert("Error occurred while signing up. The UniqueID or Email may already exist.");
            }
        } catch (error) {
            console.error("Error signing up:", error);
            alert("Error occurred while signing up");
        }
    };

    return (
        <div className="container-fluid login-container d-flex justify-content-center align-items-center vh-100" style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="card p-4 shadow-lg col-12 col-md-8 col-lg-6 col-xl-4">
                <div className="text-center mb-4">
                    <img src={svgFood1} alt="Food" className="svg-rotate" style={{ width: '100px' }} />
                    <h3 className="mt-2 font-italic font-cursive">FoodFleet</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            name="rollNo"
                            value={formData.rollNo}
                            onChange={handleChange}
                            placeholder="ID Number"
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            name="instituteName"
                            value={formData.instituteName}
                            onChange={handleChange}
                            placeholder="Organization Name"
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
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
                    <div className="form-group mb-3">
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
                    <div className="form-group mb-3">
                        <input
                            type="number"
                            name="uniqueID"
                            value={formData.uniqueID}
                            onChange={handleChange}
                            placeholder="Unique ID"
                            className="form-control"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mx-auto d-block">Signup</button>
                </form>
                <div className="text-center mt-3">
                    <div className="d-flex align-items-center">
                        <hr className="flex-grow-1" />
                        <span className="mx-2">OR</span>
                        <hr className="flex-grow-1" />
                    </div>
                    <Link to="/" className="btn btn-link text-decoration-none">Login</Link>
                    <Link to="/admin" className="btn btn-link text-decoration-none">Admin</Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;

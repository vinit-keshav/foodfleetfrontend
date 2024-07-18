


import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faUser, faMoneyBill, faQuestionCircle, faGamepad } from '@fortawesome/free-solid-svg-icons';
import FoodGuessingGame from './FoodGuessingGame';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import './FoodGuess.css';

export default function Home() {
    const location = useLocation();
    const navigate = useNavigate();
    const [showGame, setShowGame] = useState(false);
    const [foodIdea, setFoodIdea] = useState('');
    const { id, rollNo } = location.state || {};

    useEffect(() => {
        fetchFoodIdea();
    }, []);

    const fetchFoodIdea = async () => {
        try {
            const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;
            const response = await fetch(`https://api.spoonacular.com/food/jokes/random?apiKey=${apiKey}`);
            const data = await response.json();
            setFoodIdea(data.text);
        } catch (error) {
            console.error('Error fetching food idea:', error);
        }
    };
    const handleSignOut = async () => {
        try {
          const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage
      
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/signout`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}` // Include the JWT token in the request headers
            },
            credentials: 'include'
          });
      
          const data = await response.json();
          
          if (data.status === 'success') {
            localStorage.removeItem('token'); // Remove the token from local storage on sign out
            navigate('/');
          } else {
            console.error('Failed to sign out:', data.message);
          }
        } catch (error) {
          console.error('Error signing out:', error);
        }
      };
      
    // const handleSignOut = async () => {
    //     try {
    //         const response = await fetch('/signout', {
    //             method: 'GET',
    //             credentials: 'include'
    //         });
    //         const data = await response.json();
            
    //         if (data.status === 'success') {
    //             navigate('/');
    //         } else {
    //             console.error('Failed to sign out:', data.message);
    //         }
    //     } catch (error) {
    //         console.error('Error signing out:', error);
    //     }
    // };

    const handlePlayGameClick = () => {
        setShowGame(true);
    };

    const handleQuitGameClick = () => {
        setShowGame(false);
    };

    return (
        <>
            <div className="container-fluid min-vh-100 d-flex p-0 position-relative" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/useme.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className={`row flex-fill ${showGame ? 'blurred' : ''}`}>
                    <div className="col-lg-6 col-md-6 col-sm-12 d-flex flex-column justify-content-center align-items-start text-white p-5">
                        <div className="welcome-message">
                            <h1 className="mb-4 text-white">{id ? `Hi, ${id}` : 'Welcome, Guest'}</h1>
                            <div className="food-idea-container">
                                <p className="food-idea-text">{foodIdea ? foodIdea : 'Loading stuff...'}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 d-flex flex-column justify-content-center align-items-center text-white p-5">
                        <div className="container">
                            <div className="row g-3">
                                <div className="col-6">
                                    <Link to="/Order" className="d-block p-4 bg-success text-white text-center rounded-circle transform transition-transform text-decoration-none">
                                        <FontAwesomeIcon icon={faMoneyBill} className="mb-2" size="2x" />
                                        <span className="d-block">Order</span>
                                    </Link>
                                </div>
                                <div className="col-6">
                                    <Link to="/ri" className="d-block p-4 bg-warning text-white text-center rounded-circle transform transition-transform text-decoration-none">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="mb-2" size="2x" />
                                        <span className="d-block">Request Item</span>
                                    </Link>
                                </div>
                                <div className="col-6">
                                    <div onClick={handlePlayGameClick} className="d-block p-4 bg-danger text-white text-center rounded-circle transform transition-transform text-decoration-none">
                                        <FontAwesomeIcon icon={faGamepad} className="mb-2" size="2x" />
                                        <span className="d-block">Guess It</span>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <Link to="/sp" className="d-block p-4 bg-primary text-white text-center rounded-circle transform transition-transform text-decoration-none">
                                        <FontAwesomeIcon icon={faUser} className="mb-2" size="2x" />
                                        <span className="d-block">Change Password</span>
                                    </Link>
                                </div>
                            </div>
                            <button className="btn btn-danger mt-4 w-100" onClick={handleSignOut}>Sign Out</button>
                        </div>
                    </div>
                </div>
                {showGame && (
                    <div className="game-overlay position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75">
                        <div className="game-container p-4 bg-light rounded">
                            <button className="btn btn-danger mb-3" onClick={handleQuitGameClick}>Quit Playing</button>
                            <FoodGuessingGame />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

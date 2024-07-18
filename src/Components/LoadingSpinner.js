// src/components/LoadingSpinner.js
import React from 'react';
import './LoadingSpinner.css'; // CSS for the spinner

const LoadingSpinner = () => (
    <div className="loading-spinner">
        <img src="/Fleet.png" alt="Loading..." className="spinner-image" />
    </div>
);

export default LoadingSpinner;


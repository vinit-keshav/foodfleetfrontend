

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css';
const AdminItemRequests = () => {
  const [itemRequests, setItemRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItemRequests = async () => {
      try {
        const adminUniqueID = localStorage.getItem('adminUniqueID');
        if (!adminUniqueID) {
          console.error('Admin uniqueID not found in local storage');
          return;
        }

        console.log('Retrieved adminUniqueID:', adminUniqueID); // Log the uniqueID

        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/item-requests?uniqueID=${adminUniqueID}`);

        setItemRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching item requests:', error);
        setLoading(false);
      }
    };

    fetchItemRequests();
  }, []);
  return (
    <div className="bg-dark text-light min-vh-100 bg-gradient-primary ">
      <div className="container mt-5 p-4 rounded">
        <h2 className="mb-4">Item Requests</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {itemRequests.length === 0 ? (
              <p>No item requests found</p>
            ) : (
              <ul className="list-group">
                {itemRequests.map((request) => (
                  <li key={request._id} className="list-group-item bg-dark text-light border-light mb-3">
                    <strong>Student Name: </strong> {request.firstName} {request.lastName} <br />
                    <strong>Roll No: </strong> {request.rollNo} <br />
                    <strong>Meal Type: </strong> {request.mealType} <br />
                    <strong>Item Name: </strong> {request.itemName} <br />
                    <strong>Request Date: </strong> {new Date(request.requestDate).toLocaleString()} <br />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminItemRequests;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css';
const StudentOrderManagement = () => {
  const [rollNo, setRollNo] = useState('');
  const [totalPrice, setTotalPrice] = useState(null);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [amountToSubtract, setAmountToSubtract] = useState({}); // State to manage subtraction amounts

  useEffect(() => {
    const fetchStudents = async () => {
      setError(null);
      const uniqueID = localStorage.getItem('adminUniqueID');

      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/student-orders`, {
          params: { uniqueID }
        });
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching student orders:', error);
        setError(error.response ? error.response.data.message : 'Internal server error');
      }
    };

    fetchStudents();
  }, []);

  const handleInputChange = (e) => {
    setRollNo(e.target.value);
  };

  const handleAmountChange = (e, id) => {
    setAmountToSubtract({ ...amountToSubtract, [id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setTotalPrice(null);
    const uniqueID = localStorage.getItem('adminUniqueID');

    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/student-order`, {
        params: {
          rollNo,
          uniqueID
        }
      });
      setTotalPrice(response.data.totalPrice);
    } catch (error) {
      console.error('Error fetching student order total:', error);
      setError(error.response ? error.response.data.message : 'Internal server error');
    }
  };

  const handleSubtract = async (id, rollNo, amount) => {
    const uniqueID = localStorage.getItem('adminUniqueID');

    try {
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/student-order/subtract`, {
        rollNo,
        uniqueID,
        amountToSubtract: Number(amount)
      });
      const updatedStudents = students.map(student => 
        student._id === id ? { ...student, totalPrice: response.data.totalPrice } : student
      );
      setStudents(updatedStudents);
    } catch (error) {
      console.error('Error updating total price:', error);
      setError(error.response ? error.response.data.message : 'Internal server error');
    }
  };
  return (
    <div className="container mt-5 text-light bg-dark p-4 rounded bg-gradient-primary ">
      <h2 className="mb-4">Fetch Orders</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Roll No</label>
          <input
            type="text"
            className="form-control bg-secondary text-light"
            name="rollNo"
            value={rollNo}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Fetch Total Price</button>
      </form>
      {totalPrice !== null && (
        <div className="mt-4">
          <h4>Total Price: {totalPrice}</h4>
        </div>
      )}
      {error && (
        <div className="mt-4 text-danger">
          <h4>Error: {error}</h4>
        </div>
      )}

      <h3 className="mt-5">Student Orders</h3>
      {students.length > 0 ? (
        <ul className="list-group">
          {students.map((student) => (
            <li key={student._id} className="list-group-item bg-secondary text-light mb-2">
              <h5>{student.firstName} {student.lastName}</h5>
              <p>Roll No: {student.rollNo}</p>
              <p>Total Price: {student.totalPrice}</p>
              <p>Unique ID: {student.uniqueID}</p>
              <p>Orders: {JSON.stringify(student.orders)}</p>
              <div className="form-group">
                <label>Amount to Subtract</label>
                <input
                  type="number"
                  className="form-control bg-dark text-light"
                  value={amountToSubtract[student._id] || ''}
                  onChange={(e) => handleAmountChange(e, student._id)}
                />
                <button
                  className="btn btn-danger mt-2"
                  onClick={() => handleSubtract(student._id, student.rollNo, amountToSubtract[student._id])}
                >
                  Subtract
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No student orders found.</p>
      )}
    </div>
  );
};
export default StudentOrderManagement;
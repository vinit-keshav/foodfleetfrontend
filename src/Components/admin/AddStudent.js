

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css';
const AdminStudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    rollNo: '',
    instituteName: '',
    email: '',
    password: '',
    uniqueID: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [adminUniqueID, setAdminUniqueID] = useState(null);

  useEffect(() => {
    fetchAdminUniqueID();
  }, []);

  const fetchAdminUniqueID = async () => {
    try {
      const uniqueID = localStorage.getItem('adminUniqueID');
      if (uniqueID) {
        setAdminUniqueID(uniqueID);
        fetchStudents(uniqueID);
      } else {
        console.error('Admin uniqueID not found in local storage');
      }
    } catch (error) {
      console.error('Error fetching admin uniqueID:', error);
    }
  };

  const fetchStudents = async (uniqueID) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/students?uniqueID=${uniqueID}`);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'uniqueID' ? Number(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = { ...formData, uniqueID: adminUniqueID };
    if (editMode) {
      try {
        await axios.put(`${process.env.REACT_APP_BASE_URL}/students/${editId}`, updatedFormData);
        fetchStudents(adminUniqueID);
        setEditMode(false);
        setEditId(null);
      } catch (error) {
        console.error('Error updating student:', error);
      }
    } else {
      try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/signup`, updatedFormData);
        fetchStudents(adminUniqueID);
      } catch (error) {
        console.error('Error adding student:', error);
      }
    }
    setFormData({
      firstName: '',
      lastName: '',
      rollNo: '',
      instituteName: '',
      email: '',
      password: '',
      uniqueID: ''
    });
  };

  const handleEdit = (student) => {
    setFormData({ ...student, uniqueID: student.uniqueID });
    setEditMode(true);
    setEditId(student._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/students/${id}?uniqueID=${adminUniqueID}`);
      fetchStudents(adminUniqueID);
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="container mt-5 bg-dark text-light bg-gradient-primary ">
      <h2 className="mb-4">Manage People</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Roll No</label>
            <input
              type="text"
              className="form-control"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Institute Name</label>
            <input
              type="text"
              className="form-control"
              name="instituteName"
              value={formData.instituteName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Unique ID</label>
            <input
              type="text"
              className="form-control"
              name="uniqueID"
              value={formData.uniqueID}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <button type="submit" className="btn btn-primary">
              {editMode ? 'Update Student' : 'Add Student'}
            </button>
          </div>
        </div>
      </form>

      <h3 className="mt-5">People List</h3>
      <div className="table-responsive">
        <table className="table table-dark">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Roll No</th>
              <th>Institute Name</th>
              <th>Email</th>
              <th>Unique ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student._id}>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.rollNo}</td>
                  <td>{student.instituteName}</td>
                  <td>{student.email}</td>
                  <td>{student.uniqueID}</td>
                  <td>
                    <button className="btn btn-warning me-2" onClick={() => handleEdit(student)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(student._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminStudentManagement;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css';
const AddMenuItem = () => {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [availableQuantity, setAvailableQuantity] = useState('');
  const [error, setError] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const uniqueID = localStorage.getItem('adminUniqueID');

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/menu-items/${uniqueID}`);
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      setError('Error fetching menu items');
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        // Update the menu item
        await axios.put(`${process.env.REACT_APP_BASE_URL}/menu-items/${editingItem._id}`, {
          itemName,
          price: Number(price),
          availableQuantity: Number(availableQuantity),
        });
        setEditingItem(null);
      } else {
        // Add a new menu item
        await axios.post(`${process.env.REACT_APP_BASE_URL}/menu-items`, {
          itemName,
          price: Number(price),
          availableQuantity: Number(availableQuantity),
          uniqueID
        });
      }
      setItemName('');
      setPrice('');
      setAvailableQuantity('');
      fetchMenuItems();
    } catch (error) {
      console.error('Error adding/updating menu item:', error);
      setError(error.response ? error.response.data.message : 'Internal server error');
    }
  };
  
  const handleEdit = (item) => {
    setItemName(item.itemName);
    setPrice(item.price);
    setAvailableQuantity(item.availableQuantity);
    setEditingItem(item);
  };
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/menu-items/${id}`);
      fetchMenuItems();
    } catch (error) {
      console.error('Error deleting menu item:', error);
      setError('Error deleting menu item');
    }
  };
  

  return (
    <div className="container mt-5 text-light bg-dark p-4 rounded bg-gradient-primary ">
      <h2 className="mb-4">Add Menu Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="itemName" className="form-label">Item Name:</label>
          <input
            type="text"
            id="itemName"
            className="form-control bg-secondary text-light"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price:</label>
          <input
            type="number"
            id="price"
            className="form-control bg-secondary text-light"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="availableQuantity" className="form-label">Available Quantity:</label>
          <input
            type="number"
            id="availableQuantity"
            className="form-control bg-secondary text-light"
            value={availableQuantity}
            onChange={(e) => setAvailableQuantity(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingItem ? 'Update Item' : 'Add Item'}
        </button>
      </form>
      {error && <p className="mt-3 text-danger">Error: {error}</p>}

      <div className="mt-5">
        <h2 className="mb-4">Menu Items</h2>
        <div className="list-group">
          {menuItems.map(item => (
            <div key={item._id} className="list-group-item d-flex justify-content-between align-items-center mb-3">
              <div>
                <strong>{item.itemName}</strong> - Price: Rs.{item.price} - Available Quantity: {item.availableQuantity}
              </div>
              <div>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(item)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddMenuItem;
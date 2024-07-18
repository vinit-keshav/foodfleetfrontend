

import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Order.css';
axios.defaults.withCredentials = true;

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    rollNo: '',
    uniqueID: ''
  });
  const [menuItems, setMenuItems] = useState([]);
  const [message, setMessage] = useState('');
  useEffect(() => {
    async function fetchUserDetails() {
      try {
        
        const token = localStorage.getItem('token');
console.log('Token in order:', token); // Log token to verify its value

        if (!token) {
          console.log('Token not found. Redirecting to login...');
          window.location.href = '/login'; // Redirect to login if token not found
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };
console.log('Authorization header:', headers);

const url = `${process.env.REACT_APP_BASE_URL}/getUserDetails`;
const response = await axios.get(url, { headers });

console.log('Response from server:', response.data);
        setUserDetails(response.data);

        // Fetch menu items based on user's uniqueID
        const menuResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/getMenuItems/${response.data.uniqueID}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // setMenuItems(menuResponse.data);
        if (menuResponse.data.length === 0) {
          setMessage('Either the admin has not added you or there are no items to order.');
        } else {
          setMenuItems(menuResponse.data);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        alert('Error fetching user details: ' + error.message);
      }
    }
    
    fetchUserDetails();
  }, []);
  
    // useEffect(() => {
    //   // Fetch the user details from the backend or local storage
    //   async function fetchUserDetails() {
    //     try {
    //       const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/getUserDetails`, { withCredentials: true });
    //       setUserDetails(response.data);
  
    //       // Fetch menu items based on user's uniqueID
    //       const menuResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/getMenuItems/${response.data.uniqueID}`, { withCredentials: true });
    //       setMenuItems(menuResponse.data);
    //     } catch (error) {
    //       console.error('Error fetching user details:', error);
    //       alert('Error fetching user details: ' + error.message);
    //     }
    //   }
  
    //   fetchUserDetails();
    // }, []);


  const handleOrder = (itemName, price) => {
    const existingOrderIndex = orders.findIndex(order => order.name === itemName);

    if (existingOrderIndex !== -1) {
      const updatedOrders = [...orders];
      updatedOrders[existingOrderIndex].quantity += 1;
      setOrders(updatedOrders);
    } else {
      const newOrder = { name: itemName, price, quantity: 1 };
      setOrders([...orders, newOrder]);
    }

    setTotalPrice(totalPrice + price);

    // Update available quantity in the local menuItems state
    const updatedMenuItems = menuItems.map(item => {
      if (item.itemName === itemName && item.availableQuantity > 0) {
        return {
          ...item,
          availableQuantity: item.availableQuantity - 1
        };
      }
      return item;
    });

    setMenuItems(updatedMenuItems);
  };

  const handleRemoveFromOrder = (itemName, price) => {
    const existingOrderIndex = orders.findIndex(order => order.name === itemName);

    if (existingOrderIndex !== -1) {
      const updatedOrders = [...orders];
      const order = updatedOrders[existingOrderIndex];

      if (order.quantity === 1) {
        updatedOrders.splice(existingOrderIndex, 1);
      } else {
        order.quantity -= 1;
      }

      setOrders(updatedOrders);
      setTotalPrice(totalPrice - price);

      // Optionally: Increase available quantity in the local menuItems state
      const updatedMenuItems = menuItems.map(item => {
        if (item.itemName === itemName) {
          return {
            ...item,
            availableQuantity: item.availableQuantity + 1
          };
        }
        return item;
      });

      setMenuItems(updatedMenuItems);
    }
  };

  const generatePDF = async () => {
    const pdf = new jsPDF();
    const dateTime = new Date().toLocaleString();

    let html = `
      <h2>Order Summary - ${dateTime}</h2>
      <p><strong>Name:</strong> ${userDetails.firstName} ${userDetails.lastName}</p>
      <p><strong>Roll No:</strong> ${userDetails.rollNo}</p>
      <table class="table table-dark">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
    `;

    let totalAmount = 0;
    orders.forEach(order => {
      const totalItemPrice = order.price * order.quantity;
      totalAmount += totalItemPrice;
      html += `<tr><td>${order.name}</td><td>${order.price}</td><td>${order.quantity}</td><td>${totalItemPrice}</td></tr>`;
    });

    html += `</tbody></table>`;
    html += `<p>Total Amount: Rs.${totalAmount}</p>`;

    pdf.html(html, {
      callback: async function (pdf) {
        pdf.save('bill.pdf');
        const orderData = {
          orders,
          totalPrice: totalAmount
        };

        console.log('Sending order data:', orderData);

        try {
          const token = localStorage.getItem('token'); // Adjust the key name based on how you store the token

        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/saveOrder`,
          orderData,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            withCredentials: true
          }
        );
          // const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/saveOrder`, orderData, { withCredentials: true });
          if (response.status === 200 || response.status === 201) {
            alert('Order placed successfully');
            // console.log(token)
          } else {
            alert('Failed to place order');
          }
        } catch (error) {
          console.error('Error placing order:', error);
          alert('Error placing order: ' + error.message);
        }
      },
      x: 10,
      y: 10,
      html2canvas: { scale: 0.5 }
    });
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/useme.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="content-wrapper d-flex flex-column flex-md-row w-100">
        <div className="menu-items-container flex-grow-1">
          <div className="d-flex justify-content-start mb-4">
            <Link to="/home" className="btn btn-light" style={{ textDecoration: 'none' }}>
              Go Back To Home
            </Link>
          </div>
          <h2 className="text-white mb-4">Menu Items</h2>
          {message ? (
            <p className="text-white">{message}</p>
          ) : (
          <div className="row">
            {menuItems.map((item, index) => (
              <div className="col-md-6 mb-4" key={index}>
                <div className="card bg-dark text-white">
                  <div className="card-body text-center">
                    <h5 className="card-title">{item.itemName}</h5>
                    <p className="card-text">Price: {item.price}</p>
                    <p className="card-text">Available Quantity: {item.availableQuantity}</p>
                    <div className="d-flex justify-content-center mt-2">
                      <button className="btn btn-primary mr-2" onClick={() => handleOrder(item.itemName, item.price)}>
                        Add to Order
                      </button>
                      <button className="btn btn-danger" onClick={() => handleRemoveFromOrder(item.itemName, item.price)}>
                        Remove from Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
        <div className="order-summary bg-dark text-white p-3 ml-md-4 mt-4 mt-md-0">
          <h2 className="mb-4">Order Summary</h2>
          <ul className="list-group">
            {orders.map((order, index) => (
              <li className="list-group-item list-group-item-dark" key={index}>
                {order.name}: Rs.{order.price} x {order.quantity}
              </li>
            ))}
          </ul>
          <p className="mt-3">Total Price: Rs.{totalPrice}</p>
          <button className="btn btn-success" onClick={generatePDF}>
            Place Order & Generate Bill.
          </button>
        </div>
      </div>
    </div>
  );
}

// import React, { useState } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function RequestItem() {
//     const [mealType, setMealType] = useState('');
//     const [itemName, setItemName] = useState('');
//     const [success, setSuccess] = useState('');
//     const [error, setError] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage
        
//             const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/requestItem`, {
//               mealType,
//               itemName
//             }, {
//               headers: {
//                 'Authorization': `Bearer ${token}` // Include the JWT token in the request headers
//               },
//               withCredentials: true
//             });
        
//             if (response.status === 201) {
//               setSuccess('Item request submitted successfully');
//               setError('');
//               setMealType('');
//               setItemName('');
//             }
//           } catch (error) {
//             setError(error.response?.data?.message || 'Error submitting item request');
//             setSuccess('');
//           }
//         };
//     return (
//         <div style={{ backgroundColor: 'black', minHeight: '100vh', padding: '20px' }}>
//             <div className="container mt-5">
//                 <div className="bg-dark text-white p-4 rounded">
//                     <h2 className="text-center">Request an Item</h2>
//                     <form onSubmit={handleSubmit}>
//                         <div className="form-group">
//                             <label htmlFor="mealType">Meal Type</label>
//                             <select
//                                 className="form-control bg-dark text-white"
//                                 id="mealType"
//                                 value={mealType}
//                                 onChange={(e) => setMealType(e.target.value)}
//                                 required
//                             >
//                                 <option value="">Select Meal Type</option>
//                                 <option value="breakfast">Breakfast</option>
//                                 <option value="lunch">Lunch</option>
//                                 <option value="dinner">Dinner</option>
//                                 <option value="supper">Supper</option>
//                             </select>
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="itemName">Item Name</label>
//                             <input
//                                 type="text"
//                                 className="form-control bg-dark text-white"
//                                 id="itemName"
//                                 value={itemName}
//                                 onChange={(e) => setItemName(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         {error && <div className="alert alert-danger">{error}</div>}
//                         {success && <div className="alert alert-success">{success}</div>}
//                         <button type="submit" className="btn btn-primary btn-block">Submit Request</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RequestItem() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [uniqueID, setUniqueID] = useState('');
    const [mealType, setMealType] = useState('');
    const [itemName, setItemName] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/requestItem`, {
                firstName,
                lastName,
                rollNo,
                uniqueID,
                mealType,
                itemName
            });

            if (response.status === 201) {
                setSuccess('Item request submitted successfully');
                setError('');
                setFirstName('');
                setLastName('');
                setRollNo('');
                setUniqueID('');
                setMealType('');
                setItemName('');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error submitting item request');
            setSuccess('');
        }
    };

    return (
        <div style={{ backgroundColor: 'black', minHeight: '100vh', padding: '20px' }}>
            <div className="container mt-5">
                <div className="bg-dark text-white p-4 rounded">
                    <h2 className="text-center">Request an Item</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rollNo">ID No</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white"
                                id="rollNo"
                                value={rollNo}
                                onChange={(e) => setRollNo(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="uniqueID">Unique ID</label>
                            <input
                                type="number"
                                className="form-control bg-dark text-white"
                                id="uniqueID"
                                value={uniqueID}
                                onChange={(e) => setUniqueID(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mealType">Meal Type</label>
                            <select
                                className="form-control bg-dark text-white"
                                id="mealType"
                                value={mealType}
                                onChange={(e) => setMealType(e.target.value)}
                                required
                            >
                                <option value="">Select Meal Type</option>
                                <option value="breakfast">Breakfast</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                                <option value="supper">Supper</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="itemName">Item Name</label>
                            <input
                                type="text"
                                className="form-control bg-dark text-white"
                                id="itemName"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                                required
                            />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        {success && <div className="alert alert-success">{success}</div>}
                        <button type="submit" className="btn btn-primary btn-block">Submit Request</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

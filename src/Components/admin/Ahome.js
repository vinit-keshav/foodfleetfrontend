
// import React from 'react';
// import { useLocation, useNavigate, Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faMoneyBill, faQuestionCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import '../styles.css'; // Import your custom CSS file
// export default function Home() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { id } = location.state || {};

//     // Function to handle signout
//     const handleSignOut = () => {
//         // Clear any authentication tokens or session data
//         localStorage.removeItem('adminUniqueID'); // Assuming this is the token you set during login
    
//         // Redirect to login page
//         navigate('/login'); // Adjust this path to your login route
//       };

//       return (
//         <div className="container-fluid bg-adminhome text-white d-flex flex-column" style={{ minHeight: '100vh' }}>
//             <div className="row flex-grow-1">
//             <div className="col-12 col-md-3 d-flex align-items-center justify-content-center">
//             <div className="background-container"></div>
//       <div className="text-center d-flex align-items-center bg-dark text-white p-3 rounded">
//         <div>
//           <h1 className="display-4">{id ? `Hi, ${id}` : 'Welcome, Admin'}</h1>
//         </div>
//       </div>
//     </div>
//                 <div className="col-12 col-md-9 d-flex align-items-center justify-content-center">
//                     <div className="row w-100">
//                         <div className="col-12 col-sm-6 col-lg-4 mb-4 d-flex justify-content-center">
//                             <Link to="/adminplace" className="btn btn-primary w-100 py-4 custom-box bg-success text-white">
//                                 <FontAwesomeIcon icon={faMoneyBill} className="mr-2" /> Current Order
//                             </Link>
//                         </div>
//                         <div className="col-12 col-sm-6 col-lg-4 mb-4 d-flex justify-content-center">
//                             <Link to="/as" className="btn btn-primary w-100 py-4 custom-box bg-danger text-white">
//                                 <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" /> Add People
//                             </Link>
//                         </div>
//                         <div className="col-12 col-sm-6 col-lg-4 mb-4 d-flex justify-content-center">
//                             <Link to="/am" className="btn btn-primary w-100 py-4 custom-box bg-warning text-white">
//                                 <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" /> Add Menu
//                             </Link>
//                         </div>
//                         <div className="col-12 col-sm-6 col-lg-4 mb-4 d-flex justify-content-center">
//                             <Link to="/fr" className="btn btn-primary w-100 py-4 custom-box bg-info text-white">
//                                 <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" /> Fetch Item Requests
//                             </Link>
//                         </div>
//                         <div className="col-12 col-sm-6 col-lg-4 mb-4 d-flex justify-content-center">
//                             <Link to="/cp" className="btn btn-primary w-100 py-4 custom-box bg-primary text-white">
//                                 <FontAwesomeIcon icon={faUser} className="mr-2" /> Change Password
//                             </Link>
//                         </div>
//                         <div className="col-12 col-sm-6 col-lg-4 mb-4 d-flex justify-content-center">
//                             <button onClick={handleSignOut} className="btn btn-danger w-100 py-4 custom-box bg-secondary text-white">
//                                 <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Sign Out
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMoneyBill, faQuestionCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../styles.css'; // Import your custom CSS file

export default function Home() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = location.state || {};

    // Function to handle signout
    const handleSignOut = () => {
        // Clear any authentication tokens or session data
        localStorage.removeItem('adminUniqueID'); // Assuming this is the token you set during login
    
        // Redirect to login page
        navigate('/login'); // Adjust this path to your login route
    };

    return (
        <div className="container-fluid bg-gradient-primary text-white d-flex flex-column align-items-center" style={{ minHeight: '100vh' }}>
            <div className="row w-100 justify-content-center" style={{ marginTop: '5vh' }}>
                <div className="col-12 d-flex justify-content-center">
                    <div className="welcome-box text-center bg-dark text-white p-3">
                        <h1 className="display-4 m-0 text-white">{id ? `Hi, FoodFleet admin ${id}` : 'Welcome, Admin'}</h1>
                    </div>
                </div>
            </div>
            <div className="row flex-grow-1 w-100 d-flex align-items-center justify-content-center">
                <div className="col-12 col-md-9 d-flex justify-content-center">
                    <div className="row w-100">
                        <div className="col-12 col-sm-6 col-lg-4 mb-4 d-flex justify-content-center">
                            <Link to="/adminplace" className="btn btn-primary w-100 py-4 custom-box bg-success text-white">
                                <FontAwesomeIcon icon={faMoneyBill} className="mr-2" /> Current Order
                            </Link>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4 mb-4 d-flex justify-content-center">
                            <Link to="/as" className="btn btn-primary w-100 py-4 custom-box bg-danger text-white">
                                <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" /> Add People
                            </Link>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4 mb-4 d-flex justify-content-center">
                            <Link to="/am" className="btn btn-primary w-100 py-4 custom-box bg-warning text-white">
                                <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" /> Add Menu
                            </Link>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4 mb-4 d-flex justify-content-center">
                            <Link to="/fr" className="btn btn-primary w-100 py-4 custom-box bg-info text-white">
                                <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" /> Fetch Item Requests
                            </Link>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4 mb-4 d-flex justify-content-center">
                            <Link to="/cp" className="btn btn-primary w-100 py-4 custom-box bg-primary text-white">
                                <FontAwesomeIcon icon={faUser} className="mr-2" /> Change Password
                            </Link>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4 mb-4 d-flex justify-content-center">
                            <button onClick={handleSignOut} className="btn btn-danger w-100 py-4 custom-box bg-secondary text-white">
                                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

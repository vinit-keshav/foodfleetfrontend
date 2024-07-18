import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home'; // Import the Home component
import Login from './Components/Login'; // Import the Login component
import Signup from './Components/Signup'; // Import the Signup component
import Alogin from './Components/admin/Alogin'
import ASignup from './Components/admin/ASignup'
import Admins from './Components/admin/Admins'
import AddStudent from './Components/admin/AddStudent'
import Ahome from './Components/admin/Ahome'
import ChangePassword from './Components/admin/ChangePassword'
import AddMenu from './Components/admin/AddMenu'
import FetchRequest from './Components/admin/FetchRequest'
import StudentPassword from './Components/StudentPassword'
import RequestItem from './Components/RequestItem'

import Order from './Components/Order';
  
  function App() {
    return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/" element={<Login/>} />
          <Route path="/Order" element={<Order/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/admin" element={<Alogin />} />
          <Route path="/signupp" element={<ASignup/>} />
          <Route path="/adminplace" element={<Admins/>} />
          <Route path="/ahome" element={<Ahome/>}/>
          <Route path="/as" element={<AddStudent/>}/>
          <Route path="/am" element={<AddMenu/>}/>
          <Route path="/cp" element={<ChangePassword/>}/>
          <Route path="/sp" element={<StudentPassword/>}/>
          <Route path="/ri" element={<RequestItem/>}/>
          <Route path="/fr" element={<FetchRequest/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
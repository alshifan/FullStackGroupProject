import React from 'react';
import ReactDOM from 'react-dom/client';

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeDirectory from './EmployeeDirectory.jsx';
// import Navbar from "./components/Navbar.jsx";
import CreateEmployee from './CreateEmployee.jsx';
import Navbar from './Navbar.jsx';
import EmployeeDetails from './EmployeeDetails.jsx';

class Main extends React.Component {
  render() {
    return (
      <Router>
        <div className='layout-container'>
          <Navbar />
          <div className='content-container'>
            <Routes>
              <Route
                path='/'
                element={<EmployeeDirectory />}
              />
              <Route
                path='/create'
                element={<CreateEmployee />}
              />
              {/* Route for editing employee */}
              <Route
                path='/edit/:id'
                element={<CreateEmployee />}
              />
              <Route
                path='/details/:id'
                element={<EmployeeDetails />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);

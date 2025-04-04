import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className='navbar'>
      <div className='nav-container'>
        <NavLink
          to='/'
          className='nav-link'>
          Employees
        </NavLink>
        <NavLink
          to='/create'
          className='nav-link'>
          Add Employee
        </NavLink>
      </div>
    </nav>
  );
}

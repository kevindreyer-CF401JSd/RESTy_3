import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="Navbar">
      <ul>
        <li className="nav"><Link to="/">Home</Link></li>
        <li className="nav"><Link to="/about">About</Link></li>
        <li className="nav"><Link to="/contact">Contact</Link></li>
        <li className="nav"><Link to="/history">History</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar

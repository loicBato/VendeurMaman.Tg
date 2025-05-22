import React from 'react'
import './Navbar.css'
import logo from '../../../Assets/logo_site2.png'
import { Link } from 'react-router-dom'


function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="navbar_left">
          <Link to='/Maman.tg' style={{ textDecoration: 'none', color: 'rgb(42, 178, 232)' }}>
            <div className="nav_name">
              <img src={logo} alt="" />
            </div>
          </Link>
          <div className="nav_option">
            <span>Conditions</span>
            <Link to='/Maman.tg/tarifs' style={{ textDecoration: 'none', color: 'black' }}> <span>Tarifs</span></Link>
          </div>
        </div>

        <div className="navbar_action">
          <Link to='/Maman.tg/connexion' style={{ textDecoration: 'none', color: 'rgb(42, 178, 232)' }}> <span>Connexion</span></Link>
          <Link to='/Maman.tg/inscription' style={{ textDecoration: 'none', color: 'rgb(42, 178, 232)' }}> <button>Inscription</button></Link>

        </div>
      </div>

    </>
  )
}

export default Navbar

import './Navbar.css'
import logo from '../../../Assets/logo_site2.png'
import { Link } from 'react-router-dom'
import Notification from '../Components/Notification/Notification';
import { AuthContext } from '../../../Context/AuthContext';
import { useContext } from 'react';


function Navbar() {

  const { isAuthenticated } = useContext(AuthContext);



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
            <Link to={'/Maman.tg/cgv'} style={{ textDecoration: 'none', color: 'black' }}> <span>Conditions</span></Link>
            <Link to='/Maman.tg/tarifs' style={{ textDecoration: 'none', color: 'black' }}> <span>Tarifs</span></Link>
            <Link to='/Maman.tg/boutiques' style={{ textDecoration: 'none', color: 'black' }}> <span>Boutiques</span></Link>
          </div>
        </div>

        <div className="navbar_action">
          {isAuthenticated() ? (
            <>
              <Link to={'/Maman.tg/gestionnaire/tableau'} style={{ textDecoration: 'none', color: 'black' }}> <span>Tableau de bord</span></Link>

              <Notification isAuthenticated={isAuthenticated} />
            </>
          ) : (
            <>          <Link to='/Maman.tg/connexion' style={{ textDecoration: 'none', color: 'rgb(42, 178, 232)' }}> <button style={{backgroundColor: 'rgb(139, 139, 139)'}}>Connexion</button></Link>
              <Link to='/Maman.tg/inscription' style={{ textDecoration: 'none', color: 'rgb(42, 178, 232)' }}> <button>Inscription</button></Link>
            </>

          )}
        </div>
      </div>

    </>
  )
}

export default Navbar

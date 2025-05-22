import React from 'react'
import './Footer.css'
import facebook from '../../Assets/facebook.png'
import whatsap from '../../Assets/whatsapp.png'
import telegram from '../../Assets/telegram.png'
import instagram from '../../Assets/instagram.png'


function Footer() {


  return (
    <>
    <div className="footer">
        <div className="footer-logo">
            {/* <img src={logo} alt="logo" /> */}
            <h2>Maman.Tg</h2>
        </div>
        <ul className='footer-links'>
<li>Boutique</li>
<li>Conditions d'utilisation</li>
<li>Réclamations</li>
            <li>Contacts</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icons-container">
                <img src={facebook} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={whatsap} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={telegram} alt="" />
            </div>
                        <div className="footer-icons-container">
                <img src={instagram} alt="" />
            </div>

        </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright @ 2025 - Cognitive Factory</p>
        </div>
    </div>
    </>
  )
}

export default Footer

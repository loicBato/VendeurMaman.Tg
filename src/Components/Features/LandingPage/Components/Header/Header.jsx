import React from 'react'
import './Header.css'

function Header() {
  return (
    <>
      <div className="header">
        <div className="header_video">
          <video autoPlay muted loop>
            <source src='https://cloud.video.taobao.com/play/u/null/p/1/e/6/t/1/445851562740.mp4' />
          </video>
        </div>

        <div className="header_contain">
          <h3>Vendre sur Maman.Tg</h3>
          <h1>Accompagnez les premiers instants de milliers de bébés avec votre boutique...</h1>
          <button>Commencer à vendre</button>
        </div>
      </div>

    </>
  )
}

export default Header

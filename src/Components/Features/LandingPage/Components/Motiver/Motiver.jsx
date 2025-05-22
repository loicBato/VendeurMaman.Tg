import React from 'react'
import './Motiver.css'
import image1 from '../../../../Assets/MAMANL1.jpeg'

function Motiver() {
  return (
    <>
    <div className="motiver">
      <div className="motiver_container">
        <div className="motiver_left">
          <h2>Une logistique facilitée</h2>
          <p>
            Nous vous accompagnons dans la gestion de vos ventes, du catalogue jusqu'à la livraison,
             pour vous permettre de vous concentrer sur ce que vous faites de mieux : proposer des produits
              utiles, sûrs et adorés des parents — couches, jouets, vêtements, accessoires, et bien plus.
          </p>
        </div>
        <div className="motiver_right">
          <img src={image1} alt="" />
        </div>
      </div>
    </div>
      
    </>
  )
}

export default Motiver

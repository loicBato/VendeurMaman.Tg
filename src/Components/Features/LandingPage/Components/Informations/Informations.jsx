import React from 'react'
import './Informations.css'
import image1 from '../../../../Assets/MAMAN14.jpeg'
import image2 from '../../../../Assets/MAMAN15.jpeg'


function Informations() {
  return (
    <>
      <div className="informations">
        <div className="informations_container1">
          <div className="informations_left1">
            <h2>Rejoignez la marketplace dédiée aux bébés et mamans, là où vos produits trouvent leur public</h2>
            <p>
              Chez Maman.Tg, nous offrons aux vendeurs l'opportunité unique de développer leur activité dans un environnement dédié aux besoins des mamans et des tout-petits,
              avec une visibilité accrue, des outils simples à utiliser, et un accès direct à une communauté de parents en constante recherche de produits de qualité.
            </p>
          </div>
          <div className="informations_right1">
            <img src={image1} alt="" />
          </div>
        </div>

        <div className="informations_container2">
          <div className="informations_left2">
            <img src={image2} alt="" />
          </div>
          <div className="informations_right2">
            <h2>La portée nationale (et future ambition internationale)</h2>
            <p>
              En créant votre boutique sur Maman.Tg, vous donnez une nouvelle dimension à votre commerce :
              vous passez d'un point de vente local à une plateforme accessible à des milliers de familles à travers tout le pays — avec la possibilité
              de vous étendre encore plus loin à mesure que notre communauté grandit.
            </p>
          </div>

        </div>
      </div>

    </>
  )
}

export default Informations

// import React from 'react'
import './Card.css'

import vente from '../../../../Assets/vente.png'
// import client from '../../../../Assets/client.png'
import total from '../../../../Assets/total.png'
import revenu from '../../../../Assets/revenu.png'
import { useEffect, useState } from 'react';
import Axios from '../../../../Utils/Axios';


function formatPrice(price, currencySymbol = 'FCFA', decimalPlaces = 0) {
    const fixedPrice = parseFloat(price).toFixed(decimalPlaces);
    return `${fixedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ".").replace(".", ".")} ${currencySymbol}`;
  }

function Card() {  

    const [data, setData] = useState('');

    useEffect(() => {
      Axios.get('vendeur/statistics').then((result) => {
          setData(result.data.data);
          console.log("statistics", result)
      })
          .catch((error) => {
              console.error("Erreur  d'API : ", error)
          });
  
  }, []);
  


    return (
        <>
            <div className="card">
                <div className="cardbox">
                    <div className="cardbox-price">
                        <div className="name">Ventes du jour</div>
                        <div className="price">
                            <p>{data.order_count_today}</p>
                            {/* <span>+12.1%</span> */}
                        </div>
                    </div>
                    <div className="cardbox-icon">
                        <img src={vente} alt="" />
                    </div>
                </div>

                <div className="cardbox">
                    <div className="cardbox-price">
                        <div className="name">Revenu du jour</div>
                        <div className="price">
                            <p> {formatPrice(data.total_solde_du_jour)} </p>
                            {/* <span>+21.34%</span> */}
                        </div>
                    </div>
                    <div className="cardbox-icon">
                        <img src={revenu} alt="" />
                    </div>
                </div>

                {/* <div className="cardbox">
                    <div className="cardbox-price">
                        <div className="name">Nombres de clients</div>
                        <div className="price">
                            <p>540</p>
                            <span>+34.3%</span>
                        </div>
                    </div>
                    <div className="cardbox-icon">
                        <img src={client} alt="" />
                    </div>
                </div> */}

                <div className="cardbox">
                    <div className="cardbox-price">
                        <div className="name">Revenu total</div>
                        <div className="price">
                            <p> {formatPrice(data.total_solde)} </p>
                            {/* <span>+47.39%</span> */}
                        </div>
                    </div>
                    <div className="cardbox-icon">
                        <img src={total} alt="" />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Card

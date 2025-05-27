// import React from 'react'
import { useEffect, useState } from 'react';
import './Boutiques.css'
import Axios from '../../../Utils/Axios';
import { FaStar } from 'react-icons/fa';
import { HiBadgeCheck } from 'react-icons/hi';

function Boutiques() {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {

        setIsLoading(true);
        Axios.get(`/stores`)
            .then((result) => {
                console.log("stores", result.data.data.stores)

                const stores = result.data.data.stores || [];

                const sortedBoutiques = stores.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                const mixedBoutiques = shuffleArray(sortedBoutiques);
                setData(mixedBoutiques);

            })
            .catch((error) => {
                console.error("Erreur d'API : ", error);
            })
          .finally(() => setIsLoading(false));
    }, []);

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    if (isLoading) {
        return (
            <div className="loading">
                <p>Chargement...</p>
            </div>
        )
    }


    return (
        <>
            <div className="boutique_box">
                <div className="boutique_box_top">
                    <h1>Tous les boutiques </h1>
                </div>
                <hr />

                <div className="boutique_box_contain">
                    <div className="boutique_box_item">
                        {data.map((store) => (
                            <div className="cards" key={store.id}>
                                {/* <div className="card_image">
                    <img src={boutique_img} alt="" />
                </div> */}
                                <div className="card_top">
                                    <div className="card_name">
                                        <h2>{store.name}</h2>
                                    </div>
                                    <div className="card_badge">
                                        <HiBadgeCheck className='card_badge_item' />
                                        <span>Vérifier</span>
                                    </div>
                                </div>
                                <div className="card_content">
                                    <div className="card_content_img">
                                    </div>
                                    <div className="card_content_text">
                                        {/* <h3>Nom de la boutique</h3> */}
                                        <p>{store.description} </p>
                                    </div>
                                </div>
                                <div className="card_bottom">
                                    <span>
                                        {store.city}
                                    </span>
                                    <span style={{ color: 'rgb(252, 180, 63)', fontSize: '1.2rem' }}>
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Boutiques

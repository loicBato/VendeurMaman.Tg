import React from 'react'
import './Visualiser.css'
import encrypted from '../../../../Assets/encrypted.png'
import togo from '../../../../Assets/togo.png'
import validation from '../../../../Assets/validation.png'

function Visualiser() {
    return (
        <>
            <div className="visualiser">
                <div className="visualiser_container">
                    <div className="visualiser_content1">
                        <div className="visualiser_content1_left">
                            <h1>La plateforme togolaise qui relie les boutiques d'articles pour nouveaux-nés et mamans</h1>
                        </div>
                        <div className="visualiser_content1_right">
                            <div>
                                <p>200 K</p>
                                <span>Clients actives</span>
                            </div>
                            <div>
                                <p>200 K</p>
                                <span>Clients actives</span>
                            </div>
                            <div>
                                <p>200 K</p>
                                <span>Clients actives</span>
                            </div>
                        </div>
                    </div>
                    <div className="visualiser_content2">
                        <div className="visualiser_content2_card">
                            <div>
                                <img src={encrypted} alt="" />
                            </div>

                            <h3>Sécurisé</h3>
                            <p>La sécurité de nos utilisateurs est une priorité. Nous utilisons des protocoles de protection
                                fiables pour garantir la confidentialité de vos données et la sécurité de vos transactions.
                                Profitez d'un espace d'achat sûr et transparent.</p>
                        </div>
                        <div className="visualiser_content2_card">
                            <div>
                                <img src={togo} alt="" />
                            </div>

                            <h3>Togolaise</h3>
                            <p>Vous vendez des produits pour bébés et nouveau-nés au Togo ? Rejoignez notre plateforme 100 % togolaise
                                dédiée à cet univers. Offrez aux parents un accès facile et sécurisé à vos articles,
                                partout dans le pays.</p>
                        </div>
                        <div className="visualiser_content2_card">
                            <div>
                                <img src={validation} alt="" />
                            </div>

                            <h3>Validé</h3>
                            <p>En tant que plateforme certifiée, nous mettons un point d'honneur à offrir un espace de vente fiable,
                                sécurisé et réglementé. Tous les vendeurs doivent se conformer à des critères stricts pour protéger
                                la santé et la sécurité des tout-petits.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Visualiser

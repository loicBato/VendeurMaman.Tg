import React from 'react'
import './Tarifs.css'





function Tarifs() {




    return (
        <>
            <div className="tarifs">
                <div className="tarifs_container">
                    <div className="tarifs_card">
                        <div className="tarifs_plan">
                            <h3>Plan Découverte</h3>
                        </div>
                        <div className="tarifs_price">
                            <h1>0 FCFA <span>/Mois</span></h1>
                            <span>Pour une durée de 4 mois</span>
                        </div>
                        <button>Souscrire à l'abonnement</button>
                        <div className="tarifs_decription">
                            <ul>
                                <li>✅ Jusqu'à 10 produits listés</li>
                                <li>✅ Accès à un tableau de bord simple</li>
                                <li>✅ Assistance par email uniquement</li>
                                <li>❌ Pas de paiement en ligne</li>
                                <li>❌ Visibilité très réduite dans les recherches</li>
                                <li>❌ Aucune mise en avant dans les pages du site</li>
                                <li>❌ Pas de badge "Vendeur vérifié"</li>
                            </ul>
                        </div>
                    </div>

                    <div className="tarifs_card">
                        <div className="tarifs_plan">
                            <h3>Plan Standard</h3>
                        </div>
                        <div className="tarifs_price">
                            <h1>5000 FCFA <span>/Mois</span></h1>
                            <span>Pour une durée de 12 mois</span>
                        </div>
                        <button>Souscrire à l'abonnement</button>
                        <div className="tarifs_decription">
                            <ul>
                                <li>✅ Jusqu'à 30 produits listés</li>
                                <li>✅ Accès à un tableau de bord</li>
                                <li>✅ Assistance WhatsApp + email</li>
                                <li>✅ Paiement en ligne activé</li>
                                <li>❌ Visibilité moyenne sans boost</li>
                                <li>❌ Pas de gestionnaire de compte dédié</li>
                                <li>❌ Pas de badge "Vendeur vérifié"</li>

                            </ul>
                        </div>
                    </div>

                    <div className="tarifs_card">
                        <div className="tarifs_plan">
                            <h3>Plan Premium</h3>
                        </div>
                        <div className="tarifs_price">
                            <h1>15000 FCFA <span>/Mois</span></h1>
                            <span>Pour une durée illimitée</span>
                        </div>
                        <button>Souscrire à premium</button>
                        <div className="tarifs_decription">
                            <ul>
                                <li>✅ Jusqu'à 100 produits listés</li>
                                <li>✅ Accès à un tableau de bord </li>
                                <li>✅ Assistance par email uniquement</li>
                                <li>✅ Paiement en ligne activé</li>
                                <li>✅ Badge vendeur vérifié</li>
                                <li>✅ Support prioritaire (WhatsApp 7j/7)</li>
                                <li>✅ Notifications SMS</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tarifs

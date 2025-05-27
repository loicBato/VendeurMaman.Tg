// import React from 'react'
import { useEffect, useState } from 'react'
import './ViewLivraisons.css'

function ViewLivraisons({ livraison, onDateChange }) {

    const [dateLivraison, setDateLivraison] = useState(livraison.delivery_date )

    useEffect(() => {
        setDateLivraison(livraison.delivery_date || '')
    }, [livraison])

    useEffect(() => {
        onDateChange(dateLivraison); 
        
    }, [dateLivraison, onDateChange]); 

    return (
        <>
            <div className="viewlivraison">
                <div className="viewlivraisons_main">
                    <div className="addlivraison_reference">
                        <div>
                            <p>Réference : <strong>{livraison.ref}</strong></p>
                        </div>
                        <div>
                            <p>Commande : <strong>{livraison.order.ref}</strong></p>
                        </div>
                    </div>

                    <div className="addlivraison_reference">
                        <div>
                            <p>Client : <strong>{livraison.user.nom} {livraison.user.prenom}</strong></p>
                        </div>

                        <div>
                            <p>Destinataire : <strong>{livraison.nom} {livraison.prenom}</strong></p>
                        </div>
                    </div>

                    <div className="addlivraison_reference">
                    <div>
                        <p>Adresse : <strong>{livraison.adresse}</strong></p>
                    </div>
                    <div>
                        <p>Quartier : <strong>{livraison.ville}</strong></p>
                    </div>
                    </div>

                    <div className='date_livraison'>
                        <label htmlFor="date_livraison">Date de la livraison</label>
                        <input type="date" name='date_livraison' value={dateLivraison} onChange={(e) => setDateLivraison(e.target.value)}/>
                    </div>

                </div>
            </div>

        </>
    )
}

export default ViewLivraisons

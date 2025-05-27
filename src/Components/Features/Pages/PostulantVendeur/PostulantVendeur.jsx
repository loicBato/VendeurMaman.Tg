// import React from 'react'
import { Link } from 'react-router-dom'
import './PostulantVendeur.css'

function PostulantVendeur() {


    return (
        <>
            <div className="postulant_vendeur">
                <div className="postulant_vendeur_top">
                    <h1>Bienvenue dans votre espace vendeur</h1>
                </div>
                <div className="postulant_vendeur_main">
                    <p>Pour commencer vous devez créer votre boutique si vous en avez pas encore une sur la plateforme.</p>
                    <p>Une fois votre boutique créée, vous pourrez gérer vos produits, vos commandes et vos livraisons.</p>
                    <p>Vous pouvez également consulter vos statistiques de vente et vos revenus.</p>
                    <p>Pour cela, vous devez remplir le formulaire de démande de création de boutique.</p>

                    {/* <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p> */}
                </div>
                <div className="postulant_vendeur_bottom">
                    <Link to={'/Maman.Tg/formulaire_de_demande'}><button>Remplir le formulaire</button></Link>
                    <span>En cliquant sur le bouton ci-dessus, vous acceptez nos conditions générales de vente et d'utilisation.</span>

                    <span>Nous vous souhaitons une bonne expérience sur notre plateforme.</span>
                </div>
            </div>

        </>
    )
}

export default PostulantVendeur

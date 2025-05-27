// import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from '../Features/LandingPage/Pages/LandingPage'
import Layout from '../Features/Layout/Layout'
import Gestionnaire from '../Features/GestionVente/Pages/Gestionnaire/Gestionnaire'
import LoginSign from '../Features/Authentification/Pages/LoginSignUp/LoginSign'
import RegisterSign from '../Features/Authentification/Pages/LoginRegister/RegisterSign'
import ResetPassword from '../Features/Authentification/Pages/LoginReset/ResetPassword'
import ForgotPassword from '../Features/Authentification/Pages/ForgetAuth/ForgotPassword'
import Tarifs from '../Features/Pages/Tarifs/Tarifs'
import PostulantVendeur from '../Features/Pages/PostulantVendeur/PostulantVendeur'
import DemandeForm from '../Features/DemandeForm/Pages/DemandeForm'
import Conditions from '../Features/Pages/Conditions/Conditions'
import Boutiques from '../Features/Pages/Boutiques/Boutiques'

export default function Router() {

    return (

        <BrowserRouter basename='/VendeurMaman.Tg'>
            <Layout>
                <div className="route">
                    <Routes>
                        <Route path="/" element={<Navigate to='/Maman.tg'/>} />
                        <Route path="/Maman.Tg" element={<LandingPage />} />
                        <Route path="/Maman.Tg/connexion" element={<LoginSign />} />
                        <Route path="/Maman.Tg/inscription" element={<RegisterSign />} />
                        <Route path="/Maman.Tg/mot_de_passe_oublié" element={<ForgotPassword />} />
                        <Route path="/Maman.Tg/reset_password" element={<ResetPassword />} />
                        <Route path="/Maman.Tg/tarifs" element={<Tarifs />} />
                        <Route path="/Maman.Tg/cgv" element={<Conditions />} />
                        <Route path="/Maman.Tg/boutiques" element={<Boutiques />} />
                        <Route path="/Maman.Tg/acceuil_postulant_vendeur" element={<PostulantVendeur />} />
                        <Route path="/Maman.Tg/formulaire_de_demande" element={<DemandeForm />} />
                        <Route path="/Maman.tg/gestionnaire/*" element={<Gestionnaire />} />
                        
                    </Routes>
                </div>
            </Layout> 
        </BrowserRouter>
    )
}

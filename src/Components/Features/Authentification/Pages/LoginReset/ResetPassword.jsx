// import React from 'react'
import './ResetPassword.css'

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from 'react-toastify';
import SubmitButton from '../../Components/SubmitButton/SubmitButton';
import PasswordInput from '../../Components/PasswordInput/PasswordInput';
import Axios from '../../../../Utils/Axios';

function ResetPassword() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
    }, [token]);

    const navigate = useNavigate()
    const email = localStorage.getItem('email');

    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        setIsLoading(true);
    
        console.log("Token:", token); 
        console.log("Email:", email); 
        console.log("Password:", password); 
        console.log("Confirm Password:", confirmPassword);
    
        Axios.post('/reset-password', { token, email, password, password_confirmation: confirmPassword }, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
        .then(response => {
            console.log('response', response)
            setIsLoading(false);
            setError('');
            toast.success("Votre mot de passe a été réinitialisé avec succès !", {
                position: 'top-center'
            });
            localStorage.removeItem('email');
            navigate('/Maman.tg/Login');
        })
        .catch(error => {
            setIsLoading(false);
            console.error("Erreur lors de la requête : ", error.response);
            const errorMessage = error.response?.data?.message || 'Erreur lors de la réinitialisation du mot de passe. Veuillez réessayer.';
            setError(errorMessage);
        });
        console.log("Data to send:", { token, email, password });

    };
    

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="loginsignup">
                    <div className="loginsignup-container">
                        <h2>Réinitialisation de mot de passe</h2>
                        <hr />

                       
                    <PasswordInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Nouveau mot de passe"
                    />

                    <PasswordInput
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        label="Confirmez le nouveau mot de passe"
                    />

                    {error && <span className="input_span">{error}</span>}

                    <SubmitButton isLoading={isLoading} text="Réinitialiser" />
                    
                    <br /><br />
                    
                    </div>
                </div>
            </form>

        </>
    )
}

export default ResetPassword

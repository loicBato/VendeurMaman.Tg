// import React from 'react'
// import { useNavigate } from 'react-router-dom'
import './RegisterSign.css'
import { useContext, useState } from 'react'
import backgroundImage from '../../../../Assets/MAMAN15.jpeg'

import { toast } from 'react-toastify'
import LinkAuth from '../../Components/LinkAuth/LinkAuth'
import SubmitButton from '../../Components/SubmitButton/SubmitButton'
import PasswordInput from '../../Components/PasswordInput/PasswordInput'
import FormInput from '../../Components/FormInput/FormInput'
import Axios from '../../../../Utils/Axios'
import { AuthContext } from '../../../../Context/AuthContext'
import { useNavigate } from 'react-router'
// import fileur from '../Components/Assets/fileur.gif'

function RegisterSign() {

    const [values, setValues] = useState({
        name: '',
        email: '',
        phone_number: '',
        password: '',
        password_confirmation: '',
        first_name: '',
        last_name: ''
    })

    const { setUserData, setIsLoggedIn } = useContext(AuthContext)
// const [submissionSuccess, setSubmissionSuccess] = useState(false)
    const [errors, setErrors] = useState({})
    const [valid, setValid] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()


    const handleSubmit = (event) => {
        event.preventDefault();

        let isvalid = true;
        let validationErrors = {}
        if (values.first_name === "" || values.first_name === null) {
            isvalid = false;
            validationErrors.first_name = 'Le prénom est requis'
        }
        if (values.last_name === "" || values.last_name === null) {
            isvalid = false;
            validationErrors.last_name = 'Le nom est requis'
        }
        if (values.name === "" || values.name === null) {
            isvalid = false;
            validationErrors.name = "Veuillez definir votre nom de la boutique"
        }
                if (values.address === "" || values.address === null) {
            isvalid = false;
            validationErrors.address = "Votre adresse est requise"
        }

        // if (values.email === "" || values.email === null) {
        //     isvalid = false;
        //     validationErrors.email = "L'email est requis"
        // } else if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)) {
        //     isvalid = false;
        //     validationErrors.email = "Email non valide"
        // }
        if (values.password === "" || values.password === null) {
            isvalid = false;
            validationErrors.password = "Le mot de passe est requis"
        } else if (values.password.length < 6) {
            isvalid = false;
            validationErrors.password = "Le mot de passe doit contenir au-moins 6 caractères "
        }
        if (values.password_confirmation !== values.password) {
            isvalid = false;
            validationErrors.password_confirmation = "Le mot de passe ne correspond pas"
        }

        setErrors(validationErrors)
        setValid(isvalid)

        if (Object.keys(validationErrors).length === 0) {
            setIsLoading(true)
            setTimeout(() => setIsLoading(false), 2000);

            Axios.post('/postulant_vendeur/register', values)
                .then(result => {
                    const {token, user} = result.data.data;

                    if(token) {
                        localStorage.setItem('token', token)
                        setUserData(user)
                        setIsLoggedIn(true)
                    }
                    // console.log(result);
                    toast.success("Vous etes bien enregistrer", {
                        position: 'top-right'
                    })
                    // setSubmissionSuccess(true)
                    navigate('/Maman.Tg/acceuil_postulant_vendeur');
                    console.log(setIsLoading)
                })
                // .catch(error => console.log(error));
                .finally(() => setIsLoading(false));
        }

    }

    return (
        <>
            {/* {isLoading && (
                <div className="loader">
                    <div className="spinner"></div>
                </div>
            )} */}

            {/* { submissionSuccess && (
                <div className="success_message">
                    <h3>Démande de création de compte enrégistrer</h3>
                    <p>Un email de confirmation vous sera envoyer après vérification...</p>
                    <button>OK</button>
                </div>
            )

            } */}


            <form action="" onSubmit={handleSubmit}>
                <div className="loginsignup" style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}>
                    <div className="overlay"></div>

                    <div className="loginsignup-container">
                        <h2>Inscription vendeur</h2>
                        <hr />

                        {/* <div className="inputs"> */}
                        <FormInput
                        type="text"
                        name="last_name"
                        value={values.last_name}
                        onChange={(e) => setValues({ ...values, last_name: e.target.value })}
                        label="Nom"
                        error={errors.last_name}
                    />

                    <FormInput
                        type="text"
                        name="first_name"
                        value={values.first_name}
                        onChange={(e) => setValues({ ...values, first_name: e.target.value })}
                        label="Prénom"
                        error={errors.first_name}
                    />

                    <FormInput
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={(e) => setValues({ ...values, name: e.target.value })}
                        label="Nom d'utilisateur"
                        error={errors.name}
                    />

                    <FormInput
                        type="number"
                        name="phone_number"
                        value={values.phone_number}
                        onChange={(e) => setValues({ ...values, phone_number: e.target.value })}
                        label="Numéro de téléphone"
                        error={errors.phone_number}
                    />

                    {/* <FormInput
                        type="text"
                        name="address"
                        value={values.address}
                        onChange={(e) => setValues({ ...values, address: e.target.value })}
                        label="Adresse"
                        error={errors.address}
                    /> */}

                    {/* <FormInput
                        type="number"
                        name="number"
                        value={values.number}
                        onChange={(e) => setValues({ ...values, number: e.target.value })}
                        label="N_Carte"
                        error={errors.number}
                    /> */}

                    <FormInput
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={(e) => setValues({ ...values, email: e.target.value })}
                        label="E-mail"
                    />

                    <PasswordInput
                        value={values.password}
                        onChange={(e) => setValues({ ...values, password: e.target.value })}
                        showPassword={showPassword}
                        togglePassword={() => setShowPassword(!showPassword)}
                        error={errors.password}
                    />

                    <PasswordInput
                        value={values.password_confirmation}
                        onChange={(e) => setValues({ ...values, password_confirmation: e.target.value })}
                        showPassword={showPassword}
                        togglePassword={() => setShowPassword(!showPassword)}
                        error={errors.password_confirmation}
                        label="Confirmez le mot de passe"
                    />

                    <SubmitButton isLoading={isLoading} text="S'inscrire" />

                    <br />

                    <LinkAuth to="/Maman.Tg/connexion" text=" Se connecter" main_text='Vous avez déjà une boutique ?' />




                </div>
                </div>
            </form>

        </>
    )
}

export default RegisterSign

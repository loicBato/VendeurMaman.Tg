// import React from 'react'
// import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginSign.css'
import { useContext, useState } from 'react'
import backgroundImage from '../../../../Assets/MAMAN15.jpeg'
import { toast } from 'react-toastify';
import LinkAuth from '../../Components/LinkAuth/LinkAuth';
import SubmitButton from '../../Components/SubmitButton/SubmitButton';
import PasswordInput from '../../Components/PasswordInput/PasswordInput';
import FormInput from '../../Components/FormInput/FormInput';
import { AuthContext } from '../../../../Context/AuthContext';


function LoginSign() {



  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let isValid = true;
    let validationErrors = {};

    const { identifier, password } = values;

    if (!identifier) {
      isValid = false;
      validationErrors.identifier = "Veuillez saisir un email ou un numéro de téléphone.";
    }

    if (!password) {
      isValid = false;
      validationErrors.password = "Le mot de passe est requis.";
    } else if (password.length < 8) {
      isValid = false;
      validationErrors.password = "Le mot de passe doit contenir au moins 8 caractères.";
    }

    if (isValid) {
      setIsLoading(true);
      try {
        console.log("Données envoyées :", { email_or_phone: identifier, password });

        await login(identifier, password);
        toast.success("Connexion réussie !", { position: "top-right" });
        navigate(-1);
      } catch (error) {
        console.error("Erreur lors de la connexion :", error.message);

        if (error.response.data.message && error.response.status === 401) {
          setErrors({ password: "Identifiant ou mot de passe incorrect." });
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(validationErrors);
      setValid(false);
    }
  };



  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <div className="loginsignup"  style={{
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }} > 

  <div className="overlay" />

          <div className="loginsignup-container">
            <h2>Connexion</h2>
            <hr />

            {/* <div className="inputs"> */}

            <FormInput
              type="text"
              name="identifier"
              value={values.identifier}
              onChange={(e) => setValues({ ...values, identifier: e.target.value })}
              label="E-mail / Numéro de téléphone"
              error={errors.identifier}
            />

            <PasswordInput
              value={values.password}
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
              error={errors.password}
            />

            <LinkAuth to="/Maman.tg/mot_de_passe_oublié" text=" Cliquez ici !" main_text="Mot de passe oublié ?" />

            <SubmitButton isLoading={isLoading} text="Se connecter" />

            <br />

            <LinkAuth to="/Maman.Tg/inscription" text=" S'inscrire" main_text="Vous n'avez pas de compte ?" />
          </div>



        </div>
      </form>


    </>
  )
}

export default LoginSign

import { useState } from 'react';
import './ForgotPassword.css';
import { toast } from 'react-toastify';
import FormInput from '../../Components/FormInput/FormInput';
import SubmitButton from '../../Components/SubmitButton/SubmitButton';
import LinkAuth from '../../Components/LinkAuth/LinkAuth';
import Axios from '../../../../Utils/Axios';

function ForgotPassword() {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmited, setIsSubmited] = useState(false);


    const handleSubmit = (event) => {
        event.preventDefault();

        if (!email) {
            setError('Veuillez entrer votre e-mail.');
            return;
        }

        setIsLoading(true);

        Axios.post('/forgot-password', { email })
            .then(response => {
                setIsLoading(false);

                localStorage.setItem('email', email);
                setIsSubmited(true);
                console.log('Response:', response);
                toast.success("Un email vous a été envoyé !", {
                    position: "top-center"
                });
                setError('');
            })
            .catch(error => {
                setIsLoading(false);
                console.error('Error details:', error.response ? error.response.data : error.message);
                setError('Erreur lors de la réinitialisation du mot de passe. Veuillez réessayer.');
            });
    };

    return (
        <>
            {!isSubmited ? (
                <form onSubmit={handleSubmit}>
                    <div className="loginsignup">
                        <div className="loginsignup-container">
                            <h2>Mot de passe oublié</h2>
                            <hr />

                            {/* <div className="inputs"> */}
                            <FormInput
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Votre e-mail"
                                error={error}
                            />

                            <SubmitButton isLoading={isLoading} text="Suivant" />

                            <br /><br />

                            <LinkAuth to="/Maman.Tg/connexion" text=" Se connecter" main_text='Vous avez un compte ?' />
                        </div>
                    </div>
                </form>
            ) : (
                <div className="confirmation-message">
                    <h2>Vérifiez votre e-mail</h2>
                    <p>Un e-mail de réinitialisation a été envoyé à <strong>{email}</strong>. Veuillez vérifier votre boîte de réception.</p>
                    {/* <Link to={'/Maman.tg/Login'}>Retour à la connexion</Link> */}
                </div>
            )
            }
        </>
    );
}

export default ForgotPassword;

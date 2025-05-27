// import React from 'react'
import { useEffect, useState } from 'react';
import './Forms.css'
import { Link } from 'react-router-dom';

function Forms() {

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    card_id: '',
    city: '',
    phone_number: '',
    name: '',
    description: '',
    address: '',
    identityFile: null,
    latitude: '',
    longitude: ''

  });
  const [center, setCenter] = useState({ lat: 6.1622664, lng: 1.2270642 });
  const [userLocation, setUserLocation] = useState(null);
  const [errors, setErrors] = useState({})
  const [valid, setValid] = useState(true)

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const nextStep = () => { if (validateForm()) { setStep(step + 1);}}
  const prevStep = () => setStep(step - 1);

  const validateForm = () => {
    let isvalid = true;
    let validationErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) {
        isvalid = false;
        validationErrors.name = "Le nom de la boutique est requis";
      }
      if (!formData.city.trim()) {
        isvalid = false;
        validationErrors.city = "La ville est requise";
      }
      if (!formData.phone_number.trim()) {
        isvalid = false;
        validationErrors.phone_number = "Le numéro de téléphone est requis";
      } else if (!/^\d{8}$/.test(formData.phone_number)) {
        isvalid = false;
        validationErrors.phone_number = "Le numéro de téléphone doit contenir 8 chiffres";
      }

    }
    if (step === 2) {
      if (!formData.card_id.trim()) {
        isvalid = false;
        validationErrors.card_id = "Le numéro de la carte d'identité est requis";
      }
      if (!formData.description.trim()) {
        isvalid = false;
        validationErrors.description = "La description de la boutique est requise";
      }
      if (!formData.address.trim()) {
        isvalid = false;
        validationErrors.address = "L'adresse physique est requise";
      }
    }
    if (step === 3) {
      if (!formData.identityFile) {
        isvalid = false;
        validationErrors.identityFile = "Le fichier d'identité est requis";
      } else if (!/\.(jpg|jpeg|png|pdf)$/i.test(formData.identityFile.name)) {
        isvalid = false;
        validationErrors.identityFile = "Le fichier doit être une image (jpg, jpeg, png) ou un PDF";
      }
    }
    setErrors(validationErrors);
    setValid(isvalid);
    return isvalid;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

// if (!validateForm()) return;

    console.log('Données envoyées :', formData);
    setSubmitted(true);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
          setUserLocation({ lat: latitude, lng: longitude });


        },
        (error) => {
          console.error("Erreur de géolocalisation :", error);
        }
      );
    } else {
      console.log("La géolocalisation n'est pas supportée par ce navigateur.");
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      setFormData((prevData) => ({
        ...prevData,
        latitude: userLocation.lat,
        longitude: userLocation.lng,
      }));
    }
  }, [userLocation]);


  if (submitted) {
    return (
      <div className="shop-form-container">
        <h2 className="form-title">Démande de création de compte envoyée avec succès !</h2>
        <p>Un email de réponse vous sera envoyer après vérification...</p>
        <Link to={'/Maman.Tg/suivi_demande'}><button>OK</button></Link>
      </div>
    );
  }


  return (
    <>
      <div className="forms">
        <h2 className="form-title">Création de Boutique - Étape {step} / 4</h2>
        <form onSubmit={handleSubmit} className="shop-form">

          {step === 1 && (
            <>
              <div className="form-group">
                <label>Nom de la boutique</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label>Ville</label>
                <input type="text" name="city" required value={formData.city} onChange={handleChange} />
                {errors.city && <span className="error">{errors.city}</span>}
              </div>
              <div className="form-group">
                <label>Téléphone</label>
                <input type="number" name="phone_number" required value={formData.phone_number} onChange={handleChange} />
                {errors.phone_number && <span className="error">{errors.phone_number}</span>}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="form-group">
                <label>Numéro de la carte d'identité</label>
                <input type="number" name="card_id" required value={formData.card_id} onChange={handleChange} />
                {errors.card_id && <span className="error">{errors.card_id}</span>}
              </div>
              <div className="form-group">
                <label>Description de la boutique</label>
                <textarea name="description" rows="3" required value={formData.description} onChange={handleChange} />
                {errors.description && <span className="error">{errors.description}</span>}
              </div>
              <div className="form-group">
                <label>Adresse physique</label>
                <input type="text" name="address" required value={formData.address} onChange={handleChange} />
                {errors.address && <span className="error">{errors.address}</span>}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="form-group">
                <label>Pièce d'identité (CNI ou carte d'électeur)</label>
                <input type="file" name="identityFile" accept="image/*,.pdf" required onChange={handleChange} />
                {errors.identityFile && <span className="error">{errors.identityFile}</span>}
              </div>
            </>
          )}

          {step === 4 && (
            <div className="form-group">
              <h3>Confirmez les informations :</h3>
              <ul>
                <li><strong>Nom :</strong> {formData.card_id}</li>
                <li><strong>Ville :</strong> {formData.city}</li>
                <li><strong>Téléphone_number :</strong> {formData.phone_number}</li>
                <li><strong>Boutique :</strong> {formData.name}</li>
                <li><strong>Description :</strong> {formData.description}</li>
                <li><strong>Adresse :</strong> {formData.address}</li>
                <li><strong>Fichier :</strong> {formData.identityFile?.name}</li>
                <li><strong>Latitude :</strong> {formData.latitude}</li>
                <li><strong>Longitude :</strong> {formData.longitude}</li>
              </ul>
            </div>
          )}

          <div className="form-navigation">
            {step > 1 && (
              <button type="button" onClick={prevStep} className="nav-btn">Retour</button>
            )}
            {step < 4 && (
              <button type="button" onClick={nextStep} className="nav-btn">Suivant</button>
            )}
            {step === 4 && (
              <button type="submit" className="submit-btn">Soumettre</button>
            )}
          </div>
        </form>
      </div>

    </>
  )
}

export default Forms

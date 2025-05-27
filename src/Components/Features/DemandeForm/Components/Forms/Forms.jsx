// import React from 'react'
import { useState } from 'react';
import './Forms.css'

function Forms() {

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    shopName: '',
    shopDescription: '',
    address: '',
    identityFile: null,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const data = new FormData();
    // for (let key in formData) {
    //   data.append(key, formData[key]);
    // }

    console.log('Données envoyées :', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="shop-form-container">
        <h2 className="form-title">Démande de création de compte envoyée avec succès !</h2>
        <p>Un email de confirmation vous sera envoyer après vérification...</p>
        <button>OK</button>
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
                <label>Nom complet</label>
                <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Téléphone</label>
                <input type="number" name="phone" required value={formData.phone} onChange={handleChange} />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="form-group">
                <label>Nom de la boutique</label>
                <input type="text" name="shopName" required value={formData.shopName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Description de la boutique</label>
                <textarea name="shopDescription" rows="3" required value={formData.shopDescription} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Adresse physique</label>
                <input type="text" name="address" required value={formData.address} onChange={handleChange} />
              </div>
            </>
          )}

          {step === 3 && (
            <div className="form-group">
              <label>Pièce d'identité (CNI ou carte d'électeur)</label>
              <input type="file" name="identityFile" accept="image/*,.pdf" required onChange={handleChange} />
            </div>
          )}

          {step === 4 && (
            <div className="form-group">
              <h3>Confirmez les informations :</h3>
              <ul>
                <li><strong>Nom :</strong> {formData.fullName}</li>
                <li><strong>Email :</strong> {formData.email}</li>
                <li><strong>Téléphone :</strong> {formData.phone}</li>
                <li><strong>Boutique :</strong> {formData.shopName}</li>
                <li><strong>Description :</strong> {formData.shopDescription}</li>
                <li><strong>Adresse :</strong> {formData.address}</li>
                <li><strong>Fichier :</strong> {formData.identityFile?.name}</li>
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

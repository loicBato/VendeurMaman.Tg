// import React from 'react'

import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../../../../Utils/Axios";
// import { toast } from "react-toastify";

function ViewProduct({ product, handleCloseModal }) {

  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate()


  const [updatedProduct, setUpdatedProduct] = useState({
    name: '',
    price: '',
    old_prices: '',
    mini_description: '',
    description: '',
    stock: '',
    limit_threshold: '',
    out_of_stock_threshold: '',
  });


  useEffect(() => {
    if (product) {
      setUpdatedProduct({
        name: product.name || '',
        price: product.price || '',
        old_prices: product.old_prices || '',
        mini_description: product.mini_description || '',
        description: product.description || '',
        stock: product.stock || '',
        out_of_stock_threshold: product.out_of_stock_threshold || '',
        limit_threshold: product.limit_threshold || '',
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({
      ...updatedProduct,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    Axios.put(`/vendeur/items/${product.ref}`, updatedProduct)
      .then((response) => {
        // setUpdatedProduct(response.data.data.articles)
        
        toast.success("Modification effectuée !", {
          position: "top-right"
      });
      handleCloseModal()
        // alert('La modification a été bien effectuée')
        // navigate('/listproduct')
        console.log('Article mis à jour avec succès!', response.data);

      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de l'article :", error);
      });
      
  };

  return (
    <>
      <div className="viewproduct">
        <form onSubmit={handleSubmit}>
          <div className="modal-form">

            <div className="form">
              <div className="form-group">
                <label htmlFor='name'>Nom du produit</label>
                <input name='name' type='text' value={updatedProduct.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor='stock'>Quantité</label>
                <input name='stock' type='number' value={updatedProduct.stock} onChange={handleChange} />
              </div>
            </div>

            <div className="form">
              <div className="form-group">
                <label htmlFor='old_prices'>Ancien Prix</label>
                <input name='old_prices' type='number' value={updatedProduct.price} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor='price'>Nouveau Prix</label>
                <input name='price' type='number' onChange={handleChange} />
              </div>
            </div>

            <div className="form">
              <div className="form-group">
                <label htmlFor='limit_threshold'>Quantité limite du stock</label>
                <input name='limit_threshold' type='number' value={updatedProduct.limit_threshold} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor='out_of_stock_threshold'>Quantité de rupture du stock</label>
                <input name='out_of_stock_threshold' type='number' value={updatedProduct.out_of_stock_threshold} onChange={handleChange} />
              </div>
            </div>

            <div className="form">
              <div className="form-group">
                <label htmlFor="mini_description">Mini description</label>
                <textarea name="mini_description" rows="4" value={updatedProduct.mini_description} onChange={handleChange}></textarea>
              </div>
              <div className="form-group">
                <label htmlFor='description'>Description</label>
                <textarea name="description" rows="4" value={updatedProduct.description} onChange={handleChange}></textarea>
              </div>
            </div>
          </div>
          <div className="modal-button">
            <button type="button" onClick={handleCloseModal} style={{background: 'rgb(243, 243, 243)', color: 'black', border: '1px solid rgb(175, 178, 181)'}}>Annuler</button>
            {/* <button className='btn' style={{ background: '#EE4E4E' }} onClick={handleCloseModal}>Annuler</button> */}
            <button type='submit' style={{ background: 'rgb(11, 85, 89)' }} className='btn'>
              {isLoading ? <div className="btnc_spinner"></div> : "Modifier"}

            </button>
          </div>
        </form>

      </div>

    </>
  )
}

export default ViewProduct

import './AddProduct.css';
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { IoImagesOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import Axios from '../../../../Utils/Axios';

function AddProduct() {

  const [imageFiles, setImageFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  // const navigate = useNavigate();

  const [values, setValues] = useState({
    name: '',
    categorie_refs: [],
    price: '',
    stock: '',
    description: '',
    mini_description: '',
    limit_threshold: '',
    out_of_stock_threshold: '',
  });

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);

  useEffect(() => {
    Axios.get('/admin/categories')
      .then(response => {
        setCategories(response.data.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des catégories:', error);
      });
  }, []);


// Fonction de gestion de la sélection de la catégorie
const handleCategoriesSelect = (e) => {
  const selectedCategoryRef = e.target.value;  // On récupère la référence
  const selectedCategory = categories.find(cat => cat.ref === selectedCategoryRef);

  if (selectedCategory) {
    setSubCategories(selectedCategory.children); // Mettre à jour les sous-catégories
    setValues(prevValues => ({
      ...prevValues,
      categorie_refs: [selectedCategory.ref] // Ajouter la référence de la catégorie
    }));
  } else {
    setSubCategories([]);
    setValues(prevValues => ({
      ...prevValues,
      categorie_refs: [] // Si aucune catégorie n'est sélectionnée, réinitialiser categorie_refs
    }));
  }
};

// Fonction de gestion de la sélection de la sous-catégorie
const handleSousCategoriesSelect = (e) => {
  const selectedSubCategoryRef = e.target.value;  // On récupère la référence
  const selectedSubCategory = subCategories.find(sub => sub.ref === selectedSubCategoryRef);

  if (selectedSubCategory) {
    setValues(prevValues => ({
      ...prevValues,
      categorie_refs: [...prevValues.categorie_refs, selectedSubCategory.ref] // Ajouter la référence de la sous-catégorie
    }));
  }
};

  


  const validateForm = () => {
    let isValid = true;
    let validationErrors = {};
    if (!values.name) {
      isValid = false;
      validationErrors.name = "Le nom de l'article est requis";
    }
    if (!values.price) {
      isValid = false;
      validationErrors.price = "Le prix de l'article est requis";
    }
    if (!values.description) {
      isValid = false;
      validationErrors.description = "La description de l'article est requise";
    }
    // if (!values.mini_description) {
    //   isValid = false;
    //   validationErrors.mini_description = "La mini-description de l'article est requise";
    // }
    if (!values.stock) {
      isValid = false;
      validationErrors.stock = "La quantité de l'article est requise";
    }
    if (!values.limit_threshold) {
      isValid = false;
      validationErrors.limit_threshold = "Indiquez la quantité limite du stock.";
    }
    if (!values.out_of_stock_threshold) {
      isValid = false;
      validationErrors.out_of_stock_threshold = "Indiquez la quantité de rupture de stock.";
    }

    if (values.categorie_refs.length === 0) {
      isValid = false;
      validationErrors.categorie_refs = "La sous-catégorie de l'article est requise";
    }
    setErrors(validationErrors);
    setValid(isValid);
    return isValid;
  };

  const imageHandler = (event) => {
    const files = Array.from(event.target.files);
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
    const filteredFiles = files.filter(file => validImageTypes.includes(file.type));

    if (filteredFiles.length !== files.length) {
      toast.error("Format d'image non valide !", {
        position: "top-center"
      });

      // alert("Certains fichiers ne sont pas des images valides ou ne sont pas dans un format supporté.");
    }

    setImageFiles(filteredFiles);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    console.log('Valeurs envoyées:', values);

    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('categorie_refs', JSON.stringify(values.categorie_refs));
      formData.append('price', values.price);
      formData.append('stock', values.stock);
      formData.append('description', values.description);
      formData.append('mini_description', values.mini_description);
      formData.append('limit_threshold', values.limit_threshold);
      formData.append('out_of_stock_threshold', values.out_of_stock_threshold);

      imageFiles.forEach(file => {
        formData.append('images[]', file);
      });


      await Axios.post('/admin/items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success("Article ajouté avec succès !", {
        position: "top-center"
      });

      // alert('Article ajouté avec succès');
      setValues({
        name: '',
        categorie_refs: [],
        price: '',
        stock: '',
        description: '',
        mini_description: '',
        limit_threshold: '',
        out_of_stock_threshold: '',
      });
      setImageFiles([]);
      setErrors({});
      setValid(true);

      // navigate('/Maman.tg/addproduct');
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'article:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      <div className="addproduct">
        <div className="addproduct-top">
          <h2>Ajout des articles</h2>
        </div>
        <div className="addproduct-main">
          <form onSubmit={handleSubmit}>
            <div className="addproduct-form">
              <div className="product-image">
                <div className="grid-container">
                  <div className="item1">
                    <label htmlFor="file-input">
                      {imageFiles.length > 0 ? (
                        imageFiles.map((file, index) => (
                          // <img key={index} src={URL.createObjectURL(file)} alt='' className="addproduct-thumnail" />
                          <img
                            key={index}
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index + 1}`}
                            className="addproduct-thumbnail"
                            style={{ width: '119px', height: '119px', margin: '5px' }}
                          />
                        ))
                      ) : (
                        <IoImagesOutline size={100} className='addproduct-thumnail' color="#ccc" />
                      )}
                    </label>
                    <input onChange={imageHandler} type="file" id="file-input" multiple hidden />
                  </div>
                </div>

                <div className="product-name">
                  <p>Choisissez une image pour les affichages de l'article.</p>
                  {imageFiles.length > 0 && <p>{imageFiles.length} image(s) sélectionnée(s)</p>}
                </div>

                <div className="product-name">
                  <label htmlFor="description">Description</label>
                  <textarea name="description" cols="25" rows="5" onChange={e => setValues({ ...values, description: e.target.value })}></textarea>
                  {!valid && <span className="input_span">{errors.description}</span>}
                </div>
              </div>


              <div className="product-information">
                <fieldset>

                  <legend>Informations de l'article</legend>
                  <div className="product-name">
                    <label htmlFor="name">Nom de l'article</label>
                    <input type="text" name="name" onChange={e => setValues({ ...values, name: e.target.value })} />
                    {!valid && <span className="input_span">{errors.name}</span>}
                  </div>

                  <div className="product-section">
                    <div className="product-name">
                      <label htmlFor="price">Prix</label>
                      <input type="number" name="price" onChange={e => setValues({ ...values, price: e.target.value })} />
                      {!valid && <span className="input_span">{errors.price}</span>}
                    </div>
                    <div className="product-name">
                      <label htmlFor="stock">Quantité de stock</label>
                      <input type="number" name="stock" onChange={e => setValues({ ...values, stock: e.target.value })} />
                      {!valid && <span className="input_span">{errors.stock}</span>}
                    </div>
                  </div>

                  <div className="product-section">
                    <div className="product-name">
                      <label htmlFor="categories">Catégorie</label>
                      <select name="categories" onChange={handleCategoriesSelect}>
                        <option value="">Sélectionnez la catégorie</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.ref}>{category.name}</option>
                        ))}
                      </select>
                      {!valid && <span className="input_span">{errors.categorie_refs}</span>}
                    </div>

                    <div className="product-name">
                      <label htmlFor="sousCategories">Sous-catégorie</label>
                      <select name="sousCategories" onChange={handleSousCategoriesSelect}>
                        <option value="">Sélectionnez une sous-catégorie</option>
                        {subCategories.map(subCategory => (
                          <option key={subCategory.id} value={subCategory.ref}>{subCategory.name}</option>
                        ))}
                      </select>
                      {!valid && <span className="input_span">{errors.categorie_refs}</span>}
                    </div>
                  </div>

                  <div className="product-name">
                    <label htmlFor="mini_description">Mini-description</label>
                    <input type="text" name="mini_description" onChange={e => setValues({ ...values, mini_description: e.target.value })} />
                    {/* {!valid && <span className="input_span">{errors.mini_description}</span>} */}
                  </div>

                  <div className="product-section" style={{ paddingTop: '0.6vw' }}>
                    <div className="product-name">
                      <label htmlFor="limit_threshold">Quantité limite du stock</label>
                      <input type="number" name="limit_threshold" onChange={e => setValues({ ...values, limit_threshold: e.target.value })} />
                      {!valid && <span className="input_span">{errors.limit_threshold}</span>}
                    </div>
                    <div className="product-name">
                      <label htmlFor="out_of_stock_threshold">Quantité de rupture du stock</label>
                      <input type="number" name="out_of_stock_threshold" onChange={e => setValues({ ...values, out_of_stock_threshold: e.target.value })} />
                      {!valid && <span className="input_span">{errors.out_of_stock_threshold}</span>}
                    </div>
                  </div>


                </fieldset>
                <button type="submit" className='addproduct-btn'>Ajouter l'article</button>
              </div>
            </div>
          </form>
        </div>  
      </div>
    </>
  );
}

export default AddProduct;

/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import Modale from 'react-modal';
import { MdNavigateNext, MdDeleteForever } from 'react-icons/md';
import { GrFormPrevious } from 'react-icons/gr';
import { MdOutlineFileDownload } from "react-icons/md";
// import { PiExportLight } from "react-icons/pi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import { FiEdit } from 'react-icons/fi';
import ViewProduct from './ViewProduct';
import './ListProduct.css';
import deconnexion from '../../../../Assets/deconnexion.png';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Axios from '../../../../Utils/Axios';



function ListProduct() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openModale, setOpenModale] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  // const [filteredRecords, setFilteredRecords] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [paginationLinks, setPaginationLinks] = useState({});
  const componentRef = useRef();


  useEffect(() => {
    fetchData(currentPage, search, statusFilter);
  }, [currentPage, search, statusFilter]);
  

  const fetchData = (page, name = '', status = '') => {

let url = `/admin/items?page=${page}`;
if (name) url += `&name=${encodeURIComponent(name)}`;
if (status) url += `&status=${encodeURIComponent(status)}`;

    Axios.get(url)
      .then((result) => {
        const articlesWithImages = result.data.data.items.map(article => ({
          ...article,
          images: article.images.map(image => ({
            id: image.id,
            titre: image.titre,
            url: `https://maman.cofalab.com/api/items/${article.ref}/image`
          })),
          // status: article.quantite <= 5 ? 'Rupture' : 'Insuffisant'
          //   && article.quantite <= 10 ? 'Insuffisant' : 'Disponible'
        }));
        setData(articlesWithImages);
        setPageCount(result.data.data.meta.last_page);
        setPaginationLinks(result.data.data.links)
      })
      .catch((error) => {
        console.error("Erreur d'API : ", error);
      });
  };

  // const filteredData = data
  //   .filter((product) => {
  //     const matchesSearch = search.toLowerCase() === '' || product.name.toLowerCase().includes(search.toLowerCase());
  //     const matchesStatus = statusFilter === '' || (product.status && product.status.toLowerCase() === statusFilter.toLowerCase());

  //     return matchesSearch && matchesStatus;
  //   });
  // const recordsPerPage = 25;
  // const lastIndex = currentPage * recordsPerPage;
  // const firstIndex = lastIndex - recordsPerPage;
  // const records = filteredRecords.slice(firstIndex, lastIndex);
  // const nPage = Math.ceil(filteredRecords.length / recordsPerPage);
  // const numbers = [...Array(nPage).keys()].map(n => n + 1);

  const handleOpenModal = (product) => {
    if (product) {
      setSelectedArticle(product);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenModale = (product) => {
    setSelectedArticle(product);
    setOpenModale(true);
  };

  const handleCloseModale = () => {
    setOpenModale(false);
  };

  const handleDeleteProduct = async (ref) => {
    try {
      await Axios.delete(`/admin/items/${ref}`);
      setData(prevState => prevState.filter(product => product.ref !== ref));
      handleCloseModale();
    } catch (error) {
      console.error("Erreur lors de la suppression : ", error);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedArticle) {
      handleDeleteProduct(selectedArticle.ref);
      handleCloseModale(true)
    }
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage);
  };

  // const filteredData = data.filter((user) =>
  //   search.toLowerCase() === '' || user.nom.toLowerCase().includes(search.toLowerCase())
  // );

  // const prePage = () => {
  //   if (currentPage > 1) setCurrentPage(currentPage - 1);
  // };

  // const nextPage = () => {
  //   if (currentPage < nPage) setCurrentPage(currentPage + 1);
  // };

  // const changeCPage = (id) => {
  //   setCurrentPage(id);
  // };

  const generatePDF = () => {
    html2canvas(componentRef.current).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      let position = 5;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('invoice.pdf');
    });
  };



  return (
    <>
      <div className="list-product">
        <div className="product-top">
          <h2>Gestion des articles</h2>
        </div>
        <div className="product_action">
          <div className="import">
            {/* <button><PiExportLight size={20} />Exporter</button> */}
            <button type='button' onClick={generatePDF} ><MdOutlineFileDownload size={20} /> Téléchargez</button>
          </div>
          <Link to={'/Maman.tg/addproduct'} style={{ textDecoration: 'none' }}>
            <button style={{ background: 'rgb(40, 184, 131)', color: 'white' }}>
              <IoIosAddCircleOutline size={20} /> Ajouter article </button>
          </Link>
        </div>

        <div className="filtrage">
          <div className="product_filtre">
            <input
              type="text"
              name='filtre'
              placeholder='Recherche articles'
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* <select name="categories" id="">
              <option value="">Categories</option>
            </select> */}
            <select name="Status" id="" onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">Statut</option>
              <option value="Disponible">Disponible</option>
              <option value="Insuffisant">Insuffisant</option>
              <option value="Rupture">Rupture</option>
            </select>
          </div>

          <div className="filtre_name">
            <IoFilterOutline size={20} />
          </div>
        </div>

        <div className="listproduct_main">

          <div className="table-wrapper">
            {data.length === 0 ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '15vh' }}>
                <p>Aucun article trouvée...</p>
              </div>
            ) : (
              <div>
                <table className='table' ref={componentRef}>
                  <thead>
                    <tr>
                      <td>#</td>
                      <td>Image</td>
                      <td>Nom de l'article</td>
                      <td>Mini-description</td>
                      <td>Description</td>
                      <td>Categories</td>
                      {/* <td>Sous categories</td> */}
                      <td>A.Prix</td>
                      <td>Prix</td>
                      <td>Qtes</td>
                      <td>Statut</td>
                      <td>Actions</td>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((product, index) => {
                      const statutText = product.status.charAt(0).toUpperCase() + product.status.slice(1);

                      return (<tr key={product.id}>
                        <td className='achatlivre_td'>{index + 1 + (currentPage - 1) * 20}</td>
                        <td className='achatlivre_td' onClick={() => handleOpenModal(product)}>
                          <img src={product.images.length > 0 ? product.images[0].url : `https://maman.cofalab.com/api/items/${product.ref}/image/`} alt='' className='image' />
                        </td>
                        <td className='achatlivre_td' onClick={() => handleOpenModal(product)}>{product.name}</td>
                        <td className='achatlivre_td'>{product.mini_description}</td>
                        <td className='achatlivre_td'>{product.description}</td>
                        <td className='achatlivre_td'>{product.categories.map(cat => cat.name)}</td>
                        {/* <td className='achatlivre_td'>{product.categories.map(cat => cat.nom)}</td> */}
                        <td className='achatlivre_td'>{product.old_prices && product.old_prices.length > 0
                          ? `${product.old_prices[0].old_price} Fcfa`
                          : 'N/A'}</td>
                        <td className='achatlivre_td'>{product.price} Fcfa</td>
                        <td className='achatlivre_td'>{product.stock}</td>
                        <td className='achatlivre_td'>
                          {/* <span className={`label label-${product.status === 'Rupture' ? 'rupture' : product.status === 'Insuffisant' ? 'insuffisant' : 'disponible'}`}>
                        {product.status}
                      </span> */}
                          <span className={`label label-${product.status}`}> {statutText}</span>
                        </td>
                        <td className='achatlivre_td' style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <FiEdit onClick={() => handleOpenModal(product)} style={{ color: '#50B498', fontSize: '1.2rem', cursor: 'pointer' }} />
                          <MdDeleteForever onClick={() => handleOpenModale(product)} style={{ color: '#EE4E4E', fontSize: '1.4rem', cursor: 'pointer' }} />
                        </td>
                      </tr>
                      )
                    })}
                  </tbody>
                </table>

                <nav>
                  <ReactPaginate
                    previousLabel={<GrFormPrevious />}
                    nextLabel={<MdNavigateNext />}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item1'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item1'}
                    nextLinkClassName={'page-link'}
                    breakClassName={'page-item1'}
                    breakLinkClassName={'page-link'}
                    activeClassName={'active'}
                  // onPageActive={'active'}
                  />
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={modalOpen} className="my-modale-class" style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}>
        <div className="modal" onClick={(e) => {
          if (e.target.className === "modal") handleCloseModal()
        }}>
          <div className="modal-contain">
            <div className="modal_top">
              <h4>Modification de l'article</h4>
              <button onClick={handleCloseModal}>X</button>
            </div>
            {selectedArticle && <ViewProduct product={selectedArticle} handleCloseModal={handleCloseModal} />}
          </div>
        </div>
      </Modal>

      <Modale isOpen={openModale} className="my-modale-class" style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}>
        <div className="modale">
          <div className="delete_main">
            {selectedArticle && (
              <>
                <h3> <img src={deconnexion} alt="" /> Confirmation de suppression </h3>
                <p>Vous êtes sur le point de supprimer l'article <strong>{selectedArticle.nom}</strong> de Maman.Tg</p>
                <p>Êtes-vous sûr de vouloir continuer ?</p>

                <div className="delete_btn">
                  <button onClick={handleCloseModale} style={{ background: 'rgb(243, 243, 243)', color: 'black', border: '1px solid rgb(175, 178, 181)' }}>Annuler</button>
                  <button onClick={handleConfirmDelete}>Supprimer</button>
                </div>
              </>
            )}
          </div>
        </div>
      </Modale>
    </>
  );
}

export default ListProduct;

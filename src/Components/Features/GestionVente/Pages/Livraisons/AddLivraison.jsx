/* eslint-disable no-unused-vars */
// import React from 'react'
import { useEffect, useRef, useState } from 'react'
import './AddLivraison.css'
import Axios from '../Utils/axios';
// import ReactPaginate from 'react-paginate';
// import { GrFormPrevious } from 'react-icons/gr';
// import { MdNavigateNext } from 'react-icons/md';
import ViewLivraisons from './ViewLivraisons';
import Modals from 'react-modal';
import Modal from 'react-modal';
import moment from 'moment';
import ViewPayements from './ViewPayements';

function AddLivraison() {

  const [data, setData] = useState([]);
  const [openModals, setOpenModals] = useState();
  const [openModal, setOpenModal] = useState();
  // const [currentPage, setCurrentPage] = useState(1);
  const [livraisonReference, setLivraisonReference] = useState('');
  const [commandeReference, setCommandeReference] = useState('');
  const [clientName, setClientName] = useState('');
  const [destinataire, setDestinataire] = useState('');
   const [selectedLivraisons, setSelectedLivraisons] = useState(null);
   const [selectedPayement, setSelectedPayement] = useState(null);
  // const [pageCount, setPageCount] = useState(0);
  // const [paginationLinks, setPaginationLinks] = useState({});
  const [transac, setTransac] = useState([]);
  const [transactionReference, setTransactionReference] = useState('');
  const [transactionCommandeReference, setTransactionCommandeReference] = useState('');
  const [transactionClientName, setTransactionClientName] = useState('');
  const [isLivraisonSearchActive, setIsLivraisonSearchActive] = useState(false);
  const [isTransactionSearchActive, setIsTransactionSearchActive] = useState(false);
  const [dateLivraison, setDateLivraison] = useState('');



  const handleOpenModals = (livraison) => {
    setSelectedLivraisons(livraison)
    setOpenModals(true)
  }

  const handleCloseModals = () => {
    setOpenModals(false)
  }

  const handleOpenModal = (transaction) => {
    setSelectedPayement(transaction)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }


  const modalsStyle = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
  };



  // useEffect(() => {
  //   fetchData(currentPage);
  // }, [currentPage])

  useEffect(() => {

    Axios.get(`/admin/livraisons`)
      .then((result) => {
        setData(result.data.data.livraisons.filter(livraison => livraison.statut === 'attente'));
        // setPageCount(result.data.data.meta.last_page);
        // setPaginationLinks(result.data.data.links)

        console.log("livraisons", result.data.data.livraisons);
      })
      .catch((error) => {
        console.error("Erreur d'API : ", error);
      });
  }, []);

  const handleLivraisonReferenceChange = (e) => {
    setLivraisonReference(e.target.value);
    setIsLivraisonSearchActive(e.target.value.length > 0 || commandeReference.length > 0 || clientName.length > 0 || destinataire.length > 0);
  };
  
  const handleCommandeReferenceChange = (e) => {
    setCommandeReference(e.target.value);
    setIsLivraisonSearchActive(e.target.value.length > 0 || livraisonReference.length > 0 || clientName.length > 0 || destinataire.length > 0);
  };
  
  const handleClientNameChange = (e) => {
    setClientName(e.target.value);
    setIsLivraisonSearchActive(e.target.value.length > 0 || livraisonReference.length > 0 || commandeReference.length > 0 || destinataire.length > 0);
  };
  
  const handleDestinataireChange = (e) => {
    setDestinataire(e.target.value);
    setIsLivraisonSearchActive(e.target.value.length > 0 || livraisonReference.length > 0 || commandeReference.length > 0 || clientName.length > 0);
  };
  
  const filteredData = isLivraisonSearchActive ? data.filter((livraison) => {
      return (
        (livraison.reference.toLowerCase().includes(livraisonReference.toLowerCase()) || livraisonReference === '') &&
        (livraison.commande.commande_reference.toLowerCase().includes(commandeReference.toLowerCase()) || commandeReference === '') &&
        (livraison.user.nom.toLowerCase().includes(clientName.toLowerCase()) || clientName === '') &&
        (livraison.nom.toLowerCase().includes(destinataire.toLowerCase()) || destinataire === '')
      );
    })
  : data;


  // const handlePageClick = (event) => {
  //   const selectedPage = event.selected + 1;
  //   setCurrentPage(selectedPage)
  // }



  // useEffect(() => {
  //   fetchTransac(currentPage);
  // }, [currentPage])

  useEffect(() => {
   
    Axios.get(`/admin/payments`)
      .then((result) => {
        setTransac(result.data.data.payments.filter(payement => payement.type === 'credit'));
        // setPageCount(result.data.data.meta.last_page);
        // setPaginationLinks(result.data.data.links)

        console.log("transactions", result.data.data.payments);
      })
      .catch((error) => {
        console.error("Erreur d'API : ", error);
      });
  }, []);

  const handleTransactionReferenceChange = (e) => {
    setTransactionReference(e.target.value);
    setIsTransactionSearchActive(e.target.value.length > 0 || transactionCommandeReference.length > 0 || transactionClientName.length > 0);
  };
  
  const handleTransactionCommandeReferenceChange = (e) => {
    setTransactionCommandeReference(e.target.value);
    setIsTransactionSearchActive(e.target.value.length > 0 || transactionReference.length > 0 || transactionClientName.length > 0);
  };
  
  const handleTransactionClientNameChange = (e) => {
    setTransactionClientName(e.target.value);
    setIsTransactionSearchActive(e.target.value.length > 0 || transactionReference.length > 0 || transactionCommandeReference.length > 0);
  };

  const getLivraisonIdFromPayement = (payement, livraisons) => {
    const livraison = livraisons.find(livraison => 
      livraison.payement && livraison.payement.id === payement.id
    );
    return livraison ? livraison.id : null;
  };
  
  // useEffect(() => {
 const filteredTransac = isTransactionSearchActive
  ? transac.filter((transaction) => {
      return (
        (transaction.reference.toLowerCase().includes(transactionReference.toLowerCase()) || transactionReference === '') &&
        (transaction.commande.reference.toLowerCase().includes(transactionCommandeReference.toLowerCase()) || transactionCommandeReference === '') &&
        (transaction.user.nom_complet.toLowerCase().includes(transactionClientName.toLowerCase()) || transactionClientName === '')
      );
    })
  : transac;

  const updateLivraisonStatut = () => {
    if (selectedLivraisons) {
      const livraisonRequirement = {
        statut: 'livre',
        nom: selectedLivraisons.user.nom,
        prenom: selectedLivraisons.user.prenom,
        date_livraison: dateLivraison
      };
      console.log('Date de livraison à envoyer:', dateLivraison);

  
      Axios.post(`/admin/engLivraison/${selectedLivraisons.id}`, livraisonRequirement)
        .then((response) => {
          console.log('Statut mis à jour avec succès:', response.data);
          setData((prevData) => prevData.map(livr =>
            livr.id === selectedLivraisons.id ? { ...livr, statut: 'livre', date_livraison: selectedLivraisons.date_livraison } : livr
          ));
          handleCloseModals(); 
        })
        .catch((error) => {
          console.error(`Erreur lors de la mise à jour du statut: ${error.response.data.message}`);
        });
    }
  };

  const updatePayementStatut = () => {
    if (selectedPayement) {

      const livraisonId = getLivraisonIdFromPayement(selectedPayement, data);

    if (!livraisonId) {
      console.error("Aucune livraison associée trouvée.");
      return;
    }

      const payementRequirement = {
        type: 'debit',
        nom_complet: selectedPayement.user.nom_complet,
        livraison_id: livraisonId
      };
  
      Axios.post(`/admin/saveCashPayement`, payementRequirement)
        .then((response) => {
          console.log('Statut mis à jour avec succès:', response.data.data);
          setTransac((prevData) => prevData.map(pay =>
            pay.id === selectedPayement.id ? { ...pay, type: 'debit' } : pay
          ));
          handleCloseModal(); 
        })
        .catch((error) => {
          console.error(`Erreur lors de la mise à jour du statut: ${error.response.data.message}`);
        });
    }
  };

  


  return (
    <>
      <div className="addoption">
        <div className="addlivraison">
          <div className="addlivraison_top">
            <h2>Enregistrer une livraison</h2>
          </div>
          <div className="addlivraison_main">
            <div className="reference">
              <label htmlFor="livraison-reference">Référence de la livraison:</label>
              <input
                type="text"
                id="livraison-reference"
                onChange={handleLivraisonReferenceChange}
                value={livraisonReference}
              />
            </div>
            <div className="reference">
              <label htmlFor="commande-reference">Référence de la commande:</label>
              <input
                type="text"
                id="commande-reference"
                onChange={handleCommandeReferenceChange}
                value={commandeReference}
              />
            </div>
          </div>
          <div className="addlivraison_main">
            <div className="reference">
              <label htmlFor="client-name">Nom du client:</label>
              <input
                type="text"
                id="client-name"
                onChange={handleClientNameChange}
                value={clientName}
              />
            </div>
            <div className="reference">
              <label htmlFor="destinataire">Destinataire:</label>
              <input
                type="text"
                id="destinataire"
                onChange={handleDestinataireChange}
                value={destinataire}
              />
            </div>
          </div>
          <div className='addbtn'>
            <button>Recherche</button>
          </div>
        </div>
  
        <div className="addpayement">
          <div className="addlivraison_top">
            <h2>Enregistrer une transaction</h2>
          </div>
          <div className="addlivraison_main">
            <div className="reference">
              <label htmlFor="transaction-reference">Référence de la transaction:</label>
              <input
                type="text"
                id="transaction-reference"
                onChange={handleTransactionReferenceChange}
                value={transactionReference}
              />
            </div>
            <div className="reference">
              <label htmlFor="transaction-commande-reference">Référence de la commande:</label>
              <input
                type="text"
                id="transaction-commande-reference"
                onChange={handleTransactionCommandeReferenceChange}
                value={transactionCommandeReference}
              />
            </div>
          </div>
          <div className="addlivraison_main">
            <div className="reference">
              <label htmlFor="transaction-client-name">Nom du client:</label>
              <input
                type="text"
                id="transaction-client-name"
                onChange={handleTransactionClientNameChange}
                value={transactionClientName}
              />
            </div>
            <div className="reference">
              <label htmlFor="other">Autre:</label>
              <input type="text" id="other" disabled />
            </div>
          </div>
          <div className='addbtn'>
            <button>Recherche</button>
          </div>
        </div>
      </div>
  
      {isLivraisonSearchActive && filteredData.length > 0 && (
        <div className="addlivraisons-main">
          <div className="livraisons_main">
            <table className='livraisons-table'>
              <thead>
                <tr>
                  <td>#</td>
                  <td>Références</td>
                  <td>Réf commandes</td>
                  <td>Identité client</td>
                  {/* <td>Quartier</td> */}
                  <td>Destinataire</td>
                  <td>Adresse</td>
                  <td>Livraison</td>
                  <td>Statut</td>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((livraison, index) => {
                  const statusText = livraison.statut.charAt(0).toUpperCase() + livraison.statut.slice(1);
  
                  return (
                    <tr key={livraison.id} onClick={() => handleOpenModals(livraison)}>
                      <td className='achatlivre_td'>{index + 1}</td>
                      <td className='achatlivre_td'>{livraison.reference}</td>
                      <td className='achatlivre_td'>{livraison.commande.commande_reference}</td>
                      <td>
                        <strong>{livraison.user.nom} {livraison.user.prenom}</strong>
                      </td>
                      {/* <td className='achatlivre_td'>{livraison.ville}</td> */}
                      <td className='achatlivre_td'>
                        <strong> {livraison.nom} {livraison.prenom} </strong>
                      </td>
                      <td className='achatlivre_td'>{livraison.adresse}</td>
                      <td className='achatlivre_td'>{livraison.destinataire}</td>
                      <td className='achatlivre_td'>
                        <span className={`label labelle-${livraison.statut}`}>
                          {statusText}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* <nav>
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
              />
            </nav> */}
          </div>
        </div>
      )}
  
      { isTransactionSearchActive && filteredTransac.length > 0 && (
        <div className="transaction-main">
          <div className="transaction_main">
            <table className='transaction-table'>
              <thead>
                <tr>
                  <td>#</td>
                  <td>Réf payements</td>
                  <td>Réf commandes</td>
                  <td>Clients</td>
                  <td>Payement</td>
                  <td>Montant</td>
                  <td>Date</td>
                  <td>Statut</td>
                </tr>
              </thead>
              <tbody>
                {filteredTransac.map((transaction, index) => {
                  const modePayementText = transaction.modePayement.charAt(0).toUpperCase() + transaction.modePayement.slice(1);
  
                  return (<tr key={index}  onClick={() => handleOpenModal(transaction)}>
                    <td className='achatlivre_td'>{index + 1 }</td>
                    <td className='achatlivre_td'>{transaction.reference}</td>
                    <td className='achatlivre_td'>{transaction.commande.reference}</td>
                    <td>
                      <strong>{transaction.user.nom_complet}</strong>
                    </td>
                    <td className='achatlivre_td'>
                      <span className={`label label-${transaction.modePayement}`}>
                        {modePayementText}
                      </span>
                    </td>
                    <td className='achatlivre_td'>{transaction.solde}</td>
                    <td className='achatlivre_td'>{moment(transaction.created_at).format('DD-MM-YYYY')}</td>
                    <td className='achatlivre_td'>
                      <span className={`label label-${transaction.type}`}>
                        {transaction.type}
                      </span>
                    </td>
                  </tr>)
                })}
              </tbody>
            </table>
  
            {/* <nav>
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
              />
            </nav> */}
          </div>
        </div>
      )}
  
      <Modals
        isOpen={openModals}
        className="my-modals-class"
        style={modalsStyle}
      >
        <div className="modals" onClick={(e) => {
          if (e.target.className === "modals") handleCloseModals()
        }}>
          <div className="modals_contain">
            <div className="modals_top">
              <h4>Informations de livraisons</h4>
            </div>
            <hr />
            <div>
              {selectedLivraisons && <ViewLivraisons livraison={selectedLivraisons} onDateChange={setDateLivraison} />}
            </div>
            <div className="modals_contain_btn">
              <button onClick={handleCloseModals} style={{background: 'rgb(243, 243, 243)', color: 'black', border: '1px solid rgb(175, 178, 181)'}}>Retour</button>
              <button onClick={updateLivraisonStatut}>Enregistrer</button>
            </div>
          </div>
        </div>
      </Modals>

      <Modal
        isOpen={openModal}
        className="my-modals-class"
        style={modalsStyle}
      >
        <div className="modals" onClick={(e) => {
          if (e.target.className === "modals") handleCloseModal()
        }}>
          <div className="modals_contain">
            <div className="modals_top">
              <h4>Informations de payements</h4>
            </div>
            <hr />
            <div>
              {selectedPayement && <ViewPayements transaction={selectedPayement} />}
            </div>
            <div className="modals_contain_btn">
              <button onClick={handleCloseModal} style={{background: 'rgb(243, 243, 243)', color: 'black', border: '1px solid rgb(175, 178, 181)'}}>Retour</button>
              <button onClick={updatePayementStatut}>Enregistrer</button>
            </div>
          </div>
        </div>
      </Modal>

    </>
  );
  }

export default AddLivraison

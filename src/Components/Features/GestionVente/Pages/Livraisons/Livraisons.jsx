/* eslint-disable no-unused-vars */
import './Livraisons.css';
import { MdOutlineFileDownload } from "react-icons/md";
// import { PiExportLight } from "react-icons/pi";
import { useEffect, useRef, useState } from 'react';
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
// import Modals from 'react-modal'
// import ViewLivraisons from './ViewLivraisons';
import ReactPaginate from 'react-paginate';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Axios from '../../../../Utils/Axios';
import moment from 'moment';


function Livraisons() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  // const [openModals, setOpenModals] = useState();
  const [statusFilter, setStatusFilter] = useState('');
  const [destinataireFilter, setDestinataireFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  // const [filteredRecords, setFilteredRecords] = useState([]);
  // const [selectedLivraisons, setSelectedLivraisons] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [paginationLinks, setPaginationLinks] = useState({});
  const componentRef = useRef();


  // const handleOpenModals = (livraison) => {
  //   setSelectedLivraisons(livraison)
  //   setOpenModals(true)
  // }

  // const handleCloseModals = () => {
  //   setOpenModals(false)
  // }

  // const modalsStyle = {
  //   overlay: {
  //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
  //   }
  // };



  useEffect(() => {
    fetchData(currentPage, search, statusFilter, destinataireFilter);
  }, [currentPage, search, statusFilter, destinataireFilter]);

  const fetchData = (page, ref = '', status = '', recipient = '') => {

let url = `/vendeur/deliveries?page=${page}`;
// if (first_name) url += `&first_name=${encodeURIComponent(first_name)}`;
// if (last_name) url += `&last_name=${encodeURIComponent(last_name)}`;
if (ref) url += `&ref=${encodeURIComponent(ref)}`;
if (status) url += `&status=${encodeURIComponent(status)}`;
if (recipient) url += `&recipient=${encodeURIComponent(recipient)}`;

    Axios.get(url)
      .then((result) => {
        setData(result.data.data.deliveries);
        setPageCount(result.data.data.meta.last_page);
        setPaginationLinks(result.data.data.links)

        console.log("livraisons", result.data.data.deliveries);
      })
      .catch((error) => {
        console.error("Erreur d'API : ", error);
      });
  };

  // useEffect(() => {
  // const filteredData = data.filter((livraison) => {
  //   const matchesSearch = search.toLowerCase() === ''
  //     ? true
  //     : livraison.order.ref.toLowerCase().includes(search)
  //     || livraison.client.ref.toLowerCase().includes(search)
  //     || livraison.client.name.toLowerCase().includes(search);

  //   const matchesStatus = statusFilter === ''
  //     ? true
  //     : livraison.status.toLowerCase() === statusFilter.toLowerCase();

  //   const matchesDestinataire = destinataireFilter === ''
  //     ? true
  //     : livraison.recipient.toLowerCase() === destinataireFilter.toLowerCase();


  //   return matchesSearch && matchesStatus && matchesDestinataire;
  // });

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage)
  }

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


  //   setFilteredRecords(results);
  // }, [data, search, statusFilter, destinataireFilter]);

  // const recordsPerPage = 20;
  // const lastIndex = currentPage * recordsPerPage;
  // const firstIndex = lastIndex - recordsPerPage;
  // const records = filteredRecords.slice(firstIndex, lastIndex);
  // const nPage = Math.ceil(filteredRecords.length / recordsPerPage);
  // const numbers = [...Array(nPage + 1).keys()].slice(1);

  // function prePage() {
  //   if (currentPage !== 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // }

  // function nextPage() {
  //   if (currentPage !== nPage) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // }

  // function changeCPage(id) {
  //   setCurrentPage(id);
  // }

  return (
    <>
      <div className="livraisons">
        <form action="">
          <div className="livraisons-top">
            <h2>Gestion des livraisons</h2>
          </div>
          <div className="livraison_action">
            <div className="product_action">
              <div className="import">
                {/* <button><PiExportLight size={20} /> Exporter</button> */}
                <button type='button' onClick={generatePDF}><MdOutlineFileDownload size={20} /> Télécharger</button>
              </div>
              {/* <Link to={'/Maman.tg/addlivraison'} style={{ textDecoration: 'none' }}>
                <button style={{ background: 'rgb(40, 184, 131)', color: 'white' }} disabled={true}>
                  <IoIosAddCircleOutline size={20} /> Enregistrer une livraison
                </button>
              </Link> */}
            </div>
            <div className="filtrage">
              <div className="product_filtre">
                <input
                  type="text"
                  name={search}
                  placeholder='Entrez la reference'
                  onChange={(e) => setSearch(e.target.value)}
                />
                <select
                  name="Status"
                  id=""
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">Statut</option>
                  <option value="Attente">Attente</option>
                  <option value="Livre">Livre</option>
                </select>

                <select
                  name="recipient"
                  id=""
                  onChange={(e) => setDestinataireFilter(e.target.value)}
                >
                  <option value="">Livraison</option>
                  <option value="moi">Moi</option>
                  <option value="autre">Autre</option>
                </select>

              </div>
            </div>
          </div>
          <div className="livraisons-main">
            <div className="livraisons_main">
              {data.length === 0 ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '15vh' }}>
                  <p>Aucune information de livraison trouvée...</p>
                </div>
              ) : (
                <div>
                  <table className='livraisons-table' ref={componentRef}>
                    <thead>
                      <tr>
                        <td>#</td>
                        <td>Réferences</td>
                        <td>Réf commandes</td>
                        <td>Identité client</td>
                        {/* <td>Date</td> */}
                        {/* <td>Quartier</td> */}
                        <td>Destinataire</td>
                        <td>Adresse</td>
                        <td>Livraison</td>
                        <td>Statut</td>
                        <td>Date livraison</td>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((livraison, index) => {
                        const statusText = livraison.status.charAt(0).toUpperCase() + livraison.status.slice(1);

                        return (
                          <tr key={livraison.id}>
                            <td className='achatlivre_td'>{index + 1 + (currentPage - 1) * 20}</td>
                            <td className='achatlivre_td'>{livraison.ref}</td>
                            <td className='achatlivre_td'>{livraison.order.ref}</td>
                            <td>
                              <strong>{livraison.client.full_name} </strong>
                            </td>
                            {/* <td className='achatlivre_td'>{livraison.created_at}</td> */}
                            {/* <td className='achatlivre_td'>{livraison.ville}</td> */}
                            <td className='achatlivre_td'>
                              <strong> {livraison.last_name} {livraison.first_name} </strong>
                            </td>
                            <td className='achatlivre_td'>{livraison.address}</td>
                            <td className='achatlivre_td'>{livraison.recipient}</td>
                            <td className='achatlivre_td'>
                              <span className={`label labelle-${livraison.status}`}>
                                {statusText}
                              </span>
                            </td>
                            <td className='achatlivre_td'>{moment(livraison.delivery_date).format('DD-MM-YYYY')}</td>
                          </tr>
                        );
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
        </form>
      </div>



      {/* <Modals
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
              {selectedLivraisons && <ViewLivraisons livraison={selectedLivraisons} />}
            </div>
            <div className="modals_contain_btn">
              <button onClick={handleCloseModals} style={{ background: 'rgb(243, 243, 243)', color: 'black', border: '1px solid rgb(175, 178, 181)' }}>Retour</button>
            </div>

          </div>
        </div>
      </Modals> */}

    </>
  );
}

export default Livraisons;

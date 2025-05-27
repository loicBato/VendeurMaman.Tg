import { useEffect, useRef, useState } from 'react';
import './ListTransaction.css';
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
// import ReactToPrint from 'react-to-print';
import { MdOutlineFileDownload } from "react-icons/md";
// import { PiExportLight } from "react-icons/pi";
import ReactPaginate from 'react-paginate';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Axios from '../../../../Utils/Axios';
import moment from 'moment';



function ListTransaction() {

  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  // const [filteredRecords, setFilteredRecords] = useState([]);
  const [filterModePayement, setFilterModePayement] = useState('');
  const [filterStatut, setFilterStatut] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [paginationLinks, setPaginationLinks] = useState({});
  const componentRef = useRef();


  useEffect(() => {
    fetchData(currentPage, search, startDate, endDate, filterModePayement, filterStatut);
  }, [currentPage, search, startDate, endDate, filterModePayement, filterStatut])

  const fetchData = (page, ref = '', created_at = '', updated_at = '', payment_method = '', type = '') => {

    let url = `/vendeur/payments?page=${page}`;
    if (ref) url += `&ref=${encodeURIComponent(ref)}`;
    if (created_at) url += `&created_at=${encodeURIComponent(created_at)}`;
    if (updated_at) url += `&updated_at=${encodeURIComponent(updated_at)}`;
    if (payment_method) url += `&payment_method=${encodeURIComponent(payment_method)}`;
    if (type) url += `&type=${encodeURIComponent(type)}`;

    Axios.get(url)
      .then((result) => {
        setData(result.data.data.payments);
        setPageCount(result.data.data.meta.last_page);
        setPaginationLinks(result.data.data.links)

        console.log("transactions", result.data.data.payments);
      })
      .catch((error) => {
        console.error("Erreur d'API : ", error);
      });
  };

  // useEffect(() => {
  // const filteredData = data.filter((transaction) => {
  //   const matchesSearch = search.toLowerCase() === ''
  //     ? true
  //     : transaction.user_ref.toLowerCase().includes(search)
  //     || transaction.payment_method.toLowerCase().includes(search)
  //     || transaction.ref.toLowerCase().includes(search)
  //     || transaction.order_ref.toLowerCase().includes(search);

  //   const transactionDate = moment(transaction.created_at);
  //   const withinDateRange = (startDate === '' || transactionDate.isSameOrAfter(moment(startDate))) &&
  //     (endDate === '' || transactionDate.isSameOrBefore(moment(endDate)));

  //   const matchesModePayement = filterModePayement === ''
  //     ? true
  //     : transaction.payment_method.toLowerCase() === filterModePayement.toLowerCase();

  //     const matchesStatut = filterStatut === ''
  //     ? true
  //     : transaction.type.toLowerCase() === filterStatut.toLowerCase();


  //   return matchesSearch && withinDateRange && matchesModePayement && matchesStatut;
  // });

  // setFilteredRecords(filteredData);
  // }, [data, search, startDate, endDate, filterModePayement]);

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage);
  };


  // const recordsPerPage = 15;
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

  // const componentRef = useRef();

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
      <div className="list-transaction">
        <form action="">
          <div className="transaction-top">
            <h2>Gestion des transactions</h2>
          </div>
          <div className="product_action">
            <div className="import">
              {/* <button><PiExportLight size={20} /> Exporter</button> */}
              <button type='button' onClick={generatePDF}><MdOutlineFileDownload size={20} /> Télécharger</button>
              {/* <ReactToPrint
                trigger={() => <button><MdOutlineFileDownload size={20} /> Télécharger</button>}
                content={() => componentRef.current}
                documentTitle='Transactions'
                pageStyle='print'
              /> */}
            </div>
            <div className="addPay">
              {/* <Link to={'/Maman.tg/addlivraison'} style={{ textDecoration: 'none' }}>
                <button style={{ background: 'rgb(40, 184, 131)', color: 'white' }}>
                  <IoIosAddCircleOutline size={20} /> Enregistrer une livraison
                </button>
              </Link> */}
            </div>
          </div>

          <div className="filtrage">
            <div className="product_filtre">
              <input
                type="text"
                name='filtre'
                placeholder='Recherche'
                onChange={(e) => setSearch(e.target.value)}
              />
              <select name="modePayement" id="" onChange={(e) => setFilterModePayement(e.target.value)}>
                <option value="">Mode payement</option>
                <option value="Mobile_Money">Mobile_Money</option>
                <option value="Cash">Cash</option>
              </select>
              <select name="statut" id="" onChange={(e) => setFilterStatut(e.target.value)}>
                <option value="">Statut</option>
                <option value="Debit">Debit</option>
                <option value="Credit">Credit</option>
              </select>

            </div>
            <div className="transaction_date">
              <div className="transaction_date1">
                <input
                  type="date"
                  name="debut"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <label htmlFor="debut">Date début</label>
              </div>
              <div className="transaction_date1">
                <input
                  type="date"
                  name="fin"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <label htmlFor="fin">Date fin</label>
              </div>
              <button type="button" onClick={() => setCurrentPage(1)}>Rechercher</button>
            </div>
          </div>

          <div className="transaction-main">
            <div className="transaction_main">
              {data.length === 0 ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '15vh' }}>
                  <p>Aucune transaction trouvée...</p>
                </div>
              ) : (
                <div>
                  <table className='transaction-table' ref={componentRef}>
                    <thead>
                      <tr>
                        <td>#</td>
                        <td>Réf payements</td>
                        <td>Réf commandes</td>
                        <td>Identités clients</td>
                        <td>Payement</td>
                        <td>Montant (CFA)</td>
                        <td>Date</td>
                        <td>Statut</td>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((transaction, index) => {
                        const modePayementText = transaction.payment_method.charAt(0).toUpperCase() + transaction.payment_method.slice(1);

                        return (<tr key={index}>
                          <td className='achatlivre_td'>{index + 1 + (currentPage - 1) * 20}</td>
                          <td className='achatlivre_td'>{transaction.ref}</td>
                          <td className='achatlivre_td'>{transaction.order.ref}</td>
                          <td>
                            <strong>{transaction.client.full_name}</strong>
                          </td>
                          <td className='achatlivre_td'>
                            <span className={`label label-${transaction.payment_method}`}>
                              {modePayementText}
                            </span>

                          </td>
                          <td className='achatlivre_td'>{transaction.amount}</td>
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
    </>
  );
}

export default ListTransaction;

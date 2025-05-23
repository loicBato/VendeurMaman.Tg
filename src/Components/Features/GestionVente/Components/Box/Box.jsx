
import './Box.css'
// import client from '../../../../Assets/client.png'
import transaction from '../../../../Assets/transaction.png'
import achat from '../../../../Assets/achat.png'
// import categorie from '../../../../Assets/C.png'
import article from '../../../../Assets/A.png'
import deliv from '../../../../Assets/deliv.png'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Axios from '../../../../Utils/Axios'


function Box() {

  const [data, setData] = useState('');

  useEffect(() => {
    Axios.get('vendeur/statistics').then((result) => {
        setData(result.data.data);
        console.log("statistics", result)
    })
        .catch((error) => {
            console.error("Erreur  d'API : ", error)
        });

}, []);


  return (
    <>
      <div className="box">
        <div className="box-container">
          <Link to={'/Maman.tg/listtransaction'} style={{ textDecoration: 'none', color: 'black' }}><div className="box-card">
            <div className="box_img">
              <img src={transaction} alt="" />
            </div>
            <div className="box_text">
              <h3>{data.payment_count}</h3>
              <p>Transactions</p>
            </div>
          </div></Link>

          {/* <Link to={'/Maman.tg/users'} style={{ textDecoration: 'none', color: 'black' }}><div className="box-card">
            <div className="box_img">
              <img src={client} alt="" />
            </div>
            <div className="box_text">
              <h3>{data.user_count}</h3>
              <p>Clients</p>
            </div>
          </div></Link> */}

          <Link to={'/Maman.tg/listachat'} style={{ textDecoration: 'none', color: 'black' }}><div className="box-card">
            <div className="box_img">
              <img src={achat} alt="" />
            </div>
            <div className="box_text">
              <h3>{data.order_count}</h3>
              <p>Commandes</p>
            </div>
          </div></Link>

          <Link to={'/Maman.tg/livraisons'} style={{ textDecoration: 'none', color: 'black' }}><div className="box-card">
            <div className="box_img">
              <img src={deliv} alt="" />
            </div>
            <div className="box_text">
              <h3>{data.delivery_count}</h3>
              <p>Livraisons</p>
            </div>
          </div></Link>

          {/* <Link to={'/Maman.tg/categories'} style={{ textDecoration: 'none', color: 'black' }}><div className="box-card">
            <div className="box_img">
              <img src={categorie} alt="" className='cat_img'/>
            </div>
            <div className="box_text">
              <h3>{data.category_count}</h3>
              <p>Catégories d'articles</p>
            </div>
          </div></Link> */}

          <Link to={'/Maman.tg/listproduct'} style={{ textDecoration: 'none', color: 'black' }}><div className="box-card">
            <div className="box_img">
              <img src={article} alt="" className='cat_img'/>
            </div>
            <div className="box_text">
              <h3>{data.item_count}</h3>
              <p>Articles</p>
            </div>
          </div></Link>

        </div>
      </div>

    </>
  )
}

export default Box

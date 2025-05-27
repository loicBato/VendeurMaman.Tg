// import { useContext } from 'react'
import './Gestionnaire.css'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { MdDashboard } from "react-icons/md";
import { BsClipboardPlusFill } from "react-icons/bs";
// import { BiSolidPurchaseTagAlt } from "react-icons/bi";
import { IoIosListBox } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
// import { FaUsers } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
// import { AuthContext } from '../Context/AuthContext';
import { BiSolidPurchaseTagAlt } from 'react-icons/bi';
import { GrTransaction } from 'react-icons/gr';
// import { FaFileInvoice } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
// import { RiCouponFill, RiUserStarFill } from 'react-icons/ri';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AddProduct from '../AddProduct/AddProduct';
import ListProduct from '../ListProduct/ListProduct';
import Dashboard from '../Dashboard/Dashboard';
import Profil from '../Profil/Profil';
import { useContext, useState } from 'react';
// import Router from '../Utils/Router';
import menu from '../../../../Assets/menu.png'
import ListTransaction from '../ListTransaction/ListTransaction';
import Livraisons from '../Livraisons/Livraisons';
import { AuthContext } from '../../../../Context/AuthContext';
import LoginSign from '../../../Authentification/Pages/LoginSignUp/LoginSign';


function Gestionnaire() {

  const { logout } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();


  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    logout();
  };

  //   const { isAuthenticated } = useContext(AuthContext)
  const { isAuthenticated } = useContext(AuthContext)



  return (
    <>
      {isAuthenticated() ? (
        <div className="administrateur">

          <div className="admin">
            <Sidebar collapsed={collapsed} className='sidebar-wrapper'>
              <img
                src={menu}
                alt="Menu"
                onClick={handleToggleSidebar}
                className='sidebar-toggle'
              />
              <Menu iconShape="square"
                menuItemStyles={{
                  button: ({ active }) => ({
                    marginLeft: active ? '0.13vw' : undefined,
                    // backgroundColor: active ? 'rgb(0, 85, 89)' : undefined,
                    backgroundColor: active ? '#80CBC4' : undefined,
                    color: active ? 'rgb(0, 85, 89)' : undefined,
                    borderTopRightRadius: active ? '30px' : undefined,
                    borderBottomRightRadius: active ? '30px' : undefined,
                    borderLeft: active ? '3px' : undefined,
                    borderLeftStyle: active ? 'solid' : undefined,
                    borderLeftColor: active ? 'rgb(0, 85, 89)' : undefined,

                  })

                }}
              >
                <span>
                  <h4>Tableau</h4>
                </span>
                <MenuItem
                  component={<Link to="/Maman.tg/gestionnaire/tableau" />}
                  active={location.pathname.endsWith('/gestionnaire/tableau')}
                >
                  <MdDashboard style={{ marginRight: '8px', width: '2vw', fontSize: '0.9vw' }} />Tableau de bord</MenuItem>
                {/* <MenuItem
                  component={<Link to="/Maman.tg/tickets" />}
                  active={location.pathname === '/Maman.tg/tickets'}
                >
                  <BsTicketDetailedFill style={{ marginRight: '8px', width: '2vw', fontSize: '0.9vw' }} />Tickets</MenuItem>


                <MenuItem
                  component={<Link to="/Maman.tg/messages" />}
                  active={location.pathname === "/Maman.tg/messages"}

                >
                  <MdMessage style={{ marginRight: '8px', width: '2vw', fontSize: '0.9vw' }} />Messages</MenuItem> */}

                <span>
                  <h4>Articles</h4>
                </span>
                <MenuItem
                  component={<Link to="/Maman.tg/gestionnaire/addarticles" />}
                  active={location.pathname.endsWith('/gestionnaire/addarticles')}
                >
                  <BsClipboardPlusFill style={{ marginRight: '8px', width: '2vw', fontSize: '0.9vw' }} />Ajouter un article</MenuItem>
                <MenuItem
                  component={<Link to="/Maman.tg/gestionnaire/listarticles" />}
                  active={location.pathname.endsWith('/gestionnaire/listarticles')}
                >
                  <IoIosListBox style={{ marginRight: '8px', width: '2vw', fontSize: '0.9vw' }} />Articles</MenuItem>
                {/* <MenuItem
                  component={<Link to="/Maman.tg/categories" />}
                  active={location.pathname === '/Maman.tg/categories'}
                >
                  <BiSolidCategory style={{ marginRight: '8px', width: '2vw', fontSize: '0.9vw' }} />Categories</MenuItem> */}

                <span>
                  <h4>Commandes</h4>
                </span>
                <MenuItem
                  component={<Link to="/Maman.tg/gestionnaire/listachat" />}
                  active={location.pathname.endsWith('/gestionnaire/listachat')}
                >
                  <BiSolidPurchaseTagAlt style={{ marginRight: '8px', width: '2vw', fontSize: '0.9vw' }} />Commandes</MenuItem>

                <span>
                  <h4>Livraisons</h4>
                </span>
                {/* <MenuItem
                  component={<Link to="/Maman.tg/add_attribution" />}
                  active={location.pathname === '/Maman.tg/add_attribution'}
                >
                  <MdEditLocationAlt style={{ marginRight: '8px', width: '2vw', fontSize: '0.9vw' }} />Attribution livraison</MenuItem>
                <MenuItem
                  component={<Link to="/Maman.tg/attribution" />}
                  active={location.pathname === '/Maman.tg/attribution'}
                >
                  <FaListUl style={{ marginRight: '8px', width: '2vw', fontSize: '0.9vw' }} />Liste attributions</MenuItem> */}
                <MenuItem
                  component={<Link to="/Maman.tg/gestionnaire/livraisons" />}
                  active={location.pathname.endsWith('/gestionnaire/livraisons')}
                >
                  <TbTruckDelivery style={{ marginRight: '8px', width: '2vw', fontSize: '0.9vw' }} />Liste des livraisons</MenuItem>
                {/* <MenuItem
                  component={<Link to="/Maman.tg/zones" />}
                  active={location.pathname === '/Maman.tg/zones'}
                >
                  <FaUserCircle style={{ marginRight: '8px', width: '2vw', fontSize: '0.9vw' }} />Zones</MenuItem> */}

                <span>
                  <h4>Paiement</h4>
                </span>
                <MenuItem
                  component={<Link to="/Maman.tg/gestionnaire/transaction" />}
                  active={location.pathname.endsWith('/gestionnaire/transaction')}
                >
                  <GrTransaction style={{ marginRight: '8px', width: '2vw', fontSize: '0.9vw' }} />Transactions</MenuItem>

                {/* <span>
                  <h4>Coupons & Promotions</h4>
                </span>
                <MenuItem
                  component={<Link to="/Maman.tg/listcoupons" />}
                  active={location.pathname === '/Maman.tg/listcoupons'}
                >
                  <RiCouponFill style={{ marginRight: '8px', width: '2vw', fontSize: '0.9vw' }} />Liste des coupons</MenuItem>
                <MenuItem
                  component={<Link to="/Maman.tg/listpromotions" />}
                  active={location.pathname === '/Maman.tg/listpromotions'}
                >
                  <RiCouponFill style={{ marginRight: '8px', width: '2vw', fontSize: '0.9vw' }} />Liste des promotions</MenuItem>
                <MenuItem
                  component={<Link to="/Maman.tg/addcoupons" />}
                  active={location.pathname === '/Maman.tg/addcoupons'}
                >
                  <FaEdit style={{ marginRight: '8px', width: '2vw', fontSize: '0.9vw' }} />Editer coupons</MenuItem>
                <MenuItem
                  component={<Link to="/Maman.tg/addpromotions" />}
                  active={location.pathname === '/Maman.tg/addpromotions'}
                >
                  <FaEdit style={{ marginRight: '8px', width: '2vw', fontSize: '0.9vw' }} />Editer promotions</MenuItem>
 */}

                {/* <span>
                  <h4>Utilisateurs</h4>
                </span>
                <MenuItem
                  component={<Link to="/Maman.tg/livreurs" />}
                  active={location.pathname === '/Maman.tg/livreurs'}
                >
                  <RiUserStarFill style={{ marginRight: '8px', width: '2vw', fontSize: '0.9vw' }} />Livreurs</MenuItem>
                <MenuItem
                  component={<Link to="/Maman.tg/users" />}
                  active={location.pathname === '/Maman.tg/users'}
                >
                  <FaUsers style={{ marginRight: '8px', width: '2vw', fontSize: '0.9vw' }} />Utilisateurs</MenuItem>
 */}
                <span>
                  <h4>Compte</h4>
                </span>
                <MenuItem
                  component={<Link to="/Maman.tg/gestionnaire/profils" />}
                  active={location.pathname.endsWith('/gestionnaire/profils')}
                >
                  <FaUserCircle style={{ marginRight: '8px', width: '2vw', fontSize: '0.9vw' }} />Profil</MenuItem>

              </Menu>
              <div className='logout'>
                <TbLogout className='side_icon' onClick={handleLogout} style={{ marginRight: '10px', padding: '0.2vw', borderRadius: '0.5vw', fontSize: '1.5vw', color: 'rgb(11, 85, 89)' }} />
              </div>
              <div className='end_side'>Maman.tg</div>
            </Sidebar>

            <div className="main">
              <Routes>
                <Route path="tableau" element={<Dashboard />} />
                <Route path='addarticles' element={<AddProduct />} />
                <Route path='listarticles' element={<ListProduct />} />
                {/* <Route path='/listcommande' element={<ListAchat />} /> */}
                <Route path='/transaction' element={<ListTransaction />} />
                <Route path='/livraisons' element={<Livraisons />} />
                <Route path='profils' element={<Profil />} />
                {/* <Route path="*" element={<h2>Page non trouvée</h2>} /> */}

                <Route index element={<Navigate to="tableau" replace />} />

              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <LoginSign/>
      )}

        </>
  )
}

export default Gestionnaire

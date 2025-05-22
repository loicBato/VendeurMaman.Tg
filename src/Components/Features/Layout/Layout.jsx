/* eslint-disable no-unused-vars */
import Navbar from '../Navbar/Pages/Navbar'
import Footer from '../Footer/Footer'

function Layout({ children }) {
  return (

    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default Layout

// import React from 'react'
import './LandingPage.css'
import Header from "../Components/Header/Header"
import Informations from "../Components/Informations/Informations"
import Motiver from "../Components/Motiver/Motiver"
import Visualiser from '../Components/Visualiser/Visualiser'
import Step from '../Components/Step/Step'

function LandingPage() {
  return (
    <>
      <div className="landing_page">
        <Header />
        <Visualiser />

        <div className="landing_main">
          <Informations />
          <Motiver />
        </div>
        <Step />
        <hr /><hr />
      </div>

    </>
  )
}

export default LandingPage

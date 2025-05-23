import React from 'react'
import './Dashboard.css'
import Card from '../../Components/Box/Card'
import Box from '../../Components/Box/Box'

function Dashboard() {

  return (
    <>
    <div className="dashboard">
        <div className="dashboard-top">
          <h2>Tableau de bord</h2>
        </div>
        <div className="dashboard-main">
          <Card />
          <hr />
          <Box />
          {/* <RevenuTotal /> */}
          {/* <Graphic /> */}
        </div>
      </div>
      
    </>
  )
}

export default Dashboard

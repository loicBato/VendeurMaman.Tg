// import React from 'react'

import { Link } from "react-router-dom"

function LinkAuth({ to, text, main_text }) {
  return (
    <>
      <div className="forgot-password">
      {main_text}
        <span>
            <Link to={to} >
                {text}
            </Link>
            </span>
        </div>
    </>
  )
}

export default LinkAuth

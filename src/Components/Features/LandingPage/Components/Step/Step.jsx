// import React from 'react';
import './Step.css';

function Step() {


  return (
    <>
      <div className="step">
        <div className="step_container">
          <h1>Devient vendeur et gère ta boutique en 3 étapes simples:</h1>
          <div className="progress_container">
            <div className="progress_step">
              <div className="circle">1</div>
              <p>
                <strong>Leave your information</strong><br />
              </p>
            </div>
            <div className="progress_line" />
            <div className="progress_step">
              <div className="circle">2</div>
              <p>
                <strong>Select a plan and pay</strong>
              </p>
            </div>
            <div className="progress_line" />
            <div className="progress_step">
              <div className="circle">3</div>
              <p>
                <strong>Verify your business</strong>
              </p>
            </div>
          </div>
          <div className="step_button">
            <button>Commencer à vendre</button>

          </div>
        </div>
      </div>

    </>
  );
}

export default Step;

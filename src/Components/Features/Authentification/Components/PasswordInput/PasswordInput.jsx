// import React from 'react'

import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs"

function PasswordInput({ value, onChange, error, showPassword, togglePassword }) {

    return (
        <>
            <div className="input">
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={value}
                    onChange={onChange}
                />
                <label>Mot de passe</label>
                <span className="toggle_password" onClick={togglePassword}>
                    {showPassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                </span>

            </div>
            {
                error &&
                <span className="input_span">
                    {error}
                </span>
            }
        </>
    )
}

export default PasswordInput

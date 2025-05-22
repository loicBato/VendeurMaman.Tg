// import React from 'react'

function FormInput({ type, name, value, onChange, label, error }) {

    return (
        <>
            <div className="input">
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
                <label>{label}</label>
                
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

export default FormInput

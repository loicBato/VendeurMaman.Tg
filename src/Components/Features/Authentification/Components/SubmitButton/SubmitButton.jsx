


function SubmitButton({ isLoading, text }) {

    return (
        <>
        <div className="submit-container">
            <button type="submit" className="btn_connexion" disabled={isLoading}>
                {isLoading ? <div className="btnc_spinner"></div> : text}
            </button>
        </div>
        </>
    );
}

export default SubmitButton;
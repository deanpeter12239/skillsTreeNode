import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./app.css";

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal d-block" : "modal d-none";

    return (
        <div className={showHideClassName}>
            <div className="modal-container">
                {children}
                <a href="javascript:;" className="modal-close" onClick={handleClose}> Close </a>
            </div>
        </div>
    );
};

export default Modal;

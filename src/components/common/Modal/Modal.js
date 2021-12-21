import React from "react";
import { Modal as BulmaModal } from "react-bulma-components";

const Modal = ({ show = true, handleClose = () => {}, children }) => {
    return (
        <BulmaModal show={show} onClose={handleClose}>
            <BulmaModal.Content>{children}</BulmaModal.Content>
        </BulmaModal>
    );
};

export default Modal;

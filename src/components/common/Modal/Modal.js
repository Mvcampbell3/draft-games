import React from "react";
import { Modal as BulmaModal } from "react-bulma-components";

const Modal = ({
    show = true,
    handleClose = () => {},
    children,
    className = "",
}) => {
    return (
        <BulmaModal show={show} onClose={handleClose} className={className}>
            <BulmaModal.Content>{children}</BulmaModal.Content>
        </BulmaModal>
    );
};

export default Modal;

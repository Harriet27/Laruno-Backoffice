import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Styled from 'styled-components';

// --- Styled Components --- //
const ButtonModal = Styled.button`
background-color: #0098DA;
color: white;
width: 100%;
padding: 5px;
font-size: 18px;
font-weight: 400;
border-radius: 3px;
border: 1px solid #ced4da;
&:focus{
outline: none !important;
border:1px solid #66AFE9;
}
`;
// --- Styled Components --- //

const ModalOrder = (props) => {
    const { buttonLabel, className, style, modalBody } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div>
            <ButtonModal style={style} onClick={toggle}>
                {buttonLabel}
            </ButtonModal>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>{modalBody}</ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>
                        Do Something
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default ModalOrder;

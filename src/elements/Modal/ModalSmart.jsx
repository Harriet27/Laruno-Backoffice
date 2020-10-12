import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Styled from 'styled-components';
import { md } from '../../elements/Styled/StyledForm';
// --- Styled Components --- //

const ButtonLink = Styled.button`
    background-color:${(props) => (props.detail ? 'grey' : '#0098DA')};
    padding: 5px;
    border-radius: 3px;
    color: white;
    font-size: ${md};
    border: 1px solid #ced4da;
    font-Weight: 400;
`;
// --- Styled Components --- //

const ModalSmart = (props) => {
    const {
        buttonLabel,
        className,
        style,
        component,
        children,
        title,
        onClickConfirm,
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div>
            <ButtonLink style={style} onClick={toggle}>
                {buttonLabel}
            </ButtonLink>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>{title}</ModalHeader>
                <ModalBody>
                    {/* modal body untuk isi content bisa dengan html */}
                    {children}
                </ModalBody>
                <ModalFooter>
                    {/* onClickConfirm bisa berfungsi untuk mengkonusmi api */}
                    <Button color="primary" onClick={onClickConfirm}>
                        Confirm
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default ModalSmart;

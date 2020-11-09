import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ButtonLink } from '../../elements/Styled/StyledTabs';
import CreateIcon from '@material-ui/icons/Create';

import InputUpdateUser from './InputUpdateUser';

const UpdateUser = (props) => {
    const { className } = props;
    const [modal, setModal] = useState({
        open: false,
        id: null,
    });

    console.log(modal, 'mau tahu modal di order');
    const toggle = () =>
        setModal({
            ...modal,
            open: !modal.open,
            id: props.id,
        });
    return (
        <div>
            <ButtonLink onClick={toggle}>
                <CreateIcon fontSize="small" />
            </ButtonLink>
            <Modal isOpen={modal.open} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Update User</ModalHeader>
                <ModalBody>
                    <InputUpdateUser id={modal.id} toggle={toggle} />
                </ModalBody>
            </Modal>
        </div>
    );
};

export default UpdateUser;

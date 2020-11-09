import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Icon, IconSpan } from '../../elements/Styled/StyledModalPopUp';
import ChildMessage from './ChildMessage';

const FollowUp = (props) => {
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
            <Button
                color="white"
                style={{ padding: '0' }}
                size="sm"
                onClick={toggle}
            >
                <Icon className="fa fa-comment fa-2x" id="button-label-1">
                    <IconSpan>w</IconSpan>
                </Icon>
            </Button>
            <Modal isOpen={modal.open} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Welcome</ModalHeader>
                <ModalBody>
                    <ChildMessage id={modal.id} toggle={toggle} />
                </ModalBody>
            </Modal>
        </div>
    );
};

export default FollowUp;

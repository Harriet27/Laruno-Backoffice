import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Icon, IconSpan } from '../../elements/Styled/StyledModalPopUp';
import CreateIcon from '@material-ui/icons/Create';
import InputUpdateTopic from './InputUpdateTopic';

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
            <Button color="primary" size="sm" onClick={toggle}>
                <CreateIcon fontSize="small" />
            </Button>
            <Modal isOpen={modal.open} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Update Topic</ModalHeader>
                <ModalBody>
                    <InputUpdateTopic id={modal.id} toggle={toggle} />
                </ModalBody>
            </Modal>
        </div>
    );
};

export default FollowUp;

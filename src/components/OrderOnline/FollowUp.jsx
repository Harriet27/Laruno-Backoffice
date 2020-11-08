import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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
            <Button color="danger" onClick={toggle}>
                {/* {buttonLabel} */}
                Open Me
            </Button>
            <Modal isOpen={modal.open} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    {/* <FetchFollowUp id={modal.id} /> */}
                    <ChildMessage id={modal.id} />
                </ModalBody>
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

export default FollowUp;

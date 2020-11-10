import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Icon, IconSpan } from '../../elements/Styled/StyledModalPopUp';
import FetchDetailPopUp from './FetchDetailPopUp';
const DetailPopUp = (props) => {
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
      <Button color="white" style={{ padding: '0' }} size="sm" onClick={toggle}>
        Show More
      </Button>
      <Modal
        style={{ maxWidth: '1000px' }}
        isOpen={modal.open}
        toggle={toggle}
        className={className}
      >
        <ModalHeader toggle={toggle}>Orders Detail</ModalHeader>

        <FetchDetailPopUp id={modal.id} toggle={toggle} />
      </Modal>
    </div>
  );
};

export default DetailPopUp;

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Icon, IconSpan } from '../../../elements/Styled/StyledModalPopUp';
// import FetchDetailPopUp from './FetchDetailPopUp';
const DetailFbAds = (props) => {
  const { className, buttonLabel, orders, id, followup } = props;
  const [modal, setModal] = useState({
    open: false,
  });

  console.log(modal, 'mau tahu modal di order');
  const toggle = () =>
    setModal({
      ...modal,
      open: !modal.open,
    });

  return (
    <div>
      <div onClick={toggle}>{buttonLabel}</div>
      <Modal isOpen={modal.open} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Orders Detail</ModalHeader>
        {/* <FetchDetailPopUp
          id={id}
          orders={orders}
          followup={followup}
          toggle={toggle}
        /> */}
        detail
      </Modal>
    </div>
  );
};

export default DetailFbAds;

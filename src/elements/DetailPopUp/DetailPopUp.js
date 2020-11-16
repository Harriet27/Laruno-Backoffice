import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Icon, IconSpan } from '../../elements/Styled/StyledModalPopUp';
import FetchDetailPopUp from './FetchDetailPopUp';
const DetailPopUp = (props) => {
  const { className, buttonLabel, orders, id } = props;
  const [modal, setModal] = useState({
    open: false,
    id: null,
  });

  console.log(modal, 'mau tahu modal di order');
  const toggle = () =>
    setModal({
      ...modal,
      open: !modal.open,
      id: null,
    });

  // Filter Id //
  const OrdersFilter =
    orders !== undefined &&
    orders.data.filter((item) => {
      return item._id === id;
    });
  const Orders = OrdersFilter[0];

  console.log({ OrdersFilter, Orders }, 'orders filter');
  return (
    <div>
      <div onClick={toggle}>{buttonLabel}</div>
      <Modal
        style={{ maxWidth: '1000px' }}
        isOpen={modal.open}
        toggle={toggle}
        className={className}
      >
        <ModalHeader toggle={toggle}>Orders Detail</ModalHeader>

        <FetchDetailPopUp id={id} orders={Orders} toggle={toggle} />
      </Modal>
    </div>
  );
};

export default DetailPopUp;

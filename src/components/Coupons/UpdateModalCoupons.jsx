import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { ButtonLink } from '../../elements/Styled/StyledTabs';
import CreateIcon from '@material-ui/icons/Create';
import InputUpdateCoupons from './InputUpdateCoupons';

const UpdateModalCoupons = (props) => {
  const { className, coupons, id, payment, product } = props;
  const [modal, setModal] = useState({
    open: false,
  });

  const toggle = () =>
    setModal({
      ...modal,
      open: !modal.open,
    });

  const CouponsFilter =
    coupons !== null &&
    coupons.data.filter((item) => {
      return item._id === id;
    });
  const Coupons = CouponsFilter[0];
  console.log(coupons, 'ini coupons');
  return (
    <div>
      <ButtonLink onClick={toggle}>
        <CreateIcon fontSize="small" />
      </ButtonLink>
      <Modal
        isOpen={modal.open}
        style={{ maxWidth: '700PX', width: '100%' }}
        toggle={toggle}
        className={className}
      >
        <ModalHeader toggle={toggle}>Update Coupons</ModalHeader>
        <ModalBody>
          <InputUpdateCoupons
            id={id}
            coupons={Coupons}
            toggle={toggle}
            payment={payment}
            product={product}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UpdateModalCoupons;

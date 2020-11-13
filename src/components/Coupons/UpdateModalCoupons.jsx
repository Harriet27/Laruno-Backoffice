import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { ButtonLink } from '../../elements/Styled/StyledTabs';
import CreateIcon from '@material-ui/icons/Create';
import InputUpdateCoupons from './InputUpdateCoupons';

const UpdateModalCoupons = (props) => {
  const { className } = props;
  const [modal, setModal] = useState({
    open: false,
    id: null,
  });

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
      <Modal
        isOpen={modal.open}
        style={{ maxWidth: '1000PX' }}
        toggle={toggle}
        className={className}
      >
        <ModalHeader toggle={toggle}>Update Coupons</ModalHeader>
        <ModalBody>
          <InputUpdateCoupons id={modal.id} toggle={toggle} />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UpdateModalCoupons;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetFollowUp, fetchShowOrders } from '../../store/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Icon, IconSpan } from '../../elements/Styled/StyledModalPopUp';
import ChildMessage from './ChildMessage';

const FollowUp = (props) => {
  const dispatch = useDispatch();
  const { className, id, orders, title, number, followup } = props;
  // const followup = useSelector((state) => state.followup.getFollowUp);
  const [modal, setModal] = useState({
    open: false,
  });

  const toggle = () =>
    setModal({
      ...modal,
      open: !modal.open,
    });

  // console.log({ followup, orders }, 'di file followup');
  return (
    <div>
      <Button color="white" style={{ padding: '0' }} size="sm" onClick={toggle}>
        <Icon className="fa fa-comment fa-2x" id="button-label-1">
          <IconSpan>{number}</IconSpan>
        </Icon>
      </Button>
      <Modal isOpen={modal.open} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          <ChildMessage
            id={id}
            orders={orders}
            followup={followup}
            number={number}
            toggle={toggle}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default FollowUp;

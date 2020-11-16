import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetFollowUp, fetchShowOrders } from '../../store/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Icon, IconSpan } from '../../elements/Styled/StyledModalPopUp';
import ChildMessage_1 from './ChildMessage_1';

const FollowUp_1 = (props) => {
  const dispatch = useDispatch();
  const { className, id, orders } = props;
  const followup = useSelector((state) => state.followup.getFollowUp);
  const [modal, setModal] = useState({
    open: false,
  });

  const toggle = () =>
    setModal({
      ...modal,
      open: !modal.open,
    });
  return (
    <>
      <Button color="white" style={{ padding: '0' }} size="sm" onClick={toggle}>
        <Icon className="fa fa-comment fa-2x" id="button-label-1">
          <IconSpan>2</IconSpan>
        </Icon>
      </Button>
      <Modal isOpen={modal.open} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Follow Up 1</ModalHeader>
        <ModalBody>
          <ChildMessage_1
            id={id}
            orders={orders}
            followup={followup !== null && followup}
            toggle={toggle}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default FollowUp_1;

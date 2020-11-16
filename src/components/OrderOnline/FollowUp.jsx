import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetFollowUp, fetchShowOrders } from '../../store/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Icon, IconSpan } from '../../elements/Styled/StyledModalPopUp';
import ChildMessage from './ChildMessage';
import ChildMessage_1 from './ChildMessage_1';

const FollowUp = (props) => {
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
  useEffect(() => {
    dispatch(fetchGetFollowUp(id));
    // eslint-disable-next-line
  }, [dispatch, id]);

  return (
    <div>
      <Button color="white" style={{ padding: '0' }} size="sm" onClick={toggle}>
        <Icon className="fa fa-comment fa-2x" id="button-label-1">
          <IconSpan>1</IconSpan>
        </Icon>
      </Button>
      <Modal isOpen={modal.open} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Welcome</ModalHeader>
        <ModalBody>
          <ChildMessage
            id={id}
            orders={orders}
            followup={followup !== null && followup}
            toggle={toggle}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default FollowUp;

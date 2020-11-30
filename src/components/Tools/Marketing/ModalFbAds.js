import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetTopic } from '../../../store/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Icon, IconSpan } from '../../../elements/Styled/StyledModalPopUp';
import PopUpFbAds from './PopUpFbAds';
// import FetchDetailPopUp from './FetchDetailPopUp';
const ModalFbAds = (props) => {
  const dispatch = useDispatch();
  const { className, buttonLabel, orders, id, followup } = props;
  const [modal, setModal] = useState({
    open: false,
  });
  const topic = useSelector((state) => state.topic.getTopic);
  console.log(modal, 'mau tahu modal di order');
  const toggle = () =>
    setModal({
      ...modal,
      open: !modal.open,
    });

  useEffect(() => {
    dispatch(fetchGetTopic());

    // eslint-disable-next-line
  }, [dispatch]);
  return (
    <div>
      <div onClick={toggle}>{buttonLabel}</div>
      <Modal isOpen={modal.open} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Add New Ads</ModalHeader>
        <PopUpFbAds topic={topic} />
      </Modal>
    </div>
  );
};

export default ModalFbAds;

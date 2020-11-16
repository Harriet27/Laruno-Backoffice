import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ButtonLink } from '../../elements/Styled/StyledTabs';
import CreateIcon from '@material-ui/icons/Create';
import InputUpdateTopic from './InputUpdateTopic';

const UpdateTopic = (props) => {
  const { className, id, topic } = props;
  const [modal, setModal] = useState({
    open: false,
  });

  console.log(modal, 'mau tahu modal di order');
  const toggle = () =>
    setModal({
      ...modal,
      open: !modal.open,
    });
  // --- data use Topic filter --- //
  const TopicFilter =
    topic !== null &&
    topic.data.filter((item) => {
      return item._id === id;
    });
  const Topic = TopicFilter[0];

  console.log(Topic.name, 'INI TOPIC TEST TOPIC');
  return (
    <div>
      <ButtonLink onClick={toggle}>
        <CreateIcon fontSize="small" />
      </ButtonLink>
      <Modal isOpen={modal.open} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Update Topic</ModalHeader>
        <ModalBody>
          <InputUpdateTopic id={id} topic={Topic} toggle={toggle} />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UpdateTopic;

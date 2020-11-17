import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ButtonLink } from '../../elements/Styled/StyledTabs';
import CreateIcon from '@material-ui/icons/Create';

import InputUpdateUser from './InputUpdateUser';

const UpdateUser = (props) => {
  const { className, id, users } = props;
  const [modal, setModal] = useState({
    open: false,
  });

  console.log(modal, 'mau tahu modal di order');
  const toggle = () =>
    setModal({
      ...modal,
      open: !modal.open,
    });

  const UsersFilter =
    users !== null &&
    users.data.filter((item) => {
      return item._id === id;
    });
  const Users = UsersFilter[0];

  console.log(Users, 'INI TOPIC TEST TOPIC');
  return (
    <div>
      <ButtonLink onClick={toggle}>
        <CreateIcon fontSize="small" />
      </ButtonLink>
      <Modal isOpen={modal.open} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Update User</ModalHeader>
        <ModalBody>
          <InputUpdateUser id={id} users={Users} toggle={toggle} />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UpdateUser;

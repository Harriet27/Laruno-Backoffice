import React from 'react';
import { deleteOrder } from '../../store/actions';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
// import { useSelector } from 'react-redux';

const Action = ({ id }) => {
  const onActionChange = (id, status) => {
    if (status === 'delete') {
      deleteOrder(id);
    }
  }

  return (
    <>
      <UncontrolledDropdown>
        <DropdownToggle
          caret
          size="sm"
          color="none"
          style={{
            border: '1px solid #d9dee2',
            background: 'white'
          }}
        >
          Actions
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => onActionChange(id, 'edit')}>
            Edit
          </DropdownItem>
          <DropdownItem style={{ color: 'red' }} onClick={() => onActionChange(id, 'delete')}>
            Delete
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  )
}

export default Action;

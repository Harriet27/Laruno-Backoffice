import React from 'react';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import { actionOrder } from '../../store/actions';

const Actions = ({ id }) => {
  const menuActions = [
    { key: 1, name: 'PENDING' },
    { key: 2, name: 'UNPAID' },
    { key: 3, name: 'PAID' },
    { key: 4, name: 'EXPIRED' }
  ];

  const onActionChange = status => {
    actionOrder(id, status);
  }

  return (
    <>
      <UncontrolledDropdown>
        <DropdownToggle
          size="sm"
          color="none"
          style={{ border: '1px solid #d9dee2', background: 'white' }}
          caret
        >
          Actions
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Actions</DropdownItem>
          {menuActions.map(item => {
            <DropdownItem key={item.key} onClick={() => onActionChange(item.name)}>{item.name}</DropdownItem>
          })}
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  )
}

export default Actions;

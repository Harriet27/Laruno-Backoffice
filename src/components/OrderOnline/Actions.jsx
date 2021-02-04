import React from 'react';
import { actionOrder } from '../../store/actions';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { useSelector } from 'react-redux';

const Actions = ({ id }) => {
  const menuActions = [
    { key: 1, name: 'PENDING' },
    { key: 2, name: 'UNPAID' },
    { key: 3, name: 'PAID' },
    { key: 4, name: 'EXPIRED' }
  ];

  const [update, setUpdate] = React.useState(false);

  const successDetailPayment = useSelector(({ orders }) => orders.successDetailPayment);

  React.useEffect(() => {
    if (update) {
      setUpdate(false);
    }
  }, [update]);

  const onActionChange = status => {
    actionOrder(id, status);
    if (successDetailPayment) {
      setUpdate(true);
    }
  };

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
          {menuActions.map(item => {
            return (
              <DropdownItem key={item.key} onClick={() => onActionChange(item.name)}>
                {item.name}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  )
}

export default Actions;

import React from 'react';
import { useDispatch } from 'react-redux';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import { actionOrder, fetchShowOrders } from '../../store/actions';

const Actions = ({ id }) => {
  const menuActions = [
    { key: 1, name: 'PENDING' },
    { key: 2, name: 'UNPAID' },
    { key: 3, name: 'PAID' },
    { key: 4, name: 'EXPIRED' }
  ];

  const dispatch = useDispatch();

  const [update, setUpdate] = React.useState(false);
  
  React.useEffect(() => {
    if (update) {
      setUpdate(false);
    }
    dispatch(fetchShowOrders(id));
  }, [dispatch, update, id]);

  const onActionChange = status => {
    actionOrder(id, status);
    setUpdate(true);
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

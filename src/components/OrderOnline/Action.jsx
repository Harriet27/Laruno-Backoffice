import React from 'react';
import Swal from 'sweetalert2';
import { deleteOrder } from '../../store/actions';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

const Action = ({ id }, props) => {
  const onActionDelete = (id, status) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => {
      if (result.isConfirmed) {
        if (status === 'delete') {
          deleteOrder(id);
        }
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    })
    .catch((err) => {
      console.log(err);
    })
  };

  const onActionEdit = () => {};

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
          <DropdownItem onClick={() => onActionEdit(id, 'edit')}>
            Edit
          </DropdownItem>
          <DropdownItem style={{ color: 'red' }} onClick={() => onActionDelete(id, 'delete')}>
            Delete
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  )
}

export default Action;

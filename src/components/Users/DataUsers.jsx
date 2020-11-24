import React, { useEffect, useState } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

import { Table } from 'reactstrap';
import Card from '../../elements/Card/Card';
import { useDispatch, useSelector } from 'react-redux';

import DehazeIcon from '@material-ui/icons/Dehaze';
import { Input, Th, Overflow } from '../../elements/Styled/StyledForm';
import moment from 'moment';

// --- Elements, Pages, Components --- //
import MultipleDelete from '../../elements/Alert/MultipleDelete';
import {
  fetchGetUsersAdministrator,
  fetchMultipleDeleteUsers,
} from '../../store/actions';

import AddAdministrator from './AddAdministrator';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';
import { CircularProgress } from '@material-ui/core';
import TotalDataUsers from './TotalDataUsers';
import MultipleActions from '../../elements/MultipleActions/MultipleActions';

const DataUsers = (props) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.userAdministrator);

  // --- useEffect --- Get Data users ---//
  useEffect(() => {
    dispatch(fetchGetUsersAdministrator());
    // eslint-disable-next-line
  }, [dispatch]);

  // --- PAGINATION --- //
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [input, setInput] = useState('');
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleInput = (event) => {
    setInput(event.target.value);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // --- Dropdown --- //
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [form, setForm] = useState({
    id: [],
  });

  // --- handleCheckboxChange --- //
  const handleCheckboxChange = (event) => {
    let newArray = [...form.id, event.target.id];
    if (form.id.includes(event.target.id)) {
      newArray = newArray.filter((item) => item !== event.target.id);
    }
    setForm({
      id: newArray,
    });
  };

  // --- Multiple Delete --- //
  const handleMultipleDelete = (event) => {
    event.preventDefault();
    dispatch(fetchMultipleDeleteUsers(form));
  };

  const usersFilter =
    users !== null &&
    users.data.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });

  const TableHeading = () => {
    return (
      <thead>
        <tr>
          <Th>
            <Input isCheckbox type="checkbox" />
          </Th>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Role</Th>
          <Th>Phone</Th>
          <Th>Created At</Th>
          <Th>Updated At</Th>
          <Th style={{ width: '100px' }}>Actions</Th>
        </tr>
      </thead>
    );
  };

  const TableBody = (item, index) => {
    return (
      <tr key={item._id}>
        <Th>
          <Input
            isCheckbox
            type="checkbox"
            id={item._id}
            value={item._id}
            onChange={handleCheckboxChange}
          />
        </Th>
        <Th as="td" td>
          <div style={Styles.Name}>{item.name}</div>
        </Th>
        <Th as="td" td>
          {item.email}
        </Th>
        <Th as="td" td>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {item.role.map((id) => {
              return <p key={id._id}>{id.adminType} &nbsp;</p>;
            })}
          </div>
        </Th>
        <Th as="td" td>
          {item.phone_number}
        </Th>
        <Th as="td" td>
          {moment(item.created_at).format('DD MMMM YYYY')}
        </Th>
        <Th as="td" td>
          {moment(item.updated_at).format('DD MMMM YYYY')}
        </Th>
        <Th as="td" td>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <UpdateUser id={item._id} users={users} />
            <DeleteUser id={item._id} />
          </div>
        </Th>
      </tr>
    );
  };

  const TableFooter = (length) => {
    return (
      <tr>
        <TablePagination
          rowsPerPageOptions={[10, 15, 20]}
          count={length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </tr>
    );
  };

  const SearchBar = () => {
    return (
      <Table striped>
        {TableHeading()}
        <tbody>
          {usersFilter
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => {
              return TableBody(item, index);
            })}
        </tbody>
        <tfoot>{TableFooter(usersFilter.length)}</tfoot>
      </Table>
    );
  };

  return (
    <>
      <>
        <TotalDataUsers users={users} />
      </>
      <React.Fragment>
        {/* --- section 1 --- Button Action link to Add Product ---*/}
        <MultipleActions
          isLogic={form.id[0]}
          // handleClone={handleMultipleClone}
          handleDelete={handleMultipleDelete}
        />

        <div
          style={{
            margin: '20px 0',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <AddAdministrator />

          <div>
            <Input
              type="search"
              name="search"
              value={input}
              onChange={handleInput}
              placeholder="Search.."
            />
          </div>
        </div>

        <Card isNormal>
          <Overflow>
            {users === null ? (
              <React.Fragment>
                <Table>{TableHeading()}</Table>
                <div
                  style={{
                    textAlign: 'center',
                    padding: '100px',
                  }}
                >
                  <CircularProgress />
                </div>
              </React.Fragment>
            ) : usersFilter.length === 0 && users.data.length > 0 ? (
              <Table striped>
                {TableHeading()}
                <tbody>
                  {users.data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, index) => {
                      return TableBody(item, index);
                    })}
                </tbody>
                <tfoot>
                  {TableFooter(users !== null && users.data.length)}
                </tfoot>
              </Table>
            ) : usersFilter.length > 0 ? (
              SearchBar()
            ) : (
              <React.Fragment>
                <Table>{TableHeading()}</Table>
                <div
                  style={{
                    textAlign: 'center',
                    padding: '100px',
                  }}
                >
                  You have no users in this date range.
                </div>
              </React.Fragment>
            )}
          </Overflow>
        </Card>
      </React.Fragment>
    </>
  );
};

export default DataUsers;

const Styles = {
  Name: { color: '#0098da', fontWeight: '700' },
};

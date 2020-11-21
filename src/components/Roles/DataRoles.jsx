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
import { fetchGetRoles, fetchMultipleDeleteRoles } from '../../store/actions';
import DeleteRoles from './DeleteRoles';
import MultipleDelete from '../../elements/Alert/MultipleDelete';
import { CircularProgress, TableFooter } from '@material-ui/core';

// --- Styled Components --- //

const DataRoles = (props) => {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.roles.getRoles);

  // --- PAGINATION --- //
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [input, setInput] = useState('');
  const handleInput = (event) => {
    setInput(event.target.value);
  };
  // --- Dropdown --- //
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const [form, setForm] = useState({
    id: [],
  });

  // --- useEffect --- Get Data Topic ---//
  useEffect(() => {
    dispatch(fetchGetRoles());
    // eslint-disable-next-line
  }, [dispatch]);

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
    dispatch(fetchMultipleDeleteRoles(form));
  };

  const rolesFilter =
    roles !== null &&
    roles.data.filter((item) => {
      return item.adminType.toLowerCase().includes(input.toLowerCase());
    });

  const TableHeading = () => {
    return (
      <thead>
        <tr>
          <Th>
            <DehazeIcon />
          </Th>
          <Th>Admin Type</Th>
          <Th>Read Write</Th>
          <Th>Created At</Th>
          <Th>Update At</Th>
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
            checkbox
            type="checkbox"
            id={item._id}
            value={item._id}
            onChange={handleCheckboxChange}
          />
        </Th>

        <Th as="td" td>
          {item.adminType}
        </Th>
        <Th as="td" td>
          {item.readWrite === false ? <p>False</p> : <p>True</p>}
        </Th>
        <Th as="td" td>
          {moment(item.created_at).format('MMMM Do YYYY, h:mm:ss a')}
        </Th>
        <Th as="td" td>
          {moment(item.updated_at).format('MMMM Do YYYY, h:mm:ss a')}
        </Th>
        <Th as="td" td>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <DeleteRoles id={item._id} />
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
          {rolesFilter
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => {
              return TableBody(item, index);
            })}
        </tbody>
        <tfoot>{TableFooter(rolesFilter.length)}</tfoot>
      </Table>
    );
  };
  return (
    <>
      <></>
      <React.Fragment>
        <div
          style={{
            margin: '20px 0',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {form.id[0] ? (
            <Dropdown size="sm" isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle style={{ backgroundColor: '#0098DA' }} caret>
                Actions
              </DropdownToggle>
              <DropdownMenu>
                <MultipleDelete onSubmit={handleMultipleDelete} />
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Dropdown size="sm" isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle
                style={{ backgroundColor: '#0098DA' }}
                caret
                disabled
              >
                Actions
              </DropdownToggle>
            </Dropdown>
          )}
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
            {roles === null ? (
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
            ) : rolesFilter.length === 0 && roles.data.length > 0 ? (
              <Table striped>
                {TableHeading()}
                <tbody>
                  {roles.data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, index) => {
                      return TableBody(item, index);
                    })}
                </tbody>
                <tfoot>
                  {TableFooter(roles !== null && roles.data.length)}
                </tfoot>
              </Table>
            ) : rolesFilter.length > 0 ? (
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
                  You have no roles in this date range.
                </div>
              </React.Fragment>
            )}
          </Overflow>
        </Card>
      </React.Fragment>
    </>
  );
};

export default DataRoles;

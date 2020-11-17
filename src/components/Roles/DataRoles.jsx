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
import { CircularProgress } from '@material-ui/core';

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

  // --- Dropdown --- //
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const [form, setForm] = useState({
    id: [],
  });

  const [searching, setSearching] = useState({
    search: '',
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

  // --- handle Change --- //
  const handleChange = (event) => {
    setSearching({ ...searching, [event.target.name]: event.target.value });
  };

  return (
    <>
      <></>
      <React.Fragment>
        {/* --- section 1 --- Button Action link to Add Product ---*/}

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

                {/* <DropdownItem onClick={handleMultipleClone}>
                                Clone
                            </DropdownItem> */}
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
            <label>Search</label>{' '}
            <Input
              type="search"
              name="search"
              value={searching.search}
              onChange={handleChange}
            />
          </div>
          {/* <input type="button" onClick={handleSearch} value="KLIK" /> */}
        </div>

        {/* --- section 2 --- Get Data Product --- */}
        <Card isNormal>
          {/* --- untuk hapus melalui button --- */}
          <Overflow>
            {/* ------ jika product !== null return hasil get product jika masih nulltampilkan loading,
                     di dalam product apabila ternyata data.lentgh < 0 maka tampilkan table kosong -------*/}
            {roles === null ? (
              <React.Fragment>
                <Table>
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
                </Table>
                <div
                  style={{
                    textAlign: 'center',
                    padding: '100px',
                  }}
                >
                  <CircularProgress />
                </div>
              </React.Fragment>
            ) : roles.data.length >= 1 ? (
              <Table striped>
                <thead>
                  <tr>
                    <Th>
                      <Input checkbox type="checkbox" />
                    </Th>
                    <Th>Admin Type</Th>
                    <Th>Read Write</Th>
                    <Th>Created At</Th>
                    <Th>Update At</Th>
                    <Th style={{ width: '100px' }}>Actions</Th>
                  </tr>
                </thead>
                <tbody>
                  {roles.data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item) => {
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
                            {item.readWrite === false ? (
                              <p>False</p>
                            ) : (
                              <p>True</p>
                            )}
                          </Th>
                          <Th as="td" td>
                            {moment(item.created_at).format(
                              'MMMM Do YYYY, h:mm:ss a'
                            )}
                          </Th>
                          <Th as="td" td>
                            {moment(item.updated_at).format(
                              'MMMM Do YYYY, h:mm:ss a'
                            )}
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
                    })}
                </tbody>
                <tfoot>
                  <tr>
                    <TablePagination
                      rowsPerPageOptions={[10, 15, 20]}
                      count={roles !== null && roles.data.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                  </tr>
                </tfoot>
              </Table>
            ) : (
              <React.Fragment>
                <Table>
                  <thead>
                    <tr>
                      <Th>
                        <DehazeIcon />
                      </Th>
                      <Th>Name</Th>
                      <Th>Slug</Th>
                      <Th>Created At</Th>
                      <Th>Update At</Th>
                      <Th style={{ width: '100px' }}>Actions</Th>
                    </tr>
                  </thead>
                </Table>
                <div
                  style={{
                    textAlign: 'center',
                    padding: '100px',
                  }}
                >
                  You have no topic in this date range.
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

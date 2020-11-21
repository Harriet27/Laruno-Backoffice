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
import { fetchGetPaymentsMethod } from '../../store/actions';
import AddPaymentsMethod from './AddPaymentsMethod';
import { CircularProgress } from '@material-ui/core';

// --- Styled Components --- //

const DataPaymentsMethod = (props) => {
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.payment.getPaymentsMethod);

  // --- PAGINATION --- //
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [input, setInput] = useState('');
  const paymentsFilter =
    payments !== null &&
    payments.data.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
  const handleInput = (event) => {
    setInput(event.target.value);
  };
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
    allChecked: false,
  });

  useEffect(() => {
    dispatch(fetchGetPaymentsMethod());
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
    // dispatch(fetchMultipleDeleteTopics(form));
  };

  const TableHeading = () => {
    return (
      <thead>
        <tr>
          <Th>
            <DehazeIcon />
          </Th>
          <Th>ID</Th>
          <Th>Name</Th>
          <Th>Slug</Th>
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
          {item._id}
        </Th>
        <Th as="td" td>
          {item.name}
        </Th>
        <Th as="td" td>
          {item.info}
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
          ></div>
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
          {paymentsFilter
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => {
              return TableBody(item, index);
            })}
        </tbody>
        <tfoot>{TableFooter(paymentsFilter.length)}</tfoot>
      </Table>
    );
  };
  return (
    <React.Fragment>
      {/* --- section 1 --- Button Action link to Add Product ---*/}
      {form.id[0] ? (
        <Dropdown size="sm" isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle style={{ backgroundColor: '#0098DA' }} caret>
            Actions
          </DropdownToggle>
          <DropdownMenu>
            {/* <MultipleDelete onSubmit={handleMultipleDelete} /> */}
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Dropdown size="sm" isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle style={{ backgroundColor: '#0098DA' }} caret disabled>
            Actions
          </DropdownToggle>
        </Dropdown>
      )}

      <div
        style={{
          margin: '20px 0',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <AddPaymentsMethod />

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
          {payments === null ? (
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
          ) : paymentsFilter.length === 0 && payments.data.length >= 1 ? (
            <Table>
              {TableHeading()}
              <tbody>
                {payments.data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => {
                    return TableBody(item, index);
                  })}
              </tbody>
              <tfoot>
                {TableFooter(payments !== null && payments.data.length)}
              </tfoot>
            </Table>
          ) : paymentsFilter.length > 0 ? (
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
                You have no payments in this date range.
              </div>
            </React.Fragment>
          )}
        </Overflow>
      </Card>
    </React.Fragment>
  );
};

export default DataPaymentsMethod;

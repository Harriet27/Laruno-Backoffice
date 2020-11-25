import React, { useEffect, useState } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Table } from 'reactstrap';
import Card from '../../elements/Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Th, Overflow } from '../../elements/Styled/StyledForm';
import moment from 'moment';

// --- Elements, Pages, Components --- //
import { fetchGetPaymentsMethod } from '../../store/actions';
import AddPaymentsMethod from './AddPaymentsMethod';
import { CircularProgress } from '@material-ui/core';
import MultipleActions from '../../elements/MultipleActions/MultipleActions';

// --- Styled Components --- //

const DataPaymentsMethod = (props) => {
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.payment.getPaymentsMethod);
  const coupons = useSelector((state) => state.coupons.getCoupons);
  const orders = useSelector((state) => state.orders.getOrders);
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
            <Input isCheckbox type="checkbox" />
          </Th>
          <Th>Name</Th>
          <Th>Vendor</Th>
          <Th>Status</Th>
          <Th>info</Th>
          <Th style={{ width: '15%' }}>use For</Th>
          <Th style={{ width: '10%' }}>Actions</Th>
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
          {moment(item.created_at).format('MM-DD-YYYY')}
        </Th>
        <Th as="td" td>
          {item.vendor}
        </Th>
        <Th as="td" td>
          {item.isActive === true ? (
            <div style={Styles.isActive}>Active</div>
          ) : (
            <div style={Styles.isNonActive}>Non-active</div>
          )}
        </Th>
        <Th as="td" td>
          {item.info}
        </Th>
        <Th as="td" td>
          <div style={Styles.isCoupons}>Coupons: 0</div>
          <div style={Styles.isOrders}>Order: 0</div>
        </Th>
        <Th as="td" td></Th>
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

  console.log({ orders, coupons, payments }, 'ALL console');
  return (
    <React.Fragment>
      {/* --- section 1 --- Button Action link to Add Product ---*/}
      <MultipleActions
        isLogic={form.id[0]}
        // handleClone={handleMultipleClone}
        handleDelete={handleMultipleDelete}
      />

      <div style={Styles.FlexBetween}>
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
              <div style={Styles.isLoading}>
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
              <div style={Styles.isLoading}>
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

const Styles = {
  Name: { color: '#0098da', fontWeight: '700', cursor: 'pointer' },
  FlexBetween: {
    margin: '20px 0',
    display: 'flex',
    justifyContent: 'space-between',
  },
  isLoading: {
    textAlign: 'center',
    padding: '100px',
  },
  isOrders: {
    background: '#bce6eb',
    marginBottom: '5px',
    color: '#92817a',
    padding: '.1em .5em',
    borderRadius: '30px',
    borderBottom: '1px solid rgba(0,0,0,.05)',
    textAlign: 'center',
    fontSize: '12px',
    maxWidth: '100%',
    fontWeight: 'bold',
  },
  isCoupons: {
    background: '#cfd3ce',
    marginBottom: '5px',
    color: '#92817a',
    padding: '.1em .5em',
    borderRadius: '30px',
    borderBottom: '1px solid rgba(0,0,0,.05)',
    textAlign: 'center',
    fontSize: '12px',
    maxWidth: '100%',
    fontWeight: 'bold',
  },
  isActive: {
    background: '#c6e1c6',
    marginBottom: '5px',
    color: '#92817a',
    padding: '.1em .5em',
    borderRadius: '30px',
    borderBottom: '1px solid rgba(0,0,0,.05)',
    textAlign: 'center',
    fontSize: '12px',
    maxWidth: '100%',
    fontWeight: 'bold',
  },
  isNonActive: {
    background: '#f99292',
    marginBottom: '5px',
    color: '#732222',
    padding: '.1em .5em',
    borderRadius: '30px',
    borderBottom: '1px solid rgba(0,0,0,.05)',
    textAlign: 'center',
    fontSize: '12px',
    maxWidth: '100%',
    fontWeight: 'bold',
  },
};

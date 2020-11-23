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
import { fetchGetPaymentsMethod, fetchGetCoupons } from '../../store/actions';
import AddPaymentsMethod from './AddPaymentsMethod';
import { CircularProgress } from '@material-ui/core';
import MultipleActions from '../../elements/MultipleActions/MultipleActions';

// --- Styled Components --- //

const DataPaymentsMethod = (props) => {
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.payment.getPaymentsMethod);
  const coupons = useSelector((state) => state.coupons.getCoupons);
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
    dispatch(fetchGetCoupons());
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

  const FilterDataPaymentInCoupons = (id) => {
    const filterCouponsByID =
      coupons !== null &&
      coupons.data.filter((item) => {
        return item.payment_method !== null && item.payment_method === id;
      });
    console.log(filterCouponsByID[0], 'o');
    return filterCouponsByID !== undefined && filterCouponsByID.length;
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
          <Th>Slug</Th>
          <Th style={{ width: '5%' }}>For Coupons</Th>
          {/* <Th style={{ width: '100px' }}>Actions</Th> */}
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
          {/* {moment(item.created_at).format('MM-DD-YYYY')} */}
        </Th>
        <Th as="td" td>
          {item.vendor}
        </Th>
        <Th as="td" td>
          {item.info}
        </Th>
        <Th as="td" td>
          {FilterDataPaymentInCoupons(item._id)}
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
};

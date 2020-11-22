import React, { useEffect, useState } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Form,
} from 'reactstrap';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import DehazeIcon from '@material-ui/icons/Dehaze';
import CircularProgress from '@material-ui/core/CircularProgress';
// --- Elements, Pages, Components --- //
import Card from '../../elements/Card/Card';
import { Input, Th, Overflow } from '../../elements/Styled/StyledForm';
import {
  fetchGetCoupons,
  fetchMultipleCloneCoupons,
  fetchMultipleDeleteCoupons,
} from '../../store/actions';
import AddCoupons from './AddCoupons';
import DeleteCoupons from './DeleteCoupons';

import UpdateModalCoupons from './UpdateModalCoupons';
import MultipleActions from '../../elements/MultipleActions/MultipleActions';

const DataCoupons = (props) => {
  const dispatch = useDispatch();
  const coupons = useSelector((state) => state.coupons.getCoupons);

  useEffect(() => {
    dispatch(fetchGetCoupons());
    // eslint-disable-next-line
  }, [dispatch]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [input, setInput] = useState('');
  const handleInput = (event) => {
    setInput(event.target.value);
  };
  const [form, setForm] = useState({
    id: [],
    allChecked: false,
  });

  useEffect(() => {
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
    dispatch(fetchMultipleDeleteCoupons(form));
  };

  // --- Multiple Clone --- //
  const handleMultipleClone = (event) => {
    event.preventDefault();
    dispatch(fetchMultipleCloneCoupons(form));
  };

  const couponsFilter =
    coupons !== null &&
    coupons.data.filter((item) => {
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
          <Th>Code</Th>
          <Th>Max Discount</Th>
          <Th>Start Coupon</Th>
          <Th>End Coupon</Th>
          <Th>Payment Method</Th>
          <Th style={{ width: '10%' }}>Actions</Th>
        </tr>
      </thead>
    );
  };

  const TableBody = (item, index) => {
    return (
      <tr key={item._id}>
        <Th as="td">
          <Input
            isCheckbox
            type="checkbox"
            id={item._id}
            value={item._id}
            onChange={handleCheckboxChange}
          />
        </Th>
        <Th as="td" td>
          {item.name}
        </Th>
        <Th as="td" td>
          {item.code}
        </Th>
        <Th as="td" td>
          {item.max_discount}
        </Th>
        <Th as="td" td>
          {moment(item.start_date).format('MMMM-DD-YYYY')}
        </Th>
        <Th as="td" td>
          {moment(item.end_date).format('MMMM-DD-YYYY')}
        </Th>
        <Th as="td" td>
          {item.payment_method}
        </Th>
        <Th as="td" td>
          <div style={Styles.FlexRow}>
            <UpdateModalCoupons id={item._id} coupons={coupons} />
            <DeleteCoupons id={item._id} />
          </div>
        </Th>
      </tr>
    );
  };

  const TableFooter = (length) => {
    return (
      <tr>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
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
          {couponsFilter
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => {
              return TableBody(item, index);
            })}
        </tbody>
        <tfoot>{TableFooter(couponsFilter.length)}</tfoot>
      </Table>
    );
  };

  return (
    <React.Fragment>
      {/* --- section 1 --- Button Action link to Add Product ---*/}
      <MultipleActions
        isLogic={form.id[0]}
        handleClone={handleMultipleClone}
        handleDelete={handleMultipleDelete}
      />

      <div style={Styles.FlexBetween}>
        <AddCoupons />

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
          {coupons === null ? (
            <React.Fragment>
              <Table>{TableHeading()}</Table>
              <div style={Styles.Loading}>
                <CircularProgress />
              </div>
            </React.Fragment>
          ) : couponsFilter.length === 0 && coupons.data.length > 0 ? (
            <Table striped>
              {TableHeading()}
              <tbody>
                {coupons.data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => {
                    return TableBody(item, index);
                  })}
              </tbody>
              <tfoot>
                {TableFooter(coupons !== null && coupons.data.length)}
              </tfoot>
            </Table>
          ) : couponsFilter.length > 0 ? (
            SearchBar()
          ) : (
            <React.Fragment>
              <Table>{TableHeading()}</Table>
              <div style={Styles.Loading}>
                You have no coupons in this date range.
              </div>
            </React.Fragment>
          )}
        </Overflow>
      </Card>
    </React.Fragment>
  );
};

const Styles = {
  FlexBetween: {
    margin: '20px 0',
    display: 'flex',
    justifyContent: 'space-between',
  },
  ColorActions: { backgroundColor: '#0098DA' },
  Loading: {
    textAlign: 'center',
    padding: '100px',
  },
  FlexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
};

export default DataCoupons;

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
import FormatNumber from '../../elements/FormatNumber/FormatNumber';
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
  fetchGetPaymentsMethod,
  fetchGetProduct,
} from '../../store/actions';
import AddCoupons from './AddCoupons';
import DeleteCoupons from './DeleteCoupons';

import UpdateModalCoupons from './UpdateModalCoupons';
import MultipleActions from '../../elements/MultipleActions/MultipleActions';

const DataCoupons = (props) => {
  const dispatch = useDispatch();
  const coupons = useSelector((state) => state.coupons.getCoupons);

  const payment = useSelector((state) => state.payment.getPaymentsMethod);
  const product = useSelector((state) => state.product.getProduct);
  console.log({ payment, product }, 'PPPPayments');

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
          <Th>Type</Th>
          <Th style={{ width: '10%' }}>Coupons Code</Th>
          <Th>Max Discount</Th>
          <Th style={{ width: '5%' }}>Value coupons</Th>
          <Th style={{ width: '10%' }}>Coupons Status</Th>
          <Th>Coupons For</Th>
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
          <div style={Styles.Name}>{item.name}</div>
          {moment(item.start_date).format('MM-DD-YYYY')}
        </Th>
        <Th as="td" td>
          {item.type}
        </Th>
        <Th as="td" td>
          <div style={Styles.isCode}>{item.code}</div>
        </Th>
        <Th as="td" td>
          Rp.{FormatNumber(item.max_discount)}
        </Th>
        <Th as="td" td>
          {item.value}%
        </Th>
        <Th as="td" td>
          <div>
            {item.is_active === true ? (
              <div style={Styles.Active}>Active</div>
            ) : (
              <div style={Styles.NonActive}>Non-Active</div>
            )}
          </div>
        </Th>

        <Th as="td" td>
          {
            item.type === 'Payment'
            ? item.payment_method_info.name
            : item.type === 'Product'
            // ? item.product_info.name
            ? 'Product'
            : item.type === 'User'
            ? 'User'
            : 'Event'
          }
        </Th>
        <Th as="td" td>
          <div style={Styles.FlexRow}>
            <UpdateModalCoupons
              id={item._id}
              coupons={coupons}
              product={product}
              payment={payment}
            />
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
  Active: {
    background: '#c6e1c6',
    color: '#5b841b',
    padding: '.1em .5em',
    borderRadius: '30px',
    borderBottom: '1px solid rgba(0,0,0,.05)',
    textAlign: 'center',
    fontSize: '12px',
    maxWidth: '100%',
  },
  NonActive: {
    background: '#f99292',
    color: '#732222',
    padding: '.1em.5em',
    borderRadius: '30px',
    borderBottom: '1px solid rgba(0,0,0,.05)',
    textAlign: 'center',
    maxWidth: '100%',
    fontSize: '12px',
  },
  isCode: {
    background: '#cfd3ce',
    color: 'gray',
    padding: '.5em .5em',
    borderBottom: '1px solid rgba(0,0,0,.05)',
    border: '3px dotted #bbb',
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
    maxWidth: '100%',
    marginBottom: '5px',
  },
  Name: { color: '#0098da', fontWeight: '700', cursor: 'pointer' },
};

export default DataCoupons;

import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import TablePagination from '@material-ui/core/TablePagination';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Table } from 'reactstrap';
import Card from '../../elements/Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { Input, Th, Overflow } from '../../elements/Styled/StyledForm';
import moment from 'moment';
import FormatNumber from '../../elements/FormatNumber/FormatNumber';
import Styled from 'styled-components';
// --- Elements, Pages, Components --- //
import {
  fetchGetOrders,
  fetchMultipleDeleteOrderss,
} from '../../store/actions';
import InputOrder from './InputOrder';
import FollowUp from './FollowUp';
import FollowUp_1 from './FollowUp_1';
import FollowUp_2 from './FollowUp_2';
import FollowUp_3 from './FollowUp_3';
import FollowUp_4 from './FollowUp_4';
import NewFollowUp from './NewFollowUp';
import DetailPopUp from '../../elements/DetailPopUp/DetailPopUp';

// --- Styled Components --- //

const DataOrders = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const orders = useSelector((state) => state.orders.getOrders);

  console.log('Get All Data orders', orders);
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
    allChecked: false,
  });

  const [searching, setSearching] = useState({
    search: '',
  });

  // --- useEffect --- Get Data Orders ---//
  useEffect(() => {
    dispatch(fetchGetOrders());
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

  // --- handle Change --- //
  const handleChange = (event) => {
    setSearching({ ...searching, [event.target.name]: event.target.value });
  };

  // --- Total Count --- //
  let total_count = 0;
  orders !== null &&
    orders.data.map((items) => {
      return <div key={items._id}>{(total_count += items.orders_count)}</div>;
    });

  // --- Styled Hover Table Row --- //
  const TableRow = Styled.tr`
&:hover{
    background: rgb(190,243,237)!important;
}
`;

  return (
    <React.Fragment>
      {/* --- section 1 --- Button Action link to Add Product ---*/}

      {form.id[0] ? (
        <Dropdown size="sm" isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle style={{ backgroundColor: '#0098DA' }} caret>
            Actions
          </DropdownToggle>
          <DropdownMenu></DropdownMenu>
        </Dropdown>
      ) : (
        <Dropdown size="sm" isOpen={dropdownOpen} toggle={toggle}>
          {' '}
          <DropdownToggle style={{ backgroundColor: '#0098DA' }} caret disabled>
            Actions
          </DropdownToggle>
        </Dropdown>
      )}

      <div style={Styles.isFlexBetween}>
        <InputOrder />

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
          {orders === null ? (
            <React.Fragment>
              <Table>
                <thead>
                  <tr>
                    <Th>
                      <DehazeIcon />
                    </Th>
                    <Th>Invoice Number</Th>
                    <Th>Name</Th>
                    <Th>Date</Th>

                    <Th>Total Price</Th>
                    <Th>Payment Status</Th>

                    <Th style={{ width: '10%' }}>Follow Up</Th>

                    <Th style={{ width: '10%' }}>Actions</Th>
                  </tr>
                </thead>
              </Table>
              <div style={Styles.isLoading}>Loading ...</div>
            </React.Fragment>
          ) : orders.data.length >= 1 ? (
            <Table striped responsive>
              <thead>
                <tr>
                  <Th>
                    <DehazeIcon />
                  </Th>
                  <Th>Invoice</Th>
                  <Th>Name</Th>
                  <Th style={{ width: '20%' }}>Product</Th>
                  <Th>Date</Th>
                  <Th>Total Price</Th>

                  <Th style={{ width: '5%' }}>Payment Status</Th>
                  {/* <Th>Paid At</Th> */}
                  <Th style={{ width: '10%' }}>Follow Up</Th>

                  <Th style={{ width: '10%' }}>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {orders.data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => {
                    return (
                      <TableRow key={item._id}>
                        <Th as="td" td>
                          <input type="checkbox" />
                        </Th>
                        <Th as="td" td>
                          {/* {item.order_id} */}
                          {item.invoice === null
                            ? '#101120SKU9515000'
                            : `#${item.invoice}`}
                        </Th>
                        <Th as="td" td>
                          <div style={Styles.FlexColumn}>
                            <div style={Styles.Name}>{item.user_info.name}</div>
                            <div
                              style={{
                                fontSize: '12px',
                              }}
                            >
                              {item.user_info.phone_number}
                            </div>
                          </div>
                        </Th>
                        <Th as="td" td>
                          {item.items.length <= 1 ? (
                            <>
                              {' '}
                              {item.items.map((data, index) => {
                                let Nomor = index + 1;
                                return (
                                  <div key={index}>
                                    <div style={Styles.isColumnBottom}>
                                      <div style={Styles.Name}>
                                        * {data.product_info.name}
                                      </div>
                                      <div style={Styles.marginDetail}>
                                        {' '}
                                        Price: Rp.
                                        {FormatNumber(data.sub_price)}
                                      </div>
                                      <div style={Styles.marginDetail}>
                                        {' '}
                                        Quantity: {data.quantity} item
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </>
                          ) : (
                            //  Testing Show more
                            <>
                              {' '}
                              <div style={Styles.isColumnBottom}>
                                <div style={Styles.Name}>
                                  * {item.items[0].product_info.name}
                                </div>
                                <div style={Styles.marginDetail}>
                                  {' '}
                                  Price: Rp.
                                  {FormatNumber(item.items[0].sub_price)}
                                </div>
                                <div style={Styles.marginDetail}>
                                  {' '}
                                  Quantity: {item.items[0].quantity} item
                                </div>
                                <DetailPopUp
                                  id={item._id}
                                  buttonLabel={
                                    <div style={Styles.ShowProduct}>
                                      Show {item.items.length} Product
                                    </div>
                                  }
                                />
                              </div>
                            </>
                          )}
                        </Th>
                        <Th as="td" td>
                          {moment(item.create_date).format(
                            'DD-MM-YYYY - hh:mm'
                          )}
                        </Th>
                        <Th as="td" td>
                          Rp. {FormatNumber(item.total_price)}
                        </Th>
                        <Th as="td" td>
                          {item.payment.status === 'COMPLETED' ? (
                            <div style={Styles.Paid}>
                              <span>Paid</span>
                            </div>
                          ) : (
                            <div style={Styles.Unpaid}>
                              <span>Unpaid</span>
                            </div>
                          )}
                        </Th>
                        <Th as="td" td>
                          <div style={Styles.FlexRow}>
                            <FollowUp id={item._id} />
                            <FollowUp_1 id={item._id} />
                            <FollowUp_2 id={item._id} />
                            <FollowUp_3 id={item._id} />
                            <FollowUp_4 id={item._id} />
                          </div>
                        </Th>
                        <Th as="td" td>
                          Actions
                        </Th>
                      </TableRow>
                    );
                  })}
              </tbody>
              <tfoot>
                <tr>
                  <TablePagination
                    rowsPerPageOptions={[10, 15, 20]}
                    count={orders !== null && orders.data.length}
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
                    <Th style={{ width: '10%' }}>Actions</Th>
                  </tr>
                </thead>
              </Table>
              <div style={Styles.isLoading}>
                You have no orders in this date range.
              </div>
            </React.Fragment>
          )}
        </Overflow>
      </Card>
    </React.Fragment>
  );
};

const Styles = {
  Paid: {
    background: '#c6e1c6',
    color: '#5b841b',
    padding: '.1em .5em',
    borderRadius: '30px',
    borderBottom: '1px solid rgba(0,0,0,.05)',
    textAlign: 'center',
    fontSize: '12px',
    maxWidth: '100%',
  },
  Unpaid: {
    background: '#f99292',
    color: '#732222',
    padding: '.1em.5em',
    borderRadius: '30px',
    borderBottom: '1px solid rgba(0,0,0,.05)',
    textAlign: 'center',
    maxWidth: '100%',
    fontSize: '12px',
  },
  FlexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  FlexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  Name: { color: '#0098da', fontWeight: '700' },
  marginDetail: {
    marginLeft: '.8rem',
    fontSize: '12px',
  },
  isLoading: {
    textAlign: 'center',
    padding: '100px',
  },
  isColumnBottom: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '5px',
  },
  isFlexBetween: {
    margin: '20px 0',
    display: 'flex',
    justifyContent: 'space-between',
  },
  ShowProduct: {
    color: 'green',
    cursor: 'pointer',
    fontWeight: '600',
    marginLeft: '.8rem',
    fontSize: '12px',
  },
};

export default DataOrders;

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
import CircularProgress from '@material-ui/core/CircularProgress';
// --- Elements, Pages, Components --- //
import {
  fetchGetOrders,
  fetchGetFollowUp,
  fetchMultipleDeleteOrderss,
} from '../../store/actions';
import InputOrder from './InputOrder';
import FollowUp from './FollowUp';

import DetailPopUp from '../../elements/DetailPopUp/DetailPopUp';
import TotalData from './TotalData';
import Order from '../../pages/Order/Order';
import Actions from './Actions';

// --- Styled Components --- //

const DataOrders = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const orders = useSelector((state) => state.orders.getOrders);
  const followup = useSelector((state) => state.followup.getFollowUp);
  console.log('Get All Data orders', { orders, followup });
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
  const [input, setInput] = useState('');
  const handleInput = (event) => {
    setInput(event.target.value);
  };
  const [form, setForm] = useState({
    id: [],
    allChecked: false,
  });

  // --- useEffect --- Get Data Orders ---//
  useEffect(() => {
    dispatch(fetchGetFollowUp());
    // eslint-disable-next-line
  }, [dispatch]);
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

  const TableHeading = () => {
    return (
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
          <Th style={{ width: '10%' }}>Follow Up</Th>
          <Th style={{ width: '10%' }}>Actions</Th>
        </tr>
      </thead>
    );
  };

  const TableFollowUP = (item) => {
    return (
      <div style={Styles.FlexRow}>
        <FollowUp
          id={item._id}
          orders={orders}
          title="FollowUp 1"
          number="1"
          followup={followup}
        />
        <FollowUp
          id={item._id}
          orders={orders}
          title="FollowUp 2"
          number="2"
          followup={followup}
        />
        <FollowUp
          id={item._id}
          orders={orders}
          title="FollowUp 3"
          number="3"
          followup={followup}
        />
        <FollowUp
          id={item._id}
          orders={orders}
          title="FollowUp 4"
          number="4"
          followup={followup}
        />
        <FollowUp
          id={item._id}
          orders={orders}
          title="FollowUp 5"
          number="5"
          followup={followup}
        />
      </div>
    );
  };

  const TableBody = (item, index) => {
    return (
      <TableRow key={item._id}>
        <Th as="td" td>
          <input type="checkbox" />
        </Th>
        <Th as="td" td>
          {item.invoice === null ? '101120SKU9515000' : `${item.invoice}`}
        </Th>
        <Th as="td" td>
          <div style={Styles.FlexColumn}>
            <DetailPopUp
              id={item._id}
              orders={orders}
              buttonLabel={<div style={Styles.Name}>{item.user_info.name}</div>}
              followup={followup}
            />

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
                return (
                  <div key={index}>
                    <div style={Styles.isColumnBottom}>
                      <div style={Styles.Name}>{data.product_info.name}</div>
                      <div style={Styles.marginDetail}>
                        Price: Rp.
                        {FormatNumber(data.sub_price)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <div style={Styles.isColumnBottom}>
                <div style={Styles.Name}>{item.items[0].product_info.name}</div>
                <div style={Styles.marginDetail}>
                  Price: Rp.
                  {FormatNumber(item.items[0].sub_price)}
                </div>

                <DetailPopUp
                  id={item._id}
                  orders={orders}
                  followup={followup}
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
          {moment(item.create_date).format('DD-MM-YYYY - hh:mm')}
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
          {TableFollowUP(item)}
        </Th>
        <Th as="td" td>
          <Actions />
        </Th>
      </TableRow>
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
  return (
    <>
      <>
        <TotalData order={orders} />
      </>
      <>
        <div style={Styles.isFlexBetween}>
          <InputOrder />

          <div>
            <label>Search</label>
            <Input
              type="search"
              name="search"
              value={input}
              onChange={handleInput}
            />
          </div>
        </div>

        <Card isNormal>
          <Overflow>
            {orders === null ? (
              <React.Fragment>
                <Table>{TableHeading()}</Table>
                <div style={Styles.isLoading}>
                  <CircularProgress />
                </div>
              </React.Fragment>
            ) : orders.data.length > 0 ? (
              <Table striped responsive>
                {TableHeading()}
                <tbody>
                  {orders.data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, index) => {
                      return TableBody(item, index);
                    })}
                </tbody>
                <tfoot>
                  {TableFooter(orders !== null && orders.data.length)}
                </tfoot>
              </Table>
            ) : (
              <React.Fragment>
                <Table>{TableHeading()}</Table>
                <div style={Styles.isLoading}>
                  You have no orders in this date range.
                </div>
              </React.Fragment>
            )}
          </Overflow>
        </Card>
      </>
    </>
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
  Name: { color: '#0098da', fontWeight: '700', cursor: 'pointer' },
  marginDetail: {
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
    fontSize: '12px',
  },
};

export default DataOrders;

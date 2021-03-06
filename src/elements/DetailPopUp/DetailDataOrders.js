import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShowOrders, fetchGetFollowUp } from '../../store/actions';
import moment from 'moment';
import FormatNumber from '../../elements/FormatNumber/FormatNumber';
import { Span } from '../../elements/Styled/StyledTabs';
import { Input } from '../../elements/Styled/StyledForm';
import Styled from 'styled-components';
import FollowUp from '../../components/OrderOnline/FollowUp';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from 'reactstrap';

import Actions from '../../components/OrderOnline/Actions';

const Icon = Styled.div`
margin-bottom: 10px;
`;

export default function DetailDataOrders(props) {
  const {
    orders,
    orderFollowUp,
    toggle,
    message,
    phone_number,
    total_price,
    total_qty,
    invoice,
    email,
    name,
    address,
    orderId,
    payment,
    transfer,
    followup
  } = props;

  const DetailDataOrdersToFollowUp = (props) => {
    const {
      orders,
      toggle,
      message,
      phone_number,
      total_price,
      total_qty,
      invoice,
      email,
      name,

      // address,
    } = props;
    const [form, setForm] = useState({
      name: name,
      phone_number: phone_number,
      message: message,
      total_price: total_price,
      total_qty: total_qty,
      // payment_method: payment_method,
      invoice: invoice,
      email: email,
      // address: address,
    });

    let DetailMessage = form.message.replace(
      /\{\{(.+?)\}\}/g,
      (matching, value) => form[value.trim()]
    );
    console.log(DetailMessage, 'ini detail message');
    console.log(payment && payment.data);

    function raiseInvoiceClicked() {
      const Phone_number =
        phone_number.toString().substring(0, 0) +
        '62' +
        phone_number.toString().substring(1);

      const FollowMessage = encodeURI(DetailMessage);
      const url = `https://wa.me/${Phone_number}?text=${FollowMessage}`;
      window.open(url, '_blank');
      // window.location.href = url;
    }
    return (
      <>
        <ModalBody>
          <section style={Styles.Container}>
            {/* container one */}
            <div style={Styles.FlexRow}>
              {/* section one */}
              <div style={Styles.SectionOne}>
                <div style={Styles.Name}>{name}</div>
                <Icon>
                  <i style={Styles.Icon} className="fa fa-envelope"></i>
                  {email || 'example.email.com'}
                </Icon>
                <Icon>
                  <i className="fa fa-phone" style={Styles.Icon}></i>{' '}
                  {phone_number || 'nomor telephone tidak di isi'}
                </Icon>
                <Icon>
                  <i style={Styles.Icon} className="fa fa-home"></i>
                  Komplek Scientia Square, Jalan Darwin Timur. Ruko Darwin No 2,
                  Medang, Kec. Pagedangan, Kota Tangerang Selatan, Banten 15339
                </Icon>
              </div>
              {/* Section two */}
              <div style={Styles.SectionTwo}>
                <div>
                  <h4>
                    INVOICE #{invoice === null ? '101120SKU9515000' : invoice}
                  </h4>
                </div>
                <div>
                  Order Date: {moment(orders.create_date).format('DD-MM-YYYY')}
                </div>
                <>
                  {orders.payment.status === 'COMPLETED' ? (
                    <div style={Styles.Paid}>Paid</div>
                  ) : (
                    <div style={Styles.Unpaid}>Unpaid</div>
                  )}
                  {/* - */}
                </>
                <br/>
                <Actions id={orderId} payment={payment} />
                <hr/>
                <h6>Follow Up</h6>
                <div style={Styles.FlexRow}>
                  <FollowUp
                    id={orderId}
                    orders={orderFollowUp}
                    title="FollowUp 1"
                    number="1"
                    followup={followup}
                  />
                  <FollowUp
                    id={orderId}
                    orders={orderFollowUp}
                    title="FollowUp 2"
                    number="2"
                    followup={followup}
                  />
                  <FollowUp
                    id={orderId}
                    orders={orderFollowUp}
                    title="FollowUp 3"
                    number="3"
                    followup={followup}
                  />
                  <FollowUp
                    id={orderId}
                    orders={orderFollowUp}
                    title="FollowUp 4"
                    number="4"
                    followup={followup}
                  />
                  <FollowUp
                    id={orderId}
                    orders={orderFollowUp}
                    title="FollowUp 5"
                    number="5"
                    followup={followup}
                  />
                </div>
              </div>
            </div>

            {/* container two */}
            <>
              <Table>
                <thead>
                  <tr>
                    <th>Items</th>
                    <th>Quantity</th>
                    <th>Bump</th>
                    <th>Bump Price</th>
                    <th>Coupon</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.items.map((val, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          { 
                            val.product_info === null
                            ? 'no product'
                            : val.product_info.name
                          }
                        </td>
                        <td>
                          {val.quantity} items
                        </td>
                        <td>
                          {
                            val.is_bump
                            ? 'Bump'
                            : '-'
                          }
                        </td>
                        <td>
                          {
                            val.is_bump
                            ? val.bump_price
                            : '-'
                          }
                        </td>
                        <td>
                          {
                            orders.coupon === null
                            ? "-"
                            : orders.coupon.code
                          }
                        </td>
                        <td>
                          Rp. {FormatNumber(val.sub_price * val.quantity)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Total</th>
                    <th>{total_qty} items</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>
                      {
                        orders.coupon === null
                        ? "-"
                        : orders.coupon.max_discount
                      }
                    </th>
                    <th>
                      Rp. {FormatNumber(total_price)}
                    </th>
                    {/* {orders.items.map((val,index) => {
                      return (
                        <th>
                          Rp 
                          {
                            orders.coupon === null
                            ? FormatNumber(val.sub_price * val.quantity)
                            : FormatNumber((val.sub_price * val.quantity) - orders.coupon.max_discount)
                          }
                        </th>
                      );
                    })} */}
                  </tr>
                </tfoot>
              </Table>
              {payment && payment.data && (
                <>
                  <br/>
                  <h5>Metode Pembayaran</h5>
                  <Table>
                    <thead>
                      <tr>
                        <th>Tipe</th>
                        <th>Nama</th>
                        <th>Vendor</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{payment && payment.data.info}</td>
                        <td>{payment && payment.data.name} <img src={payment && payment.data.icon} width="40px" height="20px" alt='hmm' /></td>
                        <td>{payment && payment.data.vendor}</td>
                      </tr>
                    </tbody>
                  </Table>
                </>
              )}
              {transfer && transfer.length > 0 && (
                <>
                  <br/>
                  <h5>Detail Pembayaran</h5>
                  <Table>
                    <thead>
                      <tr>
                        <th>Destinasi Bank</th>
                        <th>Konfirmasi</th>
                        <th>Tanggal Transfer</th>
                        <th>Nama Bank</th>
                        <th>Nama Pemilik</th>
                        <th>No Rekening</th>
                        <th>Nomor Invoice</th>
                        <th>Created at</th>
                        <th>Updated at</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {transfer.data.map(item => {
                          return (
                            <>
                              <td>{item.destination_bank}</td>
                              <td>{item.is_confirmed ? 'Sudah terkonfirmasi' : 'Belum terkonfirmasi'}</td>
                              <td>{moment(item.date).format('DD-MM-YYYY - hh:mm')}</td>
                              <td>{item.bank_name}</td>
                              <td>{item.account_owner_name}</td>
                              <td>{item.account_number}</td>
                              <td>{item.invoice_number}</td>
                              <td>{moment(item.created_at).format('DD-MM-YYYY - hh:mm')}</td>
                              <td>{moment(item.updated_at).format('DD-MM-YYYY - hh:mm')}</td>
                            </>
                          )
                        })}
                      </tr>
                    </tbody>
                  </Table>
                </>
              )}
            </>
          </section>
        </ModalBody>
        <ModalFooter>
          <Button color="white" style={Styles.ButtonFotter} onClick={toggle}>
            Close
          </Button>
          {/* <Button color="primary" onClick={raiseInvoiceClicked}>
            Follow Up
          </Button> */}
        </ModalFooter>
      </>
    );
  };

  return (
    <>
      <DetailDataOrdersToFollowUp
        orders={orders}
        toggle={toggle}
        message={message}
        phone_number={phone_number}
        total_price={total_price}
        total_qty={total_qty}
        invoice={invoice}
        email={email}
        name={name}
        // address={address}
      />
    </>
  );
}

const Styles = {
  Container: {
    margin: '40px 30px',
  },
  ButtonFotter: {
    border: '1px solid gray',
  },
  FlexRow: { display: 'flex', flexDirection: 'row', marginBottom: '30px' },
  Name: {
    marginBottom: '15px',
    fontSize: '18px',
    fontWeight: '500',
  },
  SectionOne: { width: '40%', marginTop: '70px' },
  SectionTwo: {
    width: '60%',
    display: 'flex',
    justifyContent: 'right',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  Paid: {
    color: '#5b841b',
    border: '3px solid #c6e1c6',
    width: '20%',
    textAlign: 'center',
    fontWeight: 700,
    marginTop: '10px',
  },
  Unpaid: {
    color: '#777',
    border: '3px solid #e5e5e5',
    width: '20%',
    textAlign: 'center',
    fontWeight: 700,
    marginTop: '10px',
    backgroundColor: '#efefef',
  },
  Icon: {
    marginRight: '10px',
  },
};

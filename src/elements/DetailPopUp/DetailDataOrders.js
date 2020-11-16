import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShowOrders, fetchGetFollowUp } from '../../store/actions';
import moment from 'moment';
import FormatNumber from '../../elements/FormatNumber/FormatNumber';
import { Span } from '../../elements/Styled/StyledTabs';
import { Input } from '../../elements/Styled/StyledForm';
import Styled from 'styled-components';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from 'reactstrap';
const Icon = Styled.div`
margin-bottom: 10px;
`;
export default function DetailDataOrders(props) {
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
    address,
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

      address,
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
      address: address,
    });

    let DetailMessage = form.message.replace(
      /\{\{(.+?)\}\}/g,
      (matching, value) => form[value.trim()]
    );
    console.log(DetailMessage, 'ini detail message');
    // const message = `halo ${orders !== null && orders.data.user_info.name}`;
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
                  {email}
                </Icon>
                <Icon>
                  <i className="fa fa-phone" style={Styles.Icon}></i>{' '}
                  {phone_number}
                </Icon>
                <Icon>
                  <i style={Styles.Icon} className="fa fa-home"></i>
                  {address}
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
                  Order Date:{' '}
                  {moment(orders.data.create_date).format('DD-MM-YYYY')}
                </div>
                <>
                  {orders.data.payment.status === 'COMPLETED' ? (
                    <div style={Styles.Paid}>Paid</div>
                  ) : (
                    <div style={Styles.Unpaid}>Unpaid</div>
                  )}
                </>
              </div>
            </div>

            {/* container two */}
            <>
              <Table>
                <thead>
                  <tr>
                    <th>Items</th>
                    {/* <th style={{ width: '10%' }}>Quantity</th> */}
                    <th style={{ width: '15%' }}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.data.items.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.product_info.name}</td>
                        {/* <td>{item.quantity} items</td> */}
                        <td>
                          Rp.
                          {FormatNumber(item.sub_price * item.quantity)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <th>total</th>
                    {/* <th>{total_qty} items</th> */}
                    <th>
                      Rp.
                      {FormatNumber(total_price)}
                    </th>
                  </tr>
                </tfoot>
              </Table>
            </>
          </section>
        </ModalBody>
        <ModalFooter>
          <Button color="white" style={Styles.ButtonFotter} onClick={toggle}>
            Cancel
          </Button>
          <Button color="primary" onClick={raiseInvoiceClicked}>
            Follow Up
          </Button>
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
        address={address}
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

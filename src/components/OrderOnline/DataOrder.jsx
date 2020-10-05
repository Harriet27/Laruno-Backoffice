import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetOrders } from '../../store/actions';
import DeleteIcon from '@material-ui/icons/Delete';
import DehazeIcon from '@material-ui/icons/Dehaze';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import moment from 'moment';
import FormatNumber from '../../elements/FormatNumber/FormatNumber';
import {
    Input,
    Th,
    sm,
    md,
    lg,
    Overflow,
} from '../../elements/Styled/StyledForm';

// --- Elements, Pages, Components --- //
// import AddNewOrders from './AddNewOrders';
// import UpdateOrders from './UpdateOrders';
// import DeleteOrders from './DeleteOrders';
import FollowUp from './FollowUp';
import Card from '../../elements/Card/Card';

// --- Styled Components --- //

const SectionOne = Styled.div`
    margin: ${lg} 0;
    display: flex;
    justify-content: space-between;
`;

const ButtonLink = Styled.button`
    background-color:#0098DA;
    padding: 5px;
    border-radius: 3px;
    color: white;
    font-size: ${md};
    border: 1px solid #ced4da;
    font-Weight: 400;
`;
// --- Batas --- //

const DataOrders = (props) => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders.getOrders);
    console.log(orders);

    // --- useEffect --- Get Data orders ---//
    useEffect(() => {
        dispatch(fetchGetOrders());
    }, [dispatch]);

    // --- For Multiple Delete --- //
    const [form, setForm] = useState({
        id: [],
    });

    // --- handleCheckboxChange --- //
    // const handleCheckboxChange = (event) => {
    //     let newArray = [...form.id, event.target.id];
    //     if (form.id.includes(event.target.id)) {
    //         newArray = newArray.filter((item) => item !== event.target.id);
    //     }
    //     setForm({
    //         id: newArray,
    //     });
    // };

    // // --- Multiple Delete --- //
    // const handlleMultipleDelete = (event) => {
    //     event.preventDefault();
    //     dispatch(fetchMultipleDeleteOrderss(form));
    // };

    function raiseInvoiceClicked() {
        const url =
            'https://wa.me/6281212408246?text=I%20am%20interested%20in%20your%20car%20for%20sale';
        window.open(url, '_blank');
    }
    return (
        <React.Fragment>
            {/* --- section 1 --- Add New Orders and Search Orders --- */}
            <SectionOne>
                {/* <AddNewOrders /> */}
                <div>
                    <label>Search</label> <Input type="search" />
                </div>
            </SectionOne>

            {/* --- section 2 --- Table Get Data Product In Table --- */}
            <Card isNormal>
                <Overflow>
                    <Table striped>
                        <thead>
                            <tr>
                                <Th>
                                    <DehazeIcon />
                                </Th>
                                <Th>Invoice Number</Th>
                                <Th>Tag</Th>
                                <Th>Orders Date</Th>
                                <Th>Costumer Name</Th>
                                <Th>Costumer Phone</Th>
                                <Th>Product</Th>
                                <Th>Total Price</Th>
                                <Th>Payment Status</Th>
                                <Th>Paid At</Th>
                                <Th>Follow Up</Th>
                                <Th>Actions</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders !== null &&
                                orders.data.map((item) => {
                                    return (
                                        <tr key={item._id}>
                                            <Th>
                                                <Input
                                                    checkbox
                                                    type="checkbox"
                                                    id={item._id}
                                                    value={item._id}
                                                    // onChange={handleCheckboxChange}
                                                />
                                            </Th>
                                            <Th as="td" td>
                                                {item.invoice_id}
                                            </Th>
                                            <Th as="td" td>
                                                -
                                            </Th>
                                            <Th as="td" td>
                                                {moment(item.created_at).format(
                                                    'MMMM Do YYYY, h:mm:ss a'
                                                )}
                                            </Th>
                                            <Th as="td" td>
                                                -
                                            </Th>
                                            <Th as="td" td>
                                                -
                                            </Th>
                                            <Th as="td" td>
                                                {item.cart.items.map((user) => {
                                                    return (
                                                        <React.Fragment
                                                            key={item._id}
                                                        >
                                                            {user.item.name}
                                                        </React.Fragment>
                                                    );
                                                })}
                                            </Th>
                                            <Th as="td" td>
                                                Rp.{' '}
                                                {FormatNumber(
                                                    item.cart.total_price
                                                )}
                                            </Th>
                                            <Th as="td" td>
                                                {item.status}
                                            </Th>
                                            <Th as="td" td>
                                                -
                                            </Th>
                                            <Th as="td" td>
                                                <FollowUp />
                                            </Th>
                                            <Th as="td" td>
                                                <Link
                                                    to={`/order/detail/${item._id}`}
                                                >
                                                    <ButtonLink>
                                                        detail
                                                    </ButtonLink>
                                                </Link>
                                            </Th>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </Table>
                </Overflow>
            </Card>
        </React.Fragment>
    );
};

export default DataOrders;

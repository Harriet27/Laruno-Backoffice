import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetOrders } from '../../store/actions';
import DeleteIcon from '@material-ui/icons/Delete';
import DehazeIcon from '@material-ui/icons/Dehaze';
import moment from 'moment';
import FormatNumber from '../../elements/FormatNumber/FormatNumber';
import { Input, Th, sm, md, lg } from '../../elements/Styled/StyledForm';

// --- Elements, Pages, Components --- //
// import AddNewOrders from './AddNewOrders';
// import UpdateOrders from './UpdateOrders';
// import DeleteOrders from './DeleteOrders';
import Card from '../../elements/Card/Card';

// --- Styled Components --- //

const SectionOne = Styled.div`
    margin: ${lg} 0;
    display: flex;
    justify-content: space-between;
`;
// --- Batas --- //

const DataOrders = (props) => {
    const dispatch = useDispatch();
    const order = useSelector((state) => state.order.getOrders);
    console.log(order);

    // --- useEffect --- Get Data order ---//
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
                <Table striped>
                    <thead>
                        <tr>
                            <Th>
                                <input type="checkbox" />
                            </Th>
                            <Th>Invoice Number</Th>
                            <Th>Tag</Th>
                            <Th>Order Date</Th>
                            <Th>Costumer Name</Th>
                            <Th>Costumer Phone</Th>
                            <Th>Product</Th>
                            <Th>Total Price</Th>
                            <Th>Payment Status</Th>
                            <Th>Paid At</Th>
                            <Th>Seller</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {order !== null &&
                            order.data.map((item) => {
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
                                        <Th as="td" td></Th>
                                        <Th as="td" td></Th>
                                        <Th as="td" td>
                                            {moment(item.created_at).format(
                                                'MMMM Do YYYY, h:mm:ss a'
                                            )}
                                        </Th>
                                        <Th as="td" td>
                                            {item.merchant_name}
                                        </Th>
                                        <Th as="td" td></Th>
                                        <Th as="td" td></Th>
                                        <Th as="td" td>
                                            Rp. {FormatNumber(item.amount)}
                                        </Th>
                                        <Th as="td" td>
                                            {item.status}
                                        </Th>
                                        <Th as="td" td></Th>
                                        <Th as="td" td></Th>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
            </Card>
        </React.Fragment>
    );
};

export default DataOrders;

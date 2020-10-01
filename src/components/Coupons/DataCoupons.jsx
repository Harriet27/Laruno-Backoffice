import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchGetCoupons,
    fetchMultipleDeleteCoupons,
} from '../../store/actions';
import DeleteIcon from '@material-ui/icons/Delete';
import DehazeIcon from '@material-ui/icons/Dehaze';
import moment from 'moment';
import { Input, Th, sm, md, lg } from '../../elements/Styled/StyledForm';

// --- Elements, Pages, Components --- //
import AddCoupons from './AddCoupons';
// import UpdateCoupons from './UpdateCoupons';
// import DeleteCoupons from './DeleteCoupons';
import Card from '../../elements/Card/Card';

// --- Styled Components --- //

const SectionOne = Styled.div`
    margin: ${lg} 0;
    display: flex;
    justify-content: space-between;
`;
// --- Batas --- //

const DataCoupons = (props) => {
    const dispatch = useDispatch();
    const coupons = useSelector((state) => state.coupons.getCoupons);
    console.log(coupons, 'isi coupon');

    // --- useEffect --- Get Data coupons ---//
    useEffect(() => {
        dispatch(fetchGetCoupons());
    }, [dispatch]);

    // --- For Multiple Delete --- //
    const [form, setForm] = useState({
        id: [],
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
    const handlleMultipleDelete = (event) => {
        event.preventDefault();
        dispatch(fetchMultipleDeleteCoupons(form));
    };
    return (
        <section style={{ margin: '50px' }}>
            {/* --- section 1 --- Add New Coupons and Search Coupons --- */}
            <SectionOne>
                {/* <AddNewCoupons /> */}
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
                                <div>
                                    {form.id[0] ? (
                                        <div onClick={handlleMultipleDelete}>
                                            <DeleteIcon color="error" />
                                        </div>
                                    ) : (
                                        <DehazeIcon />
                                    )}
                                </div>
                            </Th>
                            <Th>Name</Th>
                            <Th>Code</Th>
                            <Th>Max Discount</Th>
                            <Th>Start Coupon</Th>
                            <Th>End Coupon</Th>
                            <Th>Payment Method</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons !== null &&
                            coupons.data.map((item) => {
                                return (
                                    <tr key={item._id}>
                                        <Th>
                                            <Input
                                                checkbox
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
                                            {moment(item.start_date).format(
                                                'MMMM Do YYYY, h:mm:ss a'
                                            )}
                                        </Th>
                                        <Th as="td" td>
                                            {moment(item.end_date).format(
                                                'MMMM Do YYYY, h:mm:ss a'
                                            )}
                                        </Th>
                                        <Th as="td" td>
                                            {item.payment_method}
                                        </Th>
                                        <Th as="td" td>
                                            <AddCoupons />
                                        </Th>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
            </Card>
        </section>
    );
};

export default DataCoupons;

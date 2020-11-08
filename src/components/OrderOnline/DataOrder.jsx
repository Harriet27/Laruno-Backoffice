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
// --- Styled Components --- //

const DataOrders = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const orders = useSelector((state) => state.orders.getOrders);

    console.log('Get All Data orders', orders);
    // --- PAGINATION --- //
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

    // --- Multiple Delete --- //
    // const handleMultipleDelete = (event) => {
    //     event.preventDefault();
    //     dispatch(fetchMultipleDeleteOrderss(form));
    // };

    // --- Multiple Clone --- //
    // const handleMultipleClone = (event) => {
    //     event.preventDefault();
    //     dispatch(fetchMultipleCloneProduct(form));
    // };

    // --- handle Change --- //
    const handleChange = (event) => {
        setSearching({ ...searching, [event.target.name]: event.target.value });
    };

    // const handleSearch = (event) => {
    //     event.preventDefault();
    //     dispatch(fetchFindProduct(searching));
    // };
    let total_count = 0;
    orders !== null &&
        orders.data.map((items) => {
            return (total_count += items.orders_count);
        });
    console.log(total_count);
    return (
        <React.Fragment>
            {/* --- section 1 --- Button Action link to Add Product ---*/}
            {form.id[0] ? (
                <Dropdown size="sm" isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle
                        style={{ backgroundColor: '#0098DA' }}
                        caret
                    >
                        Actions
                    </DropdownToggle>
                    <DropdownMenu>
                        {/* <MultipleDelete onSubmit={handleMultipleDelete} /> */}

                        {/* <DropdownItem onClick={handleMultipleClone}>
                                Clone
                            </DropdownItem> */}
                    </DropdownMenu>
                </Dropdown>
            ) : (
                <Dropdown size="sm" isOpen={dropdownOpen} toggle={toggle}>
                    {' '}
                    <DropdownToggle
                        style={{ backgroundColor: '#0098DA' }}
                        caret
                        disabled
                    >
                        Actions
                    </DropdownToggle>
                </Dropdown>
            )}

            <div
                style={{
                    margin: '20px 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
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
                    {/* ------ jika product !== null return hasil get product jika masih nulltampilkan loading,
                     di dalam product apabila ternyata data.lentgh < 0 maka tampilkan table kosong -------*/}
                    {orders === null ? (
                        <React.Fragment>
                            <Table>
                                <thead>
                                    <tr>
                                        <Th>
                                            <DehazeIcon />
                                        </Th>
                                        <Th>Invoice Number</Th>
                                        <Th>Orders Date</Th>
                                        <Th>Costumer Name</Th>
                                        <Th>Costumer Phone</Th>
                                        <Th>Product</Th>
                                        <Th>Total Price</Th>
                                        <Th>Payment Status</Th>
                                        {/* <Th>Paid At</Th> */}
                                        <Th style={{ width: '100px' }}>
                                            Follow Up
                                        </Th>

                                        <Th style={{ width: '100px' }}>
                                            Actions
                                        </Th>
                                    </tr>
                                </thead>
                            </Table>
                            <div
                                style={{
                                    textAlign: 'center',
                                    padding: '100px',
                                }}
                            >
                                Loading ...
                            </div>
                        </React.Fragment>
                    ) : orders.data.length >= 1 ? (
                        <Table>
                            <thead>
                                <tr>
                                    <Th>
                                        <DehazeIcon />
                                    </Th>
                                    <Th>Invoice Number</Th>
                                    <Th>Orders Date</Th>
                                    <Th>Costumer Name</Th>
                                    <Th>Costumer Phone</Th>
                                    <Th>Product</Th>
                                    <Th>Total Price</Th>
                                    <Th>Payment Status</Th>
                                    {/* <Th>Paid At</Th> */}
                                    <Th style={{ width: '100px' }}>
                                        Follow Up
                                    </Th>

                                    <Th style={{ width: '100px' }}>Actions</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.data.map((items) => {
                                    return (
                                        <React.Fragment key={items._id}>
                                            {items.orders
                                                .slice(
                                                    page * rowsPerPage,
                                                    page * rowsPerPage +
                                                        rowsPerPage
                                                )
                                                .map((item) => {
                                                    return (
                                                        <tr key={item.order_id}>
                                                            <Th as="td" td>
                                                                <input type="checkbox" />
                                                            </Th>
                                                            <Th as="td" td>
                                                                {item.order_id}
                                                            </Th>
                                                            <Th as="td" td>
                                                                -
                                                            </Th>
                                                            <Th as="td" td>
                                                                {
                                                                    items
                                                                        .user_info
                                                                        .name
                                                                }
                                                            </Th>
                                                            <Th as="td" td>
                                                                {
                                                                    items
                                                                        .user_info
                                                                        .phone_number
                                                                }
                                                            </Th>
                                                            <Th as="td" td>
                                                                -
                                                                {/* {item.items.map(
                                                                    (
                                                                        product
                                                                    ) => {
                                                                        return (
                                                                            <React.Fragment
                                                                                key={
                                                                                    product._id
                                                                                }
                                                                            >
                                                                                {
                                                                                    product
                                                                                        .product_info
                                                                                        .name
                                                                                }

                                                                                ,{' '}
                                                                            </React.Fragment>
                                                                        );
                                                                    }
                                                                )} */}
                                                            </Th>
                                                            <Th as="td" td>
                                                                {
                                                                    item.total_price
                                                                }
                                                            </Th>
                                                            <Th as="td" td>
                                                                {
                                                                    item.payment
                                                                        .status
                                                                }
                                                            </Th>
                                                            <Th as="td" td>
                                                                <button
                                                                    onClick={() => {
                                                                        // window.location.href = `http://localhost:3000/orders/followup/${item.order_id}`;
                                                                        const url = `http://localhost:3000/orders/followup/${item.order_id}`;
                                                                        window.open(
                                                                            url,
                                                                            '_blank'
                                                                        );
                                                                    }}
                                                                >
                                                                    Click
                                                                </button>
                                                            </Th>
                                                            <Th as="td" td>
                                                                Actions
                                                            </Th>
                                                        </tr>
                                                    );
                                                })}
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <TablePagination
                                        rowsPerPageOptions={[10, 15, 20]}
                                        count={total_count}
                                        rowsPerPage={rowsPerPage * 2}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={
                                            handleChangeRowsPerPage
                                        }
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
                                        <Th style={{ width: '100px' }}>
                                            Actions
                                        </Th>
                                    </tr>
                                </thead>
                            </Table>
                            <div
                                style={{
                                    textAlign: 'center',
                                    padding: '100px',
                                }}
                            >
                                You have no orders in this date range.
                            </div>
                        </React.Fragment>
                    )}
                </Overflow>
            </Card>
        </React.Fragment>
    );
};

export default DataOrders;

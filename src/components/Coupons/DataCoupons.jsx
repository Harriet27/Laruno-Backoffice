import React, { useEffect, useState } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

import { Table } from 'reactstrap';
import Card from '../../elements/Card/Card';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import DehazeIcon from '@material-ui/icons/Dehaze';
import { Input, Th, Overflow, md } from '../../elements/Styled/StyledForm';
import moment from 'moment';

// --- Elements, Pages, Components --- //
import {
    fetchGetCoupons,
    fetchMultipleCloneCoupons,
    fetchMultipleDeleteCoupons,
    // fetchMultipleClone,
    // fetchFindProduct,
    // fetchPostTopic,
} from '../../store/actions';
import AddCoupons from './AddCoupons';
import DeleteCoupons from './DeleteCoupons';
import UpdateCoupons from './UpdateCoupons';
// --- Styled Components --- //

const DataTopic = (props) => {
    const dispatch = useDispatch();
    const coupons = useSelector((state) => state.coupons.getCoupons);
    console.log(coupons, 'isi coupon');

    // --- useEffect --- Get Data coupons ---//
    useEffect(() => {
        dispatch(fetchGetCoupons());
    }, [dispatch]);
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
    console.log(searching, 'pen tau');
    // --- useEffect --- Get Data Topic ---//
    useEffect(() => {
        dispatch(fetchGetCoupons());
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
    const handlleMultipleDelete = (event) => {
        event.preventDefault();
        dispatch(fetchMultipleDeleteCoupons(form));
    };

    // --- Multiple Clone --- //
    const handlleMultipleClone = (event) => {
        event.preventDefault();
        dispatch(fetchMultipleCloneCoupons(form));
    };

    // --- handle Change --- //
    const handleChange = (event) => {
        setSearching({ ...searching, [event.target.name]: event.target.value });
    };

    // const handleSearch = (event) => {
    //     event.preventDefault();
    //     dispatch(fetchFindProduct(searching));
    // };

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
                        <DropdownItem onClick={handlleMultipleDelete}>
                            Delete
                        </DropdownItem>
                        <DropdownItem onClick={handlleMultipleClone}>
                            Clone
                        </DropdownItem>
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
                <AddCoupons />

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
                    {coupons === null ? (
                        <React.Fragment>
                            <Table>
                                <thead>
                                    <tr>
                                        <Th>
                                            <DehazeIcon />
                                        </Th>
                                        <Th>Name</Th>
                                        <Th>Code</Th>
                                        <Th>Max Discount</Th>
                                        <Th>Start Coupon</Th>
                                        <Th>End Coupon</Th>
                                        <Th>Payment Method</Th>
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
                    ) : coupons.data.length >= 1 ? (
                        <Table>
                            <thead>
                                <tr>
                                    <Th>
                                        <Input checkbox type="checkbox" />
                                    </Th>
                                    <Th>Name</Th>
                                    <Th>Code</Th>
                                    <Th>Max Discount</Th>
                                    <Th>Start Coupon</Th>
                                    <Th>End Coupon</Th>
                                    <Th>Payment Method</Th>
                                    <Th style={{ width: '100px' }}>Actions</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {coupons.data
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((item) => {
                                        return (
                                            <tr key={item._id}>
                                                <Th as="td">
                                                    <Input
                                                        checkbox
                                                        type="checkbox"
                                                        id={item._id}
                                                        value={item._id}
                                                        onChange={
                                                            handleCheckboxChange
                                                        }
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
                                                    {moment(
                                                        item.created_at
                                                    ).format(
                                                        'MMMM Do YYYY, h:mm:ss a'
                                                    )}
                                                </Th>
                                                <Th as="td" td>
                                                    {moment(
                                                        item.updated_at
                                                    ).format(
                                                        'MMMM Do YYYY, h:mm:ss a'
                                                    )}
                                                </Th>
                                                <Th as="td" td>
                                                    {item.payment_method}
                                                </Th>
                                                <Th as="td" td>
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection:
                                                                'row',
                                                        }}
                                                    >
                                                        <UpdateCoupons
                                                            id={item._id}
                                                        />
                                                        <DeleteCoupons
                                                            id={item._id}
                                                        />
                                                    </div>
                                                </Th>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 15]}
                                        count={
                                            coupons !== null &&
                                            coupons.data.length
                                        }
                                        rowsPerPage={rowsPerPage}
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
                                You have no coupons in this date range.
                            </div>
                        </React.Fragment>
                    )}
                </Overflow>
            </Card>
        </React.Fragment>
    );
};

export default DataTopic;

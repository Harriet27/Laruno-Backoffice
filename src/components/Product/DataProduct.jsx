import React, { useEffect, useState } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import Card from '../../elements/Card/Card';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import DehazeIcon from '@material-ui/icons/Dehaze';
import { Input, Th, Overflow, md } from '../../elements/Styled/StyledForm';
import CircularProgress from '@material-ui/core/CircularProgress';
import CreateIcon from '@material-ui/icons/Create';
import DescriptionIcon from '@material-ui/icons/Description';
// --- Elements, Pages, Components --- //
import {
    fetchGetProduct,
    fetchMultipleDeleteProduct,
    fetchMultipleCloneProduct,
    fetchFindProduct,
    fetchPostProducts,
} from '../../store/actions';
import DeleteProduct from './DeleteProduct';
import FormatNumber from '../../elements/FormatNumber/FormatNumber';
// --- Styled Components --- //

const ButtonLink = Styled.button`
    background-color:${(props) => (props.detail ? 'grey' : '#0098DA')};
    padding: 5px;
    border-radius: 3px;
    color: white;
    font-size: ${md};
    border: 1px solid #ced4da;
    font-Weight: 400;
`;

const DataProduct = (props) => {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product.getProduct);

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
    });

    const [searching, setSearching] = useState({
        search: '',
    });
    console.log(searching, 'pen tau');
    // --- useEffect --- Get Data Topic ---//
    useEffect(() => {
        dispatch(fetchGetProduct());
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
        dispatch(fetchMultipleDeleteProduct(form));
    };

    // --- Multiple Clone --- //
    const handlleMultipleClone = (event) => {
        event.preventDefault();
        dispatch(fetchMultipleCloneProduct(form));
    };

    // --- handle Change --- //
    const handleChange = (event) => {
        setSearching({ ...searching, [event.target.name]: event.target.value });
    };

    const handleSearch = (event) => {
        event.preventDefault();
        dispatch(fetchFindProduct(searching));
    };

    return (
        <React.Fragment>
            {/* --- section 1 --- Button Action link to Add Product ---*/}
            <div
                style={{
                    margin: '20px 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
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
                    {product === null ? (
                        <React.Fragment>
                            <Table>
                                <thead>
                                    <tr>
                                        <Th>
                                            <DehazeIcon />
                                        </Th>
                                        <Th>Visibility</Th>
                                        <Th>Product Code</Th>
                                        <Th>Name</Th>
                                        <Th>Product Type</Th>
                                        <Th>Time Period</Th>
                                        <Th>Price</Th>
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
                    ) : product.data.length >= 1 ? (
                        <Table>
                            <thead>
                                <tr>
                                    <Th>
                                        <DehazeIcon />
                                    </Th>
                                    <Th>Visibility</Th>
                                    <Th>Product Code</Th>
                                    <Th>Name</Th>
                                    <Th>Product Type</Th>
                                    <Th>Time Period</Th>
                                    <Th>Price</Th>
                                    <Th style={{ width: '100px' }}>Actions</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row)  */}
                                {product.data
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((item) => {
                                        return (
                                            <tr key={item._id}>
                                                <Th>
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
                                                    {item.visibility}
                                                </Th>
                                                <Th as="td" td>
                                                    {item.code}
                                                </Th>
                                                <Th as="td" td>
                                                    {item.name}
                                                </Th>
                                                <Th as="td" td>
                                                    {item.type}
                                                </Th>
                                                <Th as="td" td>
                                                    {item.time_period} Months
                                                </Th>
                                                <Th as="td" td>
                                                    Rp.{' '}
                                                    {FormatNumber(item.price)}
                                                </Th>
                                                <Th as="td" td>
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection:
                                                                'row',
                                                        }}
                                                    >
                                                        <Link
                                                            to={`/product/show/${item._id}`}
                                                        >
                                                            <ButtonLink detail>
                                                                <DescriptionIcon fontSize="small" />
                                                            </ButtonLink>
                                                        </Link>
                                                        <Link
                                                            to={`/product/update/${item._id}`}
                                                        >
                                                            <ButtonLink>
                                                                <CreateIcon fontSize="small" />
                                                            </ButtonLink>
                                                        </Link>
                                                        <DeleteProduct
                                                            id={item._id}
                                                        />
                                                    </div>
                                                </Th>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                            <tfoot>
                                <TablePagination
                                    rowsPerPageOptions={[10, 20, 100]}
                                    // component="div"
                                    // colSpan={3}
                                    count={
                                        product !== null && product.data.length
                                    }
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    // component="div"
                                    // SelectProps={{
                                    //     inputProps: {
                                    //         'aria-label': 'rows per page',
                                    //     },
                                    //     native: true,
                                    // }}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={
                                        handleChangeRowsPerPage
                                    }
                                    // ActionsComponent={TablePaginationActions}
                                />
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
                                        <Th>Visibility</Th>
                                        <Th>Product Code</Th>
                                        <Th>Name</Th>
                                        <Th>Product Type</Th>
                                        <Th>Time Period</Th>
                                        <Th>Price</Th>
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
                                You have no product in this date range.
                            </div>
                        </React.Fragment>
                    )}
                </Overflow>
            </Card>
        </React.Fragment>
    );
};

export default DataProduct;

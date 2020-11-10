import React, { useEffect, useState } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import Card from '../../elements/Card/Card';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import DehazeIcon from '@material-ui/icons/Dehaze';
import {
  Input,
  Th,
  Overflow,
  md,
  ButtonActions,
} from '../../elements/Styled/StyledForm';
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
import MultipleDelete from '../../elements/Alert/MultipleDelete';
import { StylesProvider } from '@material-ui/core';
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

  console.log('product', product);
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
  });

  const [searching, setSearching] = useState({
    search: '',
  });

  // --- useEffect --- Get Data Topic ---//
  useEffect(() => {
    dispatch(fetchGetProduct());
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
  const handleMultipleDelete = (event) => {
    event.preventDefault();
    dispatch(fetchMultipleDeleteProduct(form));
  };

  // --- Multiple Clone --- //
  const handleMultipleClone = (event) => {
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
            <DropdownToggle style={{ backgroundColor: '#0098DA' }} caret>
              Actions
            </DropdownToggle>
            <DropdownMenu>
              <MultipleDelete onSubmit={handleMultipleDelete} />

              <ButtonActions onClick={handleMultipleClone}>Clone</ButtonActions>
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
                    <Th>Name</Th>
                    <Th>Visibility</Th>
                    <Th>Product Code</Th>
                    <Th>Inventory</Th>
                    <Th>Product Type</Th>
                    <Th>Time Period</Th>
                    <Th>Price</Th>
                    <Th style={{ width: '100px' }}>Actions</Th>
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
            <Table striped>
              <thead>
                <tr>
                  <Th>
                    <Input checkbox type="checkbox" />
                  </Th>
                  <Th>Name</Th>
                  <Th>Visibility</Th>
                  <Th>Product Code</Th>
                  <Th>Inventory</Th>
                  <Th>Product Type</Th>
                  <Th style={{ width: '10%' }}>Time Period</Th>
                  <Th style={{ width: '10%' }}>Price</Th>
                  <Th style={{ width: '10%' }}>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {product.data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => {
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
                          <div style={Styles.Name}>{item.name}</div>
                        </Th>
                        <Th as="td" td>
                          {item.visibility}
                        </Th>
                        <Th as="td" td>
                          {item.code}
                        </Th>
                        <Th as="td" td>
                          <div style={Styles.Inventory}>
                            {item.ecommerce === undefined
                              ? 'Non Ecommerce'
                              : `${item.ecommerce.stock} In Stock`}
                          </div>
                        </Th>
                        <Th as="td" td>
                          {item.type}
                        </Th>

                        <Th as="td" td>
                          {item.time_period} Months
                        </Th>
                        <Th as="td" td>
                          Rp. {FormatNumber(item.price)}
                        </Th>
                        <Th as="td" td>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                            }}
                          >
                            <Link to={`/product/show/${item._id}`}>
                              <ButtonLink detail>
                                <DescriptionIcon fontSize="small" />
                              </ButtonLink>
                            </Link>
                            <Link to={`/product/update/${item._id}`}>
                              <ButtonLink>
                                <CreateIcon fontSize="small" />
                              </ButtonLink>
                            </Link>
                            <DeleteProduct id={item._id} />
                          </div>
                        </Th>
                      </tr>
                    );
                  })}
              </tbody>
              <tfoot>
                <tr>
                  <TablePagination
                    rowsPerPageOptions={[10, 15, 20]}
                    count={product !== null && product.data.length}
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
                    <Th>Visibility</Th>
                    <Th>Product Code</Th>
                    <Th>Name</Th>
                    <Th>Product Type</Th>
                    <Th>Time Period</Th>
                    <Th>Price</Th>
                    <Th style={{ width: '100px' }}>Actions</Th>
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

const Styles = {
  Name: { color: '#0098da', fontWeight: '700' },
  Inventory: { color: '#28a745', fontWeight: 'bolder' },
};

export default DataProduct;

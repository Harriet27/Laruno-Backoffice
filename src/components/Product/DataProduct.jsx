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
  fetchGetListProduct,
  fetchMultipleDeleteProduct,
  fetchMultipleCloneProduct,
  fetchGetOrders,
  fetchGetContents,
} from '../../store/actions';
import DeleteProduct from './DeleteProduct';
import FormatNumber from '../../elements/FormatNumber/FormatNumber';
import MultipleDelete from '../../elements/Alert/MultipleDelete';
import { CircularProgress, StylesProvider } from '@material-ui/core';
import TotalDataProduct from './TotalDataProduct';
import MultipleActions from '../../elements/MultipleActions/MultipleActions';
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
  const product = useSelector((state) => state.product.getListProduct);
  // const product = useSelector((state) => state.product.getProduct);
  console.log({ product });
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

  const [form, setForm] = useState({
    id: [],
  });

  // Searchbar
  const [input, setInput] = useState('');
  const handleInput = (event) => {
    setInput(event.target.value);
  };
  const productFilter =
    product !== null &&
    product.data;

  useEffect(() => {
    dispatch(fetchGetListProduct());
    // dispatch(fetchGetProduct());
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

  const TableHeading = () => {
    return (
      <thead>
        <tr>
          <Th>
            <Input isCheckbox type="checkbox" />
          </Th>
          <Th>Name</Th>
          {/* <Th>Created At</Th> */}
          <Th>Visibility</Th>
          <Th style={{ width: '10%' }}>Product Code</Th>
          <Th>Inventory</Th>
          <Th>Info</Th>
          <Th>Product Type</Th>
          <Th>Time Period</Th>
          <Th>Price</Th>
          <Th style={{ width: '10%' }}>Actions</Th>
        </tr>
      </thead>
    );
  };

  const TableBody = (item, index) => {
    return (
      <tr key={item.product._id}>
        <Th>
          <Input
            isCheckbox
            type="checkbox"
            id={item.product._id}
            value={item.product._id}
            onChange={handleCheckboxChange}
          />
        </Th>
        <Th as="td" td>
          <div style={Styles.Name}>{item.product.name}</div>
        </Th>
        {/* <Th as="td" td>
          Date: {item.product.created_at.substring(0,10)}
          <br/>
          Time: {item.product.created_at.substring(11,19)}
        </Th> */}
        <Th as="td" td>
          {item.product.visibility}
        </Th>
        <Th as="td" td>
          <div>{item.product.code}</div>
        </Th>
        <Th as="td" td>
          <div style={Styles.Inventory}>
            {item.product.type !== 'ecommerce' ? (
              <div style={{ textAlign: 'center' }}>-</div>
            ) : item.product.ecommerce === undefined ? (
              '0 in stock'
            ) : (
              `${item.product.ecommerce.stock} in Stock`
            )}
          </div>
        </Th>
        <Th as="td" td>
          <div style={Styles.isOrders}>Orders: {item.count.order}</div>
          <div style={Styles.isContents}>Coupon: {item.count.coupon}</div>
        </Th>
        <Th as="td" td>
          {item.product.type}
        </Th>

        <Th as="td" td>
          {item.product.time_period} Months
        </Th>
        <Th as="td" td>
          Rp. {FormatNumber(item.product.price)}
        </Th>
        <Th as="td" td>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Link to={`/product/show/${item.product._id}`}>
              <ButtonLink detail>
                <DescriptionIcon fontSize="small" />
              </ButtonLink>
            </Link>
            <Link to={`/product/update/${item.product._id}`}>
              <ButtonLink>
                <CreateIcon fontSize="small" />
              </ButtonLink>
            </Link>
            <DeleteProduct id={item.product._id} />
          </div>
        </Th>
      </tr>
    );
  };

  // const TableBody = (item, index) => {
  //   return (
  //     <tr key={item._id}>
  //       <Th>
  //         <Input
  //           isCheckbox
  //           type="checkbox"
  //           id={item._id}
  //           value={item._id}
  //           onChange={handleCheckboxChange}
  //         />
  //       </Th>
  //       <Th as="td" td>
  //         <div style={Styles.Name}>{item.name}</div>
  //       </Th>
  //       <Th as="td" td>
  //         {item.visibility}
  //       </Th>
  //       <Th as="td" td>
  //         <div>{item.code}</div>
  //       </Th>
  //       <Th as="td" td>
  //         <div style={Styles.Inventory}>
  //           {item.type !== 'ecommerce' ? (
  //             <div style={{ textAlign: 'center' }}>-</div>
  //           ) : item.ecommerce === undefined ? (
  //             '0 in stock'
  //           ) : (
  //             `${item.ecommerce.stock} in Stock`
  //           )}
  //         </div>
  //       </Th>
  //       {/* <Th as="td" td>
  //         <div style={Styles.isOrders}>Orders: {item.count.order}</div>
  //         <div style={Styles.isContents}>Coupon: {item.count.coupon}</div>
  //       </Th> */}
  //       <Th as="td" td>
  //         {item.type}
  //       </Th>

  //       <Th as="td" td>
  //         {item.time_period} Months
  //       </Th>
  //       <Th as="td" td>
  //         Rp. {FormatNumber(item.price)}
  //       </Th>
  //       <Th as="td" td>
  //         <div
  //           style={{
  //             display: 'flex',
  //             flexDirection: 'row',
  //           }}
  //         >
  //           <Link to={`/product/show/${item._id}`}>
  //             <ButtonLink detail>
  //               <DescriptionIcon fontSize="small" />
  //             </ButtonLink>
  //           </Link>
  //           <Link to={`/product/update/${item._id}`}>
  //             <ButtonLink>
  //               <CreateIcon fontSize="small" />
  //             </ButtonLink>
  //           </Link>
  //           <DeleteProduct id={item._id} />
  //         </div>
  //       </Th>
  //     </tr>
  //   );
  // };

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

  const SearchBar = () => {
    return (
      <Table striped>
        {TableHeading()}
        <tbody>
          {productFilter
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => {
              return TableBody(item, index);
            })}
        </tbody>
        <tfoot>{TableFooter(productFilter.length)}</tfoot>
      </Table>
    );
  };

  return (
    <>
      <>
        <TotalDataProduct product={product} />
      </>
      <React.Fragment>
        <div
          style={{
            margin: '20px 0',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <MultipleActions
            isLogic={form.id[0]}
            handleClone={handleMultipleClone}
            handleDelete={handleMultipleDelete}
          />
          <div>
            <Input
              type="search"
              name="search"
              value={input}
              onChange={handleInput}
              placeholder="Search.."
            />
          </div>
        </div>

        <Card isNormal>
          <Overflow>
            {product === null ? (
              <React.Fragment>
                <Table>{TableHeading()}</Table>
                <div
                  style={{
                    textAlign: 'center',
                    padding: '100px',
                  }}
                >
                  <CircularProgress />
                </div>
              </React.Fragment>
            ) : productFilter.length === 0 && product.data.length > 0 ? (
              <Table striped>
                {TableHeading()}
                <tbody>
                  {product.data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, index) => {
                      return TableBody(item, index);
                    })}
                </tbody>
                <tfoot>
                  {TableFooter(product !== null && product.data.length)}
                </tfoot>
              </Table>
            ) : productFilter.length > 0 ? (
              SearchBar()
            ) : (
              <React.Fragment>
                <Table>{TableHeading()}</Table>
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
    </>
  );
};

const Styles = {
  Name: { color: '#0098da', fontWeight: '700' },
  Inventory: { color: '#28a745', fontWeight: 'bolder' },
  isCode: {
    background: '#cfd3ce',
    color: 'gray',
    padding: '.5em .5em',
    borderBottom: '1px solid rgba(0,0,0,.05)',
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
    maxWidth: '100%',
    marginBottom: '5px',
  },
  isOrders: {
    background: '#bce6eb',
    marginBottom: '5px',
    color: '#92817a',
    padding: '.1em .5em',
    borderRadius: '30px',
    borderBottom: '1px solid rgba(0,0,0,.05)',
    textAlign: 'center',
    fontSize: '12px',
    maxWidth: '100%',
    fontWeight: 'bold',
  },
  isContents: {
    background: '#cfd3ce',
    marginBottom: '5px',
    color: '#92817a',
    padding: '.1em .5em',
    borderRadius: '30px',
    borderBottom: '1px solid rgba(0,0,0,.05)',
    textAlign: 'center',
    fontSize: '12px',
    maxWidth: '100%',
    fontWeight: 'bold',
  },
};

export default DataProduct;

import React, { useEffect, useState } from 'react';
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
import DeleteIcon from '@material-ui/icons/Delete';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { Input, Th, Overflow, md } from '../../elements/Styled/StyledForm';
import CircularProgress from '@material-ui/core/CircularProgress';
// --- Elements, Pages, Components --- //
import {
    fetchGetProduct,
    fetchMultipleDeleteProduct,
    fetchMultipleCloneProduct,
} from '../../store/actions';
import DeleteProduct from './DeleteProduct';
import FormatNumber from '../../elements/FormatNumber/FormatNumber';
// --- Styled Components --- //

const ButtonLink = Styled.button`
    background-color:#0098DA;
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

    // --- Dropdown --- //
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const [form, setForm] = useState({
        id: [],
    });

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
                    <label>Search</label> <Input type="search" />
                </div>
            </div>

            {/* --- section 2 --- Get Data Product --- */}
            <Card isNormal>
                {/* --- untuk hapus melalui button --- */}
                <Overflow>
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
                                <Th>Actions</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {product === null
                                ? // --- Test Logic Loading get data --- //
                                  'loading ....'
                                : product.data.map((item) => {
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
                                                  Rp. {FormatNumber(item.price)}
                                              </Th>
                                              <Th as="td" td>
                                                  <div
                                                      style={{
                                                          display: 'flex',
                                                          flexDirection: 'row',
                                                      }}
                                                  >
                                                      <Link
                                                          to={`/product/show/${item._id}`}
                                                      >
                                                          <ButtonLink>
                                                              Show
                                                          </ButtonLink>
                                                      </Link>
                                                      <Link
                                                          to={`/product/update/${item._id}`}
                                                      >
                                                          <ButtonLink>
                                                              Update
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
                    </Table>
                </Overflow>
            </Card>
        </React.Fragment>
    );
};

export default DataProduct;

// --- Testing --- //

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// function DataProduct() {
//     const [studentState, setStudentState] = useState([]);

//     useEffect(() => {
//         let studentState = [
//             { id: 1, firstname: 'Stone', lastname: 'cold', major: 'wwf' },
//             { id: 2, firstname: 'Stone', lastname: 'cold', major: 'wwf' },
//             { id: 3, firstname: 'Stone', lastname: 'cold', major: 'wwf' },
//         ];

//         setStudentState(
//             studentState.map((d) => {
//                 return {
//                     select: false,
//                     id: d.id,
//                     firstname: d.firstname,
//                     lastname: d.lastname,
//                     major: d.major,
//                 };
//             })
//         );
//     }, []);

//     return (
//         <div className="container">
//             <Link to="/add">
//                 <button
//                     type="button"
//                     className="btn btn-primary btn-sm float-right my-3"
//                 >
//                     Add
//                 </button>
//             </Link>
//             <table className="table table-bordered">
//                 <thead>
//                     <tr>
//                         <th scope="col">
//                             <input
//                                 type="checkbox"
//                                 onChange={(e) => {
//                                     let checked = e.target.checked;
//                                     setStudentState(
//                                         studentState.map((d) => {
//                                             d.select = checked;
//                                             return d;
//                                         })
//                                     );
//                                 }}
//                             ></input>
//                         </th>
//                         <th scope="col">First</th>
//                         <th scope="col">Last</th>
//                         <th scope="col">Handle</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {studentState.map((d, i) => (
//                         <tr key={d.id}>
//                             <th scope="row">
//                                 <input
//                                     onChange={(event) => {
//                                         let checked = event.target.checked;
//                                         setStudentState(
//                                             studentState.map((data) => {
//                                                 if (d.id === data.id) {
//                                                     data.select = checked;
//                                                 }
//                                                 return data;
//                                             })
//                                         );
//                                     }}
//                                     type="checkbox"
//                                     checked={d.select}
//                                 ></input>
//                             </th>
//                             <td>{d.firstname}</td>
//                             <td>{d.lastname}</td>
//                             <td>{d.major}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default DataProduct;

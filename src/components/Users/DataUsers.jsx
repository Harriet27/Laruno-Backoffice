// // --- Khusus Super Admin --- //
// import React, { useEffect, useState } from 'react';
// import { Table } from 'reactstrap';
// import Styled from 'styled-components';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//     fetchGetUsersAdministrator,
//     fetchMultipleDeleteUsers,
// } from '../../store/actions';
// import DeleteIcon from '@material-ui/icons/Delete';
// import DehazeIcon from '@material-ui/icons/Dehaze';
// import moment from 'moment';
// import { Input, Th, sm, md, lg } from '../../elements/Styled/StyledForm';

// // --- Elements, Pages, Components --- //
// import AddAdministrator from './AddAdministrator';
// import UpdateUser from './UpdateUser';
// import DeleteUser from './DeleteUser';

// import Card from '../../elements/Card/Card';

// // --- Styled Components --- //

// const SectionOne = Styled.div`
//     margin: ${lg} 0;
//     display: flex;
//     justify-content: space-between;
// `;
// // --- Batas --- //

// const DataUsers = (props) => {
//     const dispatch = useDispatch();
//     const admin = useSelector((state) => state.user.userAdministrator);
//     console.log(admin, 'ini data users admin');
//     // --- useEffect --- Get Data users ---//
//     useEffect(() => {
//         dispatch(fetchGetUsersAdministrator());
//     }, [dispatch]);

//     // --- For Multiple Delete --- //
//     const [form, setForm] = useState({
//         id: [],
//     });

//     // --- handleCheckboxChange --- //
//     const handleCheckboxChange = (event) => {
//         let newArray = [...form.id, event.target.id];
//         if (form.id.includes(event.target.id)) {
//             newArray = newArray.filter((item) => item !== event.target.id);
//         }
//         setForm({
//             id: newArray,
//         });
//     };

//     // --- Multiple Delete --- //
//     const handlleMultipleDelete = (event) => {
//         event.preventDefault();
//         dispatch(fetchMultipleDeleteUsers(form));
//     };
//     return (
//         <React.Fragment>
//             {/* --- section 1 --- Add New Topic and Search Topic --- */}
//             <SectionOne>
//                 <AddAdministrator />
//                 <div>
//                     <label>Search</label> <Input type="search" />
//                 </div>
//             </SectionOne>

//             {/* --- section 2 --- Table Get Data Product In Table --- */}
//             <Card isNormal>
//                 <Table>
//                     <thead>
//                         <tr>
//                             <Th>
//                                 {/* --- Logic untuk multiple delete --- */}
//                                 {form.id[0] ? (
//                                     <div onClick={handlleMultipleDelete}>
//                                         <DeleteIcon color="error" />
//                                     </div>
//                                 ) : (
//                                     <DehazeIcon />
//                                 )}
//                             </Th>
//                             <Th>Name</Th>
//                             <Th>Email</Th>
//                             <Th>Role</Th>
//                             <Th>Phone</Th>
//                             <Th>Created At</Th>
//                             <Th>Updated At</Th>
//                             <Th>Actions</Th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {admin !== null &&
//                             admin.data.map((item) => {
//                                 return (
//                                     <tr key={item._id}>
//                                         <Th>
//                                             <input
//                                                 style={{
//                                                     marginLeft: '9px',
//                                                 }}
//                                                 type="checkbox"
//                                                 id={item._id}
//                                                 value={item._id}
//                                                 onChange={handleCheckboxChange}
//                                             />
//                                         </Th>
//                                         <Th as="td" td>
//                                             {item.name}
//                                         </Th>
//                                         <Th as="td" td>
//                                             {item.email}
//                                         </Th>
//                                         <Th as="td" td>
//                                             <div
//                                                 style={{
//                                                     display: 'flex',
//                                                     flexDirection: 'row',
//                                                 }}
//                                             >
//                                                 {item.role.map((id) => {
//                                                     return (
//                                                         <p key={id._id}>
//                                                             {id.adminType}{' '}
//                                                             &nbsp;
//                                                         </p>
//                                                     );
//                                                 })}
//                                             </div>
//                                         </Th>
//                                         <Th as="td" td>
//                                             {item.phone_number}
//                                         </Th>
//                                         <Th as="td" td>
//                                             {moment(item.created_at).format(
//                                                 'MMMM Do YYYY, h:mm:ss a'
//                                             )}
//                                         </Th>
//                                         <Th as="td" td>
//                                             {moment(item.updated_at).format(
//                                                 'MMMM Do YYYY, h:mm:ss a'
//                                             )}
//                                         </Th>
//                                         <Th as="td" td>
//                                             <div
//                                                 style={{
//                                                     display: 'flex',
//                                                     flexDirection: 'row',
//                                                 }}
//                                             >
//                                                 <UpdateUser id={item._id} />
//                                                 <DeleteUser id={item._id} />
//                                             </div>
//                                         </Th>
//                                     </tr>
//                                 );
//                             })}
//                     </tbody>
//                 </Table>
//             </Card>
//         </React.Fragment>
//     );
// };

// export default DataUsers;

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
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';

import DescriptionIcon from '@material-ui/icons/Description';
// --- Elements, Pages, Components --- //
import {
    fetchGetUsersAdministrator,
    fetchMultipleDeleteUsers,
} from '../../store/actions';

import AddAdministrator from './AddAdministrator';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';
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

const DataTopic = (props) => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.userAdministrator);
    console.log(users, 'ini data users admin');
    // --- useEffect --- Get Data users ---//
    useEffect(() => {
        dispatch(fetchGetUsersAdministrator());
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
    });

    const [searching, setSearching] = useState({
        search: '',
    });
    console.log(searching, 'pen tau');

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
        dispatch(fetchMultipleDeleteUsers(form));
    };

    // --- Multiple Clone --- //
    // const handlleMultipleClone = (event) => {
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
                        {/* <DropdownItem onClick={handlleMultipleClone}>
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
                <AddAdministrator />

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
                    {users === null ? (
                        <React.Fragment>
                            <Table>
                                <thead>
                                    <tr>
                                        <Th>
                                            <DehazeIcon />
                                        </Th>
                                        <Th>Name</Th>
                                        <Th>Email</Th>
                                        <Th>Role</Th>
                                        <Th>Phone</Th>
                                        <Th>Created At</Th>
                                        <Th>Updated At</Th>
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
                    ) : users.data.length >= 1 ? (
                        <Table>
                            <thead>
                                <tr>
                                    <Th>
                                        {/* ---Belum di kasih logic --- */}
                                        <Input checkbox type="checkbox" />
                                    </Th>
                                    <Th>Name</Th>
                                    <Th>Email</Th>
                                    <Th>Role</Th>
                                    <Th>Phone</Th>
                                    <Th>Created At</Th>
                                    <Th>Updated At</Th>
                                    <Th style={{ width: '100px' }}>Actions</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row)  */}
                                {users.data
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
                                                    {item.name}
                                                </Th>
                                                <Th as="td" td>
                                                    {item.email}
                                                </Th>
                                                <Th as="td" td>
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection:
                                                                'row',
                                                        }}
                                                    >
                                                        {item.role.map((id) => {
                                                            return (
                                                                <p key={id._id}>
                                                                    {
                                                                        id.adminType
                                                                    }{' '}
                                                                    &nbsp;
                                                                </p>
                                                            );
                                                        })}
                                                    </div>
                                                </Th>
                                                <Th as="td" td>
                                                    {item.phone_number}
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
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection:
                                                                'row',
                                                        }}
                                                    >
                                                        <UpdateUser
                                                            id={item._id}
                                                        />

                                                        <DeleteUser
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
                                            users !== null && users.data.length
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
                                You have no users in this date range.
                            </div>
                        </React.Fragment>
                    )}
                </Overflow>
            </Card>
        </React.Fragment>
    );
};

export default DataTopic;

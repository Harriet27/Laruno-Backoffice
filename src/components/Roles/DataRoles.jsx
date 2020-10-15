// import React, { useEffect, useState } from 'react';
// import { Table } from 'reactstrap';
// import Styled from 'styled-components';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchGetRoles, fetchMultipleDeleteRoles } from '../../store/actions';
// import DeleteIcon from '@material-ui/icons/Delete';
// import DehazeIcon from '@material-ui/icons/Dehaze';
// import moment from 'moment';
// import { Input, Th, lg } from '../../elements/Styled/StyledForm';

// // --- Elements, Pages, Components --- //
// import AddRoles from './AddRoles';

// import Card from '../../elements/Card/Card';
// import DeleteRoles from './DeleteRoles';

// // --- Styled Components --- //

// const SectionOne = Styled.div`
//     margin: ${lg} 0;
//     display: flex;
//     justify-content: space-between;
// `;
// // --- Batas --- //

// const DataRoles = (props) => {
//     const dispatch = useDispatch();
//     const roles = useSelector((state) => state.roles.getRoles);
//     console.log(roles, 'KELUARKAN ISINYA');

//     // --- useEffect --- Get Data topic ---//
//     useEffect(() => {
//         dispatch(fetchGetRoles());
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
//         dispatch(fetchMultipleDeleteRoles(form));
//     };
//     return (
//         <React.Fragment>
//             {/* --- section 1 --- Add New Topic and Search Topic --- */}
//             <SectionOne>
//                 <AddRoles />
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
//                             <Th>Admin Type</Th>
//                             <Th>Read Write</Th>
//                             <Th>Created At</Th>
//                             <Th>Updated At</Th>
//                             <Th>Actions</Th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {roles !== null &&
//                             roles.data.map((item) => {
//                                 return (
//                                     <tr key={item._id}>
//                                         <Th>
//                                             <Input
//                                                 checkbox
//                                                 type="checkbox"
//                                                 id={item._id}
//                                                 value={item._id}
//                                                 onChange={handleCheckboxChange}
//                                             />
//                                         </Th>
//                                         <Th as="td" td>
//                                             {item.adminType}
//                                         </Th>
//                                         <Th as="td" td>
//                                             {item.readWrite === false ? (
//                                                 <p>False</p>
//                                             ) : (
//                                                 <p>True</p>
//                                             )}
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
//                                                 {/* <UpdateTopic id={item._id} /> */}
//                                                 <DeleteRoles id={item._id} />
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

// export default DataRoles;

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
    fetchGetRoles,
    fetchMultipleDeleteRoles,
    // fetchMultipleDeleteTopics,
    // fetchMultipleClone,
    // fetchFindProduct,
    // fetchPostTopic,
} from '../../store/actions';
import DeleteRoles from './DeleteRoles';

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

const DataRoles = (props) => {
    const dispatch = useDispatch();
    const roles = useSelector((state) => state.roles.getRoles);
    console.log(roles);

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
        dispatch(fetchGetRoles());
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
        dispatch(fetchMultipleDeleteRoles(form));
    };

    // --- handle Change --- //
    const handleChange = (event) => {
        setSearching({ ...searching, [event.target.name]: event.target.value });
    };

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
                    {roles === null ? (
                        <React.Fragment>
                            <Table>
                                <thead>
                                    <tr>
                                        <Th>
                                            <DehazeIcon />
                                        </Th>
                                        <Th>Admin Type</Th>
                                        <Th>Read Write</Th>
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
                                Loading ...
                            </div>
                        </React.Fragment>
                    ) : roles.data.length >= 1 ? (
                        <Table>
                            <thead>
                                <tr>
                                    <Th>
                                        <Input checkbox type="checkbox" />
                                    </Th>
                                    <Th>Admin Type</Th>
                                    <Th>Read Write</Th>
                                    <Th>Created At</Th>
                                    <Th>Update At</Th>
                                    <Th style={{ width: '100px' }}>Actions</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles.data
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
                                                    {item.adminType}
                                                </Th>
                                                <Th as="td" td>
                                                    {item.readWrite ===
                                                    false ? (
                                                        <p>False</p>
                                                    ) : (
                                                        <p>True</p>
                                                    )}
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
                                                        <DeleteRoles
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
                                            roles !== null && roles.data.length
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
                                You have no topic in this date range.
                            </div>
                        </React.Fragment>
                    )}
                </Overflow>
            </Card>
        </React.Fragment>
    );
};

export default DataRoles;

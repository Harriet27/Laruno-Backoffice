// import React, { useState, useEffect } from 'react';
// import { withStyles, makeStyles } from '@material-ui/core/styles';
// import {
//     Paper,
//     Table,
//     TableBody,
//     TableHead,
//     TableCell,
//     TableContainer,
//     TablePagination,
//     TableRow,
//     Box,
//     Avatar,
//     TextField,
// } from '@material-ui/core';

// import { Autocomplete } from '@material-ui/lab';
// import { Pageview } from '@material-ui/icons';

// import AlertDelete from '../AlertDelete/AlertDelete';

// const StyledTableCell = withStyles((theme) => ({
//     head: {
//         backgroundColor: theme.palette.info.dark,
//         color: theme.palette.common.white,
//     },
//     body: {
//         fontSize: 14,
//     },
// }))(TableCell);

// const useStyles = makeStyles({
//     root: {
//         width: '100%',
//     },
//     container: {
//         maxHeight: 440,
//     },
// });

// export default function DataProductTest(props) {
//     const classes = useStyles();
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//     const [employeeData, setEmployeeData] = useState(null);
//     const [input, setInput] = useState('');
//     const urlDelete = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/users`;
//     const url = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/users/getAllUserAdminPage`;

//     const columns = [
//         { id: 'id', label: 'ID', minWidth: 170 },
//         { id: 'name', label: 'Name', minWidth: 100 },

//         {
//             id: 'email',
//             label: 'Email',
//             minWidth: 170,
//             align: 'right',
//         },
//         {
//             id: 'options',
//             label: 'Options',
//             minWidth: 170,
//             align: 'right',
//         },
//     ];

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(+event.target.value);
//         setPage(0);
//     };

//     const getFilteredUser = () => {
//         const urlFilter = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/users/search/?user=${input}`;
//         const token = JSON.parse(localStorage.getItem('user')).token;
//         const options = {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 authorization: `Bearer ${token}`,
//             },
//         };

//         fetch(urlFilter, options)
//             .then((response) => response.json())
//             .then((results) => {
//                 setEmployeeData(results);
//             });
//     };

//     const getAllUsers = () => {
//         const token = JSON.parse(localStorage.getItem('user')).token;
//         const options = {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 authorization: `Bearer ${token}`,
//             },
//         };

//         fetch(url, options)
//             .then((response) => response.json())
//             .then((results) => {
//                 setEmployeeData(results.result);
//             });
//     };

//     useEffect(() => {
//         if (input !== '') {
//             getFilteredUser();
//         } else {
//             getAllUsers();
//         }
//         // eslint-disable-next-line
//     }, [input]);

//     const handleChange = (event) => {
//         setInput(event.target.value);
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//     };

//     return (
//         <Paper className={classes.root}>
//             {employeeData !== null && (
//                 <Box
//                     component="div"
//                     style={{
//                         display: 'flex',
//                         flexWrap: 'wrap',
//                         flexDirection: 'row',
//                         justifyContent: 'center',
//                     }}
//                 >
//                     <Box component="div" style={{ marginTop: '20px' }}>
//                         <Avatar style={{ background: '#e7305b' }}>
//                             <Pageview />
//                         </Avatar>
//                     </Box>
//                     <Box component="div" style={{ margin: '1em' }}>
//                         <form onSubmit={handleSubmit}>
//                             <Autocomplete
//                                 id="combo-box-demo"
//                                 options={employeeData !== null && employeeData}
//                                 getOptionLabel={(option) => option.name}
//                                 style={{ width: 300 }}
//                                 renderInput={(params) => (
//                                     <TextField
//                                         {...params}
//                                         label="Search Employee Name"
//                                         variant="outlined"
//                                         onSelect={handleChange}
//                                         value={input}
//                                     />
//                                 )}
//                             />
//                         </form>
//                     </Box>
//                 </Box>
//             )}
//             <TableContainer className={classes.container}>
//                 <Table stickyHeader aria-label="sticky table">
//                     <TableHead>
//                         <TableRow>
//                             {columns.map((column) => (
//                                 <StyledTableCell
//                                     key={column.id}
//                                     style={{ minWidth: '170' }}
//                                 >
//                                     {column.label}
//                                 </StyledTableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {employeeData !== null &&
//                             employeeData
//                                 .slice(
//                                     page * rowsPerPage,
//                                     page * rowsPerPage + rowsPerPage
//                                 )
//                                 .map((employee) => {
//                                     return (
//                                         <TableRow
//                                             hover
//                                             role="checkbox"
//                                             tabIndex={-1}
//                                         >
//                                             <TableCell>
//                                                 {employee._id}
//                                             </TableCell>
//                                             <TableCell>
//                                                 {employee.name}
//                                             </TableCell>
//                                             <TableCell>
//                                                 {employee.email}
//                                             </TableCell>
//                                             <AlertDelete
//                                                 id={employee._id}
//                                                 url={urlDelete}
//                                             />
//                                         </TableRow>
//                                     );
//                                 })}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <TablePagination
//                 rowsPerPageOptions={[10, 25, 100]}
//                 component="div"
//                 count={employeeData !== null && employeeData.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onChangePage={handleChangePage}
//                 onChangeRowsPerPage={handleChangeRowsPerPage}
//             />
//         </Paper>
//     );
// }

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? (
                    <LastPageIcon />
                ) : (
                    <FirstPageIcon />
                )}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? (
                    <FirstPageIcon />
                ) : (
                    <LastPageIcon />
                )}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
    return { name, calories, fat };
}

const rows = [
    createData('Cupcake', 305, 3.7),
    createData('Donut', 452, 25.0),
    createData('Eclair', 262, 16.0),
    createData('Frozen yoghurt', 159, 6.0),
    createData('Gingerbread', 356, 16.0),
    createData('Honeycomb', 408, 3.2),
    createData('Ice cream sandwich', 237, 9.0),
    createData('Jelly Bean', 375, 0.0),
    createData('KitKat', 518, 26.0),
    createData('Lollipop', 392, 0.2),
    createData('Marshmallow', 318, 0),
    createData('Nougat', 360, 19.0),
    createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});

export default function CustomPaginationActionsTable() {
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table
                className={classes.table}
                aria-label="custom pagination table"
            >
                <TableBody>
                    {(rowsPerPage > 0
                        ? rows.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                          )
                        : rows
                    ).map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {row.calories}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {row.fat}
                            </TableCell>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[
                                5,
                                10,
                                25,
                                { label: 'All', value: -1 },
                            ]}
                            colSpan={3}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

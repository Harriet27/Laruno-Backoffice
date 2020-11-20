import React, { useEffect, useState } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import DehazeIcon from '@material-ui/icons/Dehaze';
import moment from 'moment';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
// --- Elements, Pages, Components --- //
import { fetchGetContents } from '../../store/actions';
import Card from '../../elements/Card/Card';
import {
  Input,
  Th,
  Overflow,
  ButtonStyled,
  ButtonActions,
} from '../../elements/Styled/StyledForm';
import { ButtonLink } from '../../elements/Styled/StyledTabs';
const DataContents = (props) => {
  const dispatch = useDispatch();
  const contents = useSelector((state) => state.contents.getContents);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const [form, setForm] = useState({
    id: [],
    allChecked: false,
  });
  const [searching, setSearching] = useState({
    search: '',
  });

  // --- useEffect --- Get Data Contents ---//
  useEffect(() => {
    dispatch(fetchGetContents());
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

  // --- handle Change --- //
  const handleChange = (event) => {
    setSearching({ ...searching, [event.target.name]: event.target.value });
  };

  return (
    <React.Fragment>
      {/* --- section 1 --- Button Action link to Add Product ---*/}
      {form.id[0] ? (
        <Dropdown size="sm" isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle style={{ backgroundColor: '#0098DA' }} caret>
            Actions
          </DropdownToggle>
          <DropdownMenu></DropdownMenu>
        </Dropdown>
      ) : (
        <Dropdown size="sm" isOpen={dropdownOpen} toggle={toggle}>
          {' '}
          <DropdownToggle style={{ backgroundColor: '#0098DA' }} caret disabled>
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
        <Link to="add-contents">
          <ButtonLink>
            {' '}
            <div style={{ width: '80px', textAlign: 'center' }}>+ Contents</div>
          </ButtonLink>
        </Link>

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
          {contents === null ? (
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
                <CircularProgress />
              </div>
            </React.Fragment>
          ) : contents.data.length >= 1 ? (
            <Table striped>
              <thead>
                <tr>
                  <Th>
                    <Input checkbox type="checkbox" />
                  </Th>
                  <Th>Name</Th>
                  <Th>Product</Th>
                  <Th>Topic</Th>
                  <Th>Created At</Th>
                  <Th style={{ width: '100px' }}>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {contents.data
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
                          {item.name}
                        </Th>
                        <Th as="td" td>
                          {item.product.map((items) => {
                            return <span key={items._id}>{items.name}</span>;
                          })}
                        </Th>
                        <Th as="td" td>
                          {item.topic.map((items) => {
                            return (
                              <span
                                key={items._id}
                                style={{
                                  marginRight: '5px',
                                }}
                              >
                                {items.name}
                              </span>
                            );
                          })}
                        </Th>
                        <Th as="td" td>
                          {moment(item.created_at).format(
                            'MMMM Do YYYY, h:mm:ss a'
                          )}
                        </Th>

                        <Th as="td" td>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                            }}
                          >
                            <Link to={`update-contents/${item._id}`}>
                              <ButtonLink>
                                <div
                                  style={{ width: '80px', textAlign: 'center' }}
                                >
                                  update
                                </div>
                              </ButtonLink>
                            </Link>
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
                    count={contents !== null && contents.data.length}
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
                    <Th>Name</Th>
                    <Th>Product</Th>
                    <Th>Topic</Th>
                    <Th>Created At</Th>

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
                You have no contents in this date range.
              </div>
            </React.Fragment>
          )}
        </Overflow>
      </Card>
    </React.Fragment>
  );
};

export default DataContents;

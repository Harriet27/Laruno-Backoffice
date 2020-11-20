import React, { useEffect, useState } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Table } from 'reactstrap';
import Card from '../../elements/Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { Input, Th, Overflow } from '../../elements/Styled/StyledForm';
import moment from 'moment';

// --- Elements, Pages, Components --- //
import { fetchGetTopic, fetchMultipleDeleteTopics } from '../../store/actions';
import AddNewTopic from './AddNewTopic';
import UpdateTopic from './UpdateTopic';
import DeleteTopic from './DeleteTopic';
import MultipleDelete from '../../elements/Alert/MultipleDelete';
import { CircularProgress } from '@material-ui/core';
import TotalDataTopic from './TotalDataTopic';
// --- Styled Components --- //

const DataTopic = (props) => {
  const dispatch = useDispatch();
  const topic = useSelector((state) => state.topic.getTopic);
  console.log({ topic });
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
    allChecked: false,
  });

  const [searching, setSearching] = useState({
    search: '',
  });

  // --- useEffect --- Get Data Topic ---//
  useEffect(() => {
    dispatch(fetchGetTopic());
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
    dispatch(fetchMultipleDeleteTopics(form));
  };

  // --- handle Change --- //
  const handleChange = (event) => {
    setSearching({ ...searching, [event.target.name]: event.target.value });
  };
  // Random Data
  function getRandomInt(max) {
    return Math.floor(Math.random() * 125);
  }

  return (
    <>
      <>
        <TotalDataTopic topic={topic} />
      </>
      <React.Fragment>
        {form.id[0] ? (
          <Dropdown size="sm" isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle style={{ backgroundColor: '#0098DA' }} caret>
              Actions
            </DropdownToggle>
            <DropdownMenu>
              <MultipleDelete onSubmit={handleMultipleDelete} />
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

        <div style={Styles.FlexBetween}>
          <AddNewTopic />

          <div>
            <label>Search</label>{' '}
            <Input
              type="search"
              name="search"
              value={searching.search}
              onChange={handleChange}
            />
          </div>
        </div>

        <Card isNormal>
          <Overflow>
            {topic === null ? (
              <React.Fragment>
                <Table>
                  <thead>
                    <tr>
                      <Th>
                        <DehazeIcon />
                      </Th>
                      <Th>Icon</Th>
                      <Th>Detail</Th>
                      <Th>useFor</Th>
                      <Th>Visit</Th>
                      <Th style={{ width: '100px' }}>Actions</Th>
                    </tr>
                  </thead>
                </Table>
                <div style={Styles.IsLoading}>
                  <CircularProgress />
                </div>
              </React.Fragment>
            ) : topic.data.length > 0 ? (
              <Table striped>
                <thead>
                  <tr>
                    <Th>
                      <Input checkbox type="checkbox" />
                    </Th>
                    <Th>Icon</Th>
                    <Th>Detail</Th>
                    <Th>UseFor</Th>
                    <Th>Visit</Th>
                    <Th style={{ width: '100px' }}>Actions</Th>
                  </tr>
                </thead>
                <tbody>
                  {topic.data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, index) => {
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
                            <>
                              <div style={{ width: '75px' }}>
                                <img
                                  width="100%"
                                  src={item.icon}
                                  alt={item.name}
                                />
                              </div>
                            </>
                          </Th>
                          <Th as="td" td>
                            <div style={Styles.FlexColumn}>
                              <div style={Styles.Name}> {item.name}</div>
                              {/* <div> {item.slug}</div> */}
                              <div>
                                {moment(item.created_at).format('MM-DD-YYYY, ')}
                              </div>
                            </div>
                          </Th>
                          <Th as="td" td>
                            <div style={Styles.FlexColumn}>
                              <div>Blog: {getRandomInt(index)} kali</div>
                              <div>Fulfillment: {getRandomInt(index)} kali</div>
                            </div>
                          </Th>
                          <Th as="td" td>
                            <div style={Styles.FlexColumn}>
                              <div>
                                Today : {getRandomInt(index)} Pengunjung
                              </div>
                              <div>
                                Yesterday: {getRandomInt(index)} Pengunjung
                              </div>
                              <div>
                                last 7 day: {getRandomInt(index)} Pengunjung
                              </div>
                            </div>
                          </Th>

                          <Th as="td" td>
                            <div style={Styles.FlexRow}>
                              <UpdateTopic id={item._id} topic={topic} />
                              <DeleteTopic id={item._id} />
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
                      count={topic !== null && topic.data.length}
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
                      <Th>Icon</Th>
                      <Th>Detail</Th>
                      <Th>UseFor</Th>
                      <Th>Visit</Th>
                      <Th style={{ width: '100px' }}>Actions</Th>
                    </tr>
                  </thead>
                </Table>
                <div style={Styles.IsLoading}>
                  You have no topic in this date range.
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
  FlexBetween: {
    margin: '20px 0',
    display: 'flex',
    justifyContent: 'space-between',
  },
  FlexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  FlexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  VisitStyles: {},
  Name: { color: '#0098da', fontWeight: '700' },
  IsLoading: { textAlign: 'center', padding: '100px' },
};
export default DataTopic;

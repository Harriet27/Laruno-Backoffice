import React, { useEffect, useState } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Table } from 'reactstrap';
import Card from '../../elements/Card/Card';
import { useDispatch, useSelector } from 'react-redux';
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
  const [input, setInput] = useState('');
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleInput = (event) => {
    setInput(event.target.value);
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

  const topicFilter =
    topic !== null &&
    topic.data.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });

  const TableHeading = () => {
    return (
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
    );
  };

  const TableBody = (item, index) => {
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
              <img width="100%" src={item.icon} alt={item.name} />
            </div>
          </>
        </Th>
        <Th as="td" td>
          <div style={Styles.FlexColumn}>
            <div style={Styles.Name}> {item.name}</div>
            <div>{moment(item.created_at).format('MM-DD-YYYY, ')}</div>
          </div>
        </Th>
        <Th as="td" td>
          <div style={Styles.FlexColumn}>
            <div>Blog:{index} kali</div>
            <div>Fulfillment{index} kali</div>
          </div>
        </Th>
        <Th as="td" td>
          <div style={Styles.FlexColumn}>
            <div>Today : {index} Pengunjung</div>
            <div>Yesterday: {index} Pengunjung</div>
            <div>last 7 day: {index}Pengunjung</div>
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
  };

  const TableFooter = (length = 1) => {
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
          {topicFilter
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => {
              return TableBody(item, index);
            })}
        </tbody>
        <tfoot>{TableFooter(topicFilter.length)}</tfoot>
      </Table>
    );
  };

  console.log({ input, topicFilter }, 'Input, TopicFilter');

  // # --- # Return Function # --- # //
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
            <Input
              value={input}
              type="search"
              name="search"
              onChange={handleInput}
              placeholder="Search.."
            />
          </div>
        </div>

        <Card isNormal>
          <Overflow>
            {topic === null ? (
              <React.Fragment>
                <Table>{TableHeading()}</Table>
                <div style={Styles.IsLoading}>
                  <CircularProgress />
                </div>
              </React.Fragment>
            ) : topicFilter.length === 0 && topic.data.length > 0 ? (
              <Table striped>
                {TableHeading()}
                <tbody>
                  {topic.data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, index) => {
                      return TableBody(item, index);
                    })}
                </tbody>
                <tfoot>
                  {TableFooter(topic !== null && topic.data.length)}
                </tfoot>
              </Table>
            ) : topicFilter.length > 0 ? (
              SearchBar()
            ) : (
              <>
                <Table>{TableHeading()}</Table>
                <div style={Styles.NoData}>
                  You have no Topic in this date range.
                </div>
              </>
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
  NoData: {
    textAlign: 'center',
    padding: '100px',
  },
};
export default DataTopic;

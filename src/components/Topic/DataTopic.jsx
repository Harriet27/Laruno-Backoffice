import React, { useEffect, useState } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Table } from 'reactstrap';
import Card from '../../elements/Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Th, Overflow } from '../../elements/Styled/StyledForm';
import moment from 'moment';

// --- Elements, Pages, Components --- //
import {
  fetchGetListTopic,
  fetchMultipleDeleteTopics,
  fetchGetContents,
  fetchGetProduct,
} from '../../store/actions';
import AddNewTopic from './AddNewTopic';
import UpdateTopic from './UpdateTopic';
import DeleteTopic from './DeleteTopic';
import MultipleDelete from '../../elements/Alert/MultipleDelete';
import { CircularProgress } from '@material-ui/core';
import TotalDataTopic from './TotalDataTopic';
import MultipleActions from '../../elements/MultipleActions/MultipleActions';
// --- Styled Components --- //

const DataTopic = (props) => {
  const dispatch = useDispatch();
  const topic = useSelector((state) => state.topic.getListTopic);
  console.log({ topic }, 'topic');
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
    dispatch(fetchGetListTopic());
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
      return item.topic.name.toLowerCase().includes(input.toLowerCase());
    });

  const TableHeading = () => {
    return (
      <thead>
        <tr>
          <Th>
            <Input isCheckbox type="checkbox" />
          </Th>
          <Th>Icon</Th>
          <Th style={{ width: '15%' }}>Detail</Th>
          <Th style={{ width: '15%' }}>Use For</Th>
          <Th>Visit</Th>
          <Th style={{ width: '10%' }}>Actions</Th>
        </tr>
      </thead>
    );
  };

  const TableBody = (item, index) => {
    return (
      <tr key={item.topic._id}>
        <Th>
          <Input
            isCheckbox
            type="checkbox"
            id={item.topic._id}
            value={item.topic._id}
            onChange={handleCheckboxChange}
          />
        </Th>

        <Th as="td" td>
          <>
            <div style={{ width: '75px' }}>
              <img width="100%" src={item.topic.icon} alt={item.topic.name} />
            </div>
          </>
        </Th>
        <Th as="td" td>
          <div style={Styles.FlexColumn}>
            <div style={Styles.Name}> {item.topic.name}</div>
            <div>{moment(item.topic.created_at).format('DD-MM-YYYY')}</div>
          </div>
        </Th>
        <Th as="td" td>
          <div style={Styles.FlexColumn}>
            <div style={Styles.isBlog}>Blog: {item.count.blog}</div>
            <div style={Styles.isFulfillment}>
              Fulfillment:{item.count.fulfillment}
            </div>
            <div style={Styles.isProduct}>product: {item.count.product}</div>
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
            <UpdateTopic id={item.topic._id} topic={topic} />
            <DeleteTopic id={item.topic._id} />
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

  // # --- # Return Function # --- # //
  const data = {
    topic,
  };
  return (
    <>
      <>
        <TotalDataTopic data={data} />
      </>
      <React.Fragment>
        <MultipleActions
          isLogic={form.id[0]}
          // handleClone={handleMultipleClone}
          handleDelete={handleMultipleDelete}
        />

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
  isBlog: {
    background: '#cfd3ce',
    color: '#92817a',
    padding: '.1em .5em',
    borderRadius: '30px',
    borderBottom: '1px solid rgba(0,0,0,.05)',
    textAlign: 'center',
    fontSize: '12px',
    maxWidth: '100%',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  isFulfillment: {
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
  isProduct: {
    background: '#e8e8e8',
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
export default DataTopic;

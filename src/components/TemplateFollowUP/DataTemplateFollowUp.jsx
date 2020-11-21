import React, { useEffect, useState } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Table } from 'reactstrap';
import Card from '../../elements/Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { Input, Th, Overflow } from '../../elements/Styled/StyledForm';
import moment from 'moment';
import AddTemplateFollowUp from './AddTemplateFollowUp';
// --- Elements, Pages, Components --- //
import { fetchGetFollowUp } from '../../store/actions';
import { CircularProgress, TableFooter } from '@material-ui/core';
import ParentsLayoutFollowUp from '../FollowUpOrderTemplate/ParentsLayoutFollowUp';

// --- Styled Components --- //

export default function DataTemplateFollowUp(props) {
  const dispatch = useDispatch();
  const followup = useSelector((state) => state.followup.getFollowUp);
  console.log(followup, 'isi dari follow up');
  // --- PAGINATION --- //
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [input, setInput] = useState('');
  const handleInput = (event) => {
    setInput(event.target.value);
  };
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

  useEffect(() => {
    dispatch(fetchGetFollowUp());
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

  const followupFilter =
    followup !== null &&
    followup.data.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });

  const TableHeading = () => {
    return (
      <thead>
        <tr>
          <Th>
            <DehazeIcon />
          </Th>
          <Th>Name</Th>
          <Th>Template</Th>
          <Th>Type</Th>
          <Th>Admin By</Th>
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
          {item.name === 'FollowUp'
            ? 'Follow Up 1'
            : item.name === 'FollowUp_1'
            ? 'Follow Up 2'
            : item.name === 'FollowUp_2'
            ? 'Follow Up 3'
            : item.name === 'FollowUp_3'
            ? 'Follow Up 4'
            : item.name === 'FollowUp_4'
            ? 'Follow Up 5'
            : item.name}
        </Th>
        <Th as="td" td>
          {item.template}
        </Th>
        <Th as="td" td>
          {item.type}
        </Th>
        <Th as="td" td>
          {/* {item.by.name} */} -
        </Th>
        <Th as="td" td>
          <div style={Styles.FlexRow}></div>
        </Th>
      </tr>
    );
  };

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
          {followupFilter
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => {
              return TableBody(item, index);
            })}
        </tbody>
        <tfoot>{TableFooter(followupFilter.length)}</tfoot>
      </Table>
    );
  };
  return (
    <section style={{ margin: '50px' }}>
      {form.id[0] ? (
        <Dropdown size="sm" isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle style={{ backgroundColor: '#0098DA' }} caret>
            Actions
          </DropdownToggle>
          <DropdownMenu></DropdownMenu>
        </Dropdown>
      ) : (
        <Dropdown size="sm" isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle style={{ backgroundColor: '#0098DA' }} caret disabled>
            Actions
          </DropdownToggle>
        </Dropdown>
      )}

      <div style={Styles.FlexBetween}>
        <ParentsLayoutFollowUp />

        <div>
          <label>Search</label>
          <Input
            type="search"
            name="search"
            value={input}
            onChange={handleInput}
          />
        </div>
      </div>

      <Card isNormal>
        <Overflow>
          {followup === null ? (
            <React.Fragment>
              <Table>{TableHeading()}</Table>
              <div style={Styles.IsLoading}>
                <CircularProgress />
              </div>
            </React.Fragment>
          ) : followupFilter.length === 0 && followup.data.length > 0 ? (
            <Table striped>
              {TableHeading()}
              <tbody>
                {followup.data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => {
                    return TableBody(item, index);
                  })}
              </tbody>
              <tfoot>
                {TableFooter(followup !== null && followup.data.length)}
              </tfoot>
            </Table>
          ) : followupFilter.length > 0 ? (
            SearchBar()
          ) : (
            <React.Fragment>
              <Table>{TableHeading()}</Table>
              <div style={Styles.IsLoading}>
                You have no followup in this date range.
              </div>
            </React.Fragment>
          )}
        </Overflow>
      </Card>
    </section>
  );
}

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
  IsLoading: { textAlign: 'center', padding: '100px' },
};

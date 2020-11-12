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
import { CircularProgress } from '@material-ui/core';

// --- Styled Components --- //

export default function DataTemplateFollowUp(props) {
  const dispatch = useDispatch();
  const followup = useSelector((state) => state.followup.getFollowUp);
  console.log(followup, 'isi dari follow up');
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

  // --- useEffect --- Get Data Followup ---//
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
          {' '}
          <DropdownToggle style={{ backgroundColor: '#0098DA' }} caret disabled>
            Actions
          </DropdownToggle>
        </Dropdown>
      )}

      <div style={Styles.FlexBetween}>
        {/* <AddNewFollowup /> */}
        <AddTemplateFollowUp />
        <div>
          <label>Search</label> <Input type="search" name="search" />
        </div>
        {/* <input type="button" onClick={handleSearch} value="KLIK" /> */}
      </div>

      {/* --- section 2 --- Get Data Product --- */}
      <Card isNormal>
        {/* --- untuk hapus melalui button --- */}
        <Overflow>
          {followup === null ? (
            <React.Fragment>
              <Table>
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
              </Table>
              <div style={Styles.IsLoading}>
                <CircularProgress />
              </div>
            </React.Fragment>
          ) : followup.data.length >= 1 ? (
            <Table>
              <thead>
                <tr>
                  <Th>
                    <Input checkbox type="checkbox" />
                  </Th>
                  <Th>Name</Th>
                  <Th>Template</Th>
                  <Th>Type</Th>
                  <Th>Admin By</Th>
                  <Th style={{ width: '100px' }}>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {followup.data
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
                          {item.template}
                        </Th>
                        <Th as="td" td>
                          {item.type}
                        </Th>
                        <Th as="td" td>
                          {item.by.name}
                        </Th>

                        <Th as="td" td>
                          <div style={Styles.FlexRow}></div>
                        </Th>
                      </tr>
                    );
                  })}
              </tbody>
              <tfoot>
                <tr>
                  <TablePagination
                    rowsPerPageOptions={[10, 15, 20]}
                    count={followup !== null && followup.data.length}
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
                    <Th>Slug</Th>
                    <Th>Created At</Th>
                    <Th>Update At</Th>
                    <Th style={{ width: '100px' }}>Actions</Th>
                  </tr>
                </thead>
              </Table>
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

import React, { useEffect, useState } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import { Dropdown, DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from 'reactstrap';
import { Table } from 'reactstrap';
import Card from '../../elements/Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { Input, Th, Overflow } from '../../elements/Styled/StyledForm';
import moment from 'moment';
import AddTemplateFollowUp from './AddTemplateFollowUp';
// --- Elements, Pages, Components --- //
import { fetchGetFollowUp, deleteFollowUp } from '../../store/actions';
import { CircularProgress, TableFooter } from '@material-ui/core';
import ParentsLayoutFollowUp from '../FollowUpOrderTemplate/ParentsLayoutFollowUp';
import EditFollowUp from '../FollowUpOrderTemplate/EditFollowUp';
import MultipleActions from '../../elements/MultipleActions/MultipleActions';
import Swal from 'sweetalert2';

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
            <Input isCheckbox type="checkbox" />
          </Th>
          <Th>Name</Th>
          <Th>Template</Th>
          <Th>Type</Th>
          <Th>Admin</Th>
          <Th>Actions</Th>
          <Th>ID</Th>
        </tr>
      </thead>
    );
  };

  const handleDeleteTemplate = (id) => {
    Swal.fire({
      title: `Are you sure you want to delete template id ${id}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteFollowUp(id));
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    })
  };

  const [editModal, setEditModal] = useState({
    open: false,
  });

  const toggleEditModal = (event, id) => {
    setEditModal({
      ...editModal,
      open: !editModal.open,
    });
    setSelectedIdModal(id);
    console.log('toggleEditModal',id);
  };

  const [selectedIdModal, setSelectedIdModal] = useState(0);

  const TableBody = (item, index) => {
    return (
      <tr key={item._id}>
        <Th>
          <Input
            isCheckbox
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
          -
        </Th>
        <Th as="td" td>
          <UncontrolledDropdown>
            <DropdownToggle
              caret
              size="sm"
              color="none"
              style={{
                border: '1px solid #d9dee2',
                background: 'white'
              }}
            >
              Actions
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={e => toggleEditModal(e,item._id)}>
                Edit
              </DropdownItem>
              <DropdownItem onClick={() => handleDeleteTemplate(item._id)}>
                Delete
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Th>
        <Th as="td" td>
          {item._id}
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
      <MultipleActions isLogic={form.id[0]} />

      <div style={Styles.FlexBetween}>
        <ParentsLayoutFollowUp />
        <EditFollowUp 
          isOpen={editModal.open}
          toggle={toggleEditModal}
          id={selectedIdModal}
        />

        <div>
          <Input
            type="search"
            name="search"
            value={input}
            onChange={handleInput}
            placeholder="Search.."
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
            <>
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
            </>
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

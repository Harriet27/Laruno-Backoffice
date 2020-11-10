import React, { useEffect, useState } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
} from 'reactstrap';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import DehazeIcon from '@material-ui/icons/Dehaze';

// --- Elements, Pages, Components --- //
import Card from '../../elements/Card/Card';
import { Input, Th, Overflow } from '../../elements/Styled/StyledForm';
import {
  fetchGetCoupons,
  fetchMultipleCloneCoupons,
  fetchMultipleDeleteCoupons,
} from '../../store/actions';
import AddCoupons from './AddCoupons';
import DeleteCoupons from './DeleteCoupons';
import UpdateCoupons from './UpdateCoupons';

const DataCoupons = (props) => {
  const dispatch = useDispatch();
  const coupons = useSelector((state) => state.coupons.getCoupons);

  useEffect(() => {
    dispatch(fetchGetCoupons());
    // eslint-disable-next-line
  }, [dispatch]);

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

  useEffect(() => {
    dispatch(fetchGetCoupons());
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
    dispatch(fetchMultipleDeleteCoupons(form));
  };

  // --- Multiple Clone --- //
  const handleMultipleClone = (event) => {
    event.preventDefault();
    dispatch(fetchMultipleCloneCoupons(form));
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
          <DropdownToggle style={Styles.ColorActions} caret>
            Actions
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={handleMultipleDelete}>Delete</DropdownItem>
            <DropdownItem onClick={handleMultipleClone}>Clone</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Dropdown size="sm" isOpen={dropdownOpen} toggle={toggle}>
          {' '}
          <DropdownToggle style={Styles.ColorActions} caret disabled>
            Actions
          </DropdownToggle>
        </Dropdown>
      )}

      <div style={Styles.FlexBetween}>
        <AddCoupons />

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
          {coupons === null ? (
            <React.Fragment>
              <Table>
                <thead>
                  <tr>
                    <Th>
                      <DehazeIcon />
                    </Th>
                    <Th>Name</Th>
                    <Th>Code</Th>
                    <Th>Max Discount</Th>
                    <Th>Start Coupon</Th>
                    <Th>End Coupon</Th>
                    <Th>Payment Method</Th>
                    <Th style={{ width: '10%' }}>Actions</Th>
                  </tr>
                </thead>
              </Table>
              <div style={Styles.Loading}>Loading ...</div>
            </React.Fragment>
          ) : coupons.data.length >= 1 ? (
            <Table>
              <thead>
                <tr>
                  <Th>
                    <Input checkbox type="checkbox" />
                  </Th>
                  <Th>Name</Th>
                  <Th>Code</Th>
                  <Th>Max Discount</Th>
                  <Th>Start Coupon</Th>
                  <Th>End Coupon</Th>
                  <Th>Payment Method</Th>
                  <Th style={{ width: '100px' }}>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {coupons.data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => {
                    return (
                      <tr key={item._id}>
                        <Th as="td">
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
                          {item.code}
                        </Th>
                        <Th as="td" td>
                          {item.max_discount}
                        </Th>
                        <Th as="td" td>
                          {moment(item.created_at).format(
                            'MMMM Do YYYY, h:mm:ss a'
                          )}
                        </Th>
                        <Th as="td" td>
                          {moment(item.updated_at).format(
                            'MMMM Do YYYY, h:mm:ss a'
                          )}
                        </Th>
                        <Th as="td" td>
                          {item.payment_method}
                        </Th>
                        <Th as="td" td>
                          <div style={Styles.FlexRow}>
                            <UpdateCoupons id={item._id} />
                            <DeleteCoupons id={item._id} />
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
                    count={coupons !== null && coupons.data.length}
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
              <div style={Styles.Loading}>
                You have no coupons in this date range.
              </div>
            </React.Fragment>
          )}
        </Overflow>
      </Card>
    </React.Fragment>
  );
};

const Styles = {
  FlexBetween: {
    margin: '20px 0',
    display: 'flex',
    justifyContent: 'space-between',
  },
  ColorActions: { backgroundColor: '#0098DA' },
  Loading: {
    textAlign: 'center',
    padding: '100px',
  },
  FlexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
};

export default DataCoupons;

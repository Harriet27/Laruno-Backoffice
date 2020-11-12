import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostFollowUp, fetchGetFollowUp } from '../../store/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Icon, IconSpan } from '../../elements/Styled/StyledModalPopUp';
// --- Elements, Pages, Components --- //
import Card from '../../elements/Card/Card';
import ChildFollowUp from './ChildFollowUp';

// --- Styled Components --- //
const [md, lg] = ['16px', '18px', '20px'];
const Input = Styled.input`
    width: 100%;
    padding: 10px;
    font-size: ${md};
    font-weight: 400;
    color:${(props) => (props.isButton ? 'white' : '#495057')} ;
    border-radius: 3px;
    background-color: ${(props) => (props.isButton ? '#0098DA' : '#FCFCFC')};
    border: 1px solid #ced4da;
    &:focus{
    outline: none !important;
    border:1px solid #66AFE9;
    }
`;

const WrapForm = Styled.div`
    width: 100%;
    margin-bottom: ${lg};
`;

//

const FollowUp = (props) => {
  const dispatch = useDispatch();
  const followup = useSelector((state) => state.followup.getFollowUp);
  const { className } = props;
  const [modal, setModal] = useState({
    open: false,
  });
  const [form, setForm] = useState({
    id: '',
  });

  console.log(form, 'isi form');

  useEffect(() => {
    dispatch(fetchGetFollowUp());
    // eslint-disable-next-line
  }, [dispatch]);

  const temp1 =
    followup !== null &&
    followup.data.filter(function (item = null) {
      return item.name === 'FollowUp';
    });
  const temp2 =
    followup !== null &&
    followup.data.filter(function (item = null) {
      return item.name === 'FollowUp_1';
    });
  const temp3 =
    followup !== null &&
    followup.data.filter(function (item = null) {
      return item.name === 'FollowUp_2';
    });
  const temp4 =
    followup !== null &&
    followup.data.filter(function (item = null) {
      return item.name === 'FollowUp_3';
    });
  const temp5 =
    followup !== null &&
    followup.data.filter(function (item = null) {
      return item.name === 'FollowUp_4';
    });
  const temp6 =
    followup !== null &&
    followup.data.filter(function (item = null) {
      return item.name === 'DetailOrders';
    });
  console.log({ temp1, modal, form });

  const toggle = (event) =>
    setModal({
      ...modal,
      open: !modal.open,
    });
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  return (
    <div>
      <Button color="white" style={{ padding: '0' }} size="sm" onClick={toggle}>
        Update
      </Button>
      <Modal
        isOpen={modal.open}
        toggle={toggle}
        style={{ maxWidth: '700px', width: '100%' }}
        className={className}
      >
        <ModalHeader toggle={toggle}>Template Whattsap</ModalHeader>
        {/* --- */}
        <Card style={Styles.Card}>
          <WrapForm>
            <label>Type</label>
            <Input
              as="select"
              name="id"
              id="id"
              defaultValue={form.id}
              onChange={handleChange}
            >
              <option value="" disabled hidden>
                Choose here
              </option>
              {temp1 !== false && (
                <option key={temp1[0]._id} value={temp1[0]._id}>
                  Follow Up 1
                </option>
              )}
              {temp2 !== false && (
                <option key={temp2[0]._id} value={temp2[0]._id}>
                  Follow Up 2
                </option>
              )}
              {temp3 !== false && (
                <option key={temp3[0]._id} value={temp3[0]._id}>
                  Follow Up 3
                </option>
              )}
              {temp4 !== false && (
                <option key={temp4[0]._id} value={temp4[0]._id}>
                  Follow Up 4
                </option>
              )}
              {temp5 !== false && (
                <option key={temp5[0]._id} value={temp5[0]._id}>
                  Follow Up 5
                </option>
              )}
              {temp6 !== false && (
                <option key={temp6[0]._id} value={temp6[0]._id}>
                  Detail Orders
                </option>
              )}
            </Input>
          </WrapForm>
          <>
            <ChildFollowUp id={form.id} toggle={toggle} />
          </>
        </Card>
      </Modal>
    </div>
  );
};

export default FollowUp;
const Styles = {
  Card: { fontWeight: '600', color: 'rgba(0,0,0,.6)', padding: '50px' },
};

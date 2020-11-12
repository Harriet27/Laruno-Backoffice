import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostFollowUp, fetchGetFollowUp } from '../../store/actions';

// --- Elements, Pages, Components --- //
import Card from '../../elements/Card/Card';
import ModalSmart from '../../elements/Modal/ModalSmart';
import SingleImage from '../AddProduct/SingleImage';
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

export default function ParentsLayoutFollowUp() {
  const dispatch = useDispatch();
  const followup = useSelector((state) => state.followup.getFollowUp);

  const [form, setForm] = useState({
    id: '',
  });
  // --- Fetch submit method Post --- //

  console.log(form, 'isi form');
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(fetchPostFollowUp(form));
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    dispatch(fetchGetFollowUp());
    // eslint-disable-next-line
  }, [dispatch]);

  const temp =
    followup !== null &&
    followup.data.filter(function (item = null) {
      return (
        item.name === 'FollowUp' ||
        item.name === 'FollowUp_1' ||
        item.name === 'FollowUp_2' ||
        item.name === 'FollowUp_3' ||
        item.name === 'FollowUp_4'
      );
    });
  console.log(temp, 'ini temp');
  return (
    <ModalSmart
      styleModal={{ maxWidth: '1000px' }}
      buttonLabel="Add New"
      title="Add New Follow Up"
      onClickConfirm={handleSubmit}
    >
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
            {temp !== false &&
              temp.map((item, index) => {
                return (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                );
              })}
          </Input>
        </WrapForm>
        <>
          <ChildFollowUp id={form.id} />
        </>
      </Card>
    </ModalSmart>
  );
}

const Styles = {
  Card: { fontWeight: '600', color: 'rgba(0,0,0,.6)' },
};

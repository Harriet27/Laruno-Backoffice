import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpdateFollowUp, fetchGetFollowUpByID } from '../../store/actions';

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
const Span = Styled.span`
color: #c7254e;
background-color: #f9f2f4;
`;

export default function ChildFollowUp(props) {
  const dispatch = useDispatch();
  const { id } = props;

  const note = {
    name: `{{name}}`,
    phone: `{{phone_number}}`,
    total_price: `{{total_price}}`,
    total_qty: `{{total_qty}}`,
  };
  console.log(id, 'ini id');

  // render disini
  const InputUpdate = (props) => {
    const { id, dispatch } = props;

    const follow = useSelector((state) => state.followup.getFollowUpById);
    console.log(follow, 'isi follow by id');

    useEffect(() => {
      dispatch(fetchGetFollowUpByID(id));

      // eslint-disable-next-line
    }, [dispatch]);
    const UpdateFollowUp = (props) => {
      const { id, dispatch, template } = props;
      const [form, setForm] = useState({
        name: '',
        template: template,
        type: '',
      });

      const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(fetchUpdateFollowUp(form, id));
      };

      return (
        <>
          <WrapForm>
            <label>Template</label>
            <Input
              as="textarea"
              rows="5"
              name="template"
              id="template"
              defaultValue={form.template}
              onChange={handleChange}
            />
          </WrapForm>
          <button onClick={handleSubmit}>klik</button>
        </>
      );
    };

    return (
      <>
        <UpdateFollowUp
          id={id}
          template={follow !== null && follow.data.template}
          dispatch={dispatch}
        />
      </>
    );
  };
  return (
    <div>
      <WrapForm>Note untuk membuat Template WA</WrapForm>
      <div>{note.notes}</div>
      <div>
        <div>
          <Span>{note.name}</Span> :Nama Costumer
        </div>
        <div>
          <Span>{note.phone}</Span> :Nomor telephone Costumer
        </div>
        <div>
          <Span>{note.total_price}</Span> :Nama Product
        </div>
        <div>
          <Span>{note.total_qty}</Span> :total items yang di beli
        </div>
      </div>
      <InputUpdate id={id} dispatch={dispatch} />
    </div>
  );
}

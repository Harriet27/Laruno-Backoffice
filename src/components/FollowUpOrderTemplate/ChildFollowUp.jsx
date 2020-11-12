import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpdateFollowUp, fetchGetFollowUpByID } from '../../store/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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
  const { id, toggle } = props;

  console.log(id, 'ini id');
  const note = {
    name: `{{name}}`,
    phone: `{{phone_number}}`,
    total_price: `{{total_price}}`,
    total_qty: `{{total_qty}}`,
  };
  // render disini
  const InputUpdate = (props) => {
    const { id, toggle } = props;
    const dispatch = useDispatch();
    const follow = useSelector((state) => state.followup.getFollowUpById);
    console.log(follow, 'isi follow by id');

    useEffect(() => {
      dispatch(fetchGetFollowUpByID(id));

      // eslint-disable-next-line
    }, [dispatch]);
    const UpdateFollowUp = (props) => {
      const { id, template, toggle } = props;
      const dispatch = useDispatch();
      const [form, setForm] = useState({
        template: template,
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

          <ModalFooter>
            <Button
              color="white"
              style={{ border: '1px solid gray' }}
              onClick={toggle}
            >
              Cancel
            </Button>
            {/* <Button color="primary" onClick={handleSubmit}>
              Follow Up
            </Button> */}
            <button onClick={handleSubmit}>click</button>
          </ModalFooter>
        </>
      );
    };

    return (
      <>
        <UpdateFollowUp
          id={id}
          template={follow === null ? 'Loading...' : follow.data.template}
          toggle={toggle}
        />
      </>
    );
  };
  return (
    <>
      <InputUpdate id={id} toggle={toggle} />
    </>
  );
}

import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostFollowUp, fetchGetFollowUp } from '../../store/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ButtonLink } from '../../elements/Styled/StyledTabs';
// --- Elements, Pages, Components --- //
import Card from '../../elements/Card/Card';
import ChildFollowUp from './ChildFollowUp';

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

const EditFollowUp = (props) => {
  const dispatch = useDispatch();

  const followup = useSelector((state) => state.followup.getFollowUp);

  const { className, toggle, isOpen, id } = props;

  const [form, setForm] = useState({
    id: '',
  });

  useEffect(() => {
    dispatch(fetchGetFollowUp());
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

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const note = {
    name: `{{name}}`,
    phone: `{{phone_number}}`,
    total_price: `{{total_price}}`,
    total_qty: `{{total_qty}}`,
    invoice: `{{invoice}}`,
    email: `{{email}}`,
  };

  const handleSubmit = () => {};

  // return (
  //   <div>
  //     <Modal
  //       isOpen={isOpen}
  //       toggle={toggle}
  //       style={Styles.Modal}
  //     >
  //       <ModalHeader toggle={toggle}>Edit Template for id {id}</ModalHeader>
  //       <Card style={Styles.Card}>
  //         <WrapForm>
  //           <label>Type</label>
  //           <Input
  //             as="select"
  //             name="id"
  //             id="id"
  //             defaultValue={form.id}
  //           >
  //             <option value="" disabled hidden>
  //               Choose here
  //             </option>
  //             {temp1 !== false && (
  //               <option key={temp1[0]._id} value={temp1[0]._id}>
  //                 Follow Up 1
  //               </option>
  //             )}
  //             {temp2 !== false && (
  //               <option key={temp2[0]._id} value={temp2[0]._id}>
  //                 Follow Up 2
  //               </option>
  //             )}
  //             {temp3 !== false && (
  //               <option key={temp3[0]._id} value={temp3[0]._id}>
  //                 Follow Up 3
  //               </option>
  //             )}
  //             {temp4 !== false && (
  //               <option key={temp4[0]._id} value={temp4[0]._id}>
  //                 Follow Up 4
  //               </option>
  //             )}
  //             {temp5 !== false && (
  //               <option key={temp5[0]._id} value={temp5[0]._id}>
  //                 Follow Up 5
  //               </option>
  //             )}
  //             {temp6 !== false && (
  //               <option key={temp6[0]._id} value={temp6[0]._id}>
  //                 Detail Orders
  //               </option>
  //             )}
  //           </Input>
  //         </WrapForm>
  //         <>
  //           <WrapForm>
  //             <label>Template</label>
  //             <Input
  //               as="textarea"
  //               rows="5"
  //               name="template"
  //               id="template"
  //               defaultValue={form.template}
  //               onChange={handleChange}
  //             />
  //           </WrapForm>
  //           <WrapForm>Note untuk membuat Template WA</WrapForm>

  //           <div style={{ marginBottom: '10px' }}>
  //             <div>
  //               <Span>{note.name}</Span> :Nama Costumer
  //             </div>
  //             <div>
  //               <Span>{note.phone}</Span> :Nomor telephone Costumer
  //             </div>
  //             <div>
  //               <Span>{note.total_price}</Span> :Nama Product
  //             </div>
  //             <div>
  //               <Span>{note.total_qty}</Span> :total items yang di beli
  //             </div>
  //             <div>
  //               <Span>{note.invoice}</Span> :invoice number
  //             </div>
  //             <div>
  //               <Span>{note.email}</Span> : email pembeli
  //             </div>
  //           </div>
  //           <ModalFooter>
  //             <Button
  //               color="white"
  //               style={{ border: '1px solid gray' }}
  //               onClick={toggle}
  //             >
  //               Cancel
  //             </Button>
  //             <Button color="primary" onClick={handleSubmit}>
  //               Confirm
  //             </Button>
  //           </ModalFooter>
  //         </>
  //       </Card>
  //     </Modal>
  //   </div>
  // );

  return (
    <div>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        style={Styles.Modal}
      >
        <ModalHeader toggle={toggle}>Edit Template for id {id}</ModalHeader>
        <Card style={Styles.Card}>
          <WrapForm>
            <label>Type</label>
            <input
              type="text"
              name="id"
              id="id"
              defaultValue={form.id}
            ></input>
          </WrapForm>
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

            <div style={{ marginBottom: '10px' }}>
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
              <div>
                <Span>{note.invoice}</Span> :invoice number
              </div>
              <div>
                <Span>{note.email}</Span> : email pembeli
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
              <Button color="primary" onClick={handleSubmit}>
                Confirm
              </Button>
            </ModalFooter>
          </>
        </Card>
      </Modal>
    </div>
  );
};

export default EditFollowUp;
const Styles = {
  Card: { fontWeight: '600', color: 'rgba(0,0,0,.6)', padding: '50px' },
  Modal: { maxWidth: '700px', width: '100%' },
};

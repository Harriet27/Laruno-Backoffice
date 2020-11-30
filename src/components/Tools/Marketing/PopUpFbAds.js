import React, { useState } from 'react';
import Select from 'react-select';
import Styled from 'styled-components';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SingleImage from '../../AddProduct/SingleImage';

const [md, lg] = ['16px', '18px', '20px'];

const Span = Styled.span`
    font-weight: bold;
    color: #656565;
    font-size: 18px;
`;

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

export default function PopUpFbAds(props) {
  const { topic } = props;
  console.log({ topic }, 'INI TOPIC IN POP UP');
  const [form, setForm] = useState({
    checked: false,
  });
  console.log({ form }, 'FORM');
  const toggleChecked = () => {
    return setForm({ ...form, checked: !form.checked });
  };

  const data = [{ key: 1, value: 'Loading', label: 'Loading...' }];
  const optionsTopic =
    topic === null
      ? data.map((item) => {
          return {
            item: item.key,
            value: item.value,
            label: item.label,
            isDisabled: true,
          };
        })
      : topic.data.map((item) => {
          return { key: item._id, value: item._id, label: item.name };
        });

  return (
    <div style={{ margin: '50px' }}>
      <WrapForm>
        <label>
          <Span>Name Ads</Span>
        </label>
        <Input
          type="text"
          name="name"
          id="name"
          // value={form.product}
          // onChange={handleChange}
          placeholder="Name Ads"
          required
        />
      </WrapForm>

      <WrapForm>
        <label>
          <Span>Type</Span>
        </label>
        <Input
          as="select"
          name="type"
          id="type"
          // value={form.checkout_page}
          // onChange={handleChange}
          placeholder="Checkout page"
          required
        >
          <option value="" disabled hidden>
            Choose here
          </option>
          <option value="top">Top</option>
          <option value="mid">Mid</option>
          <option value="bottom">Bottom</option>
        </Input>
      </WrapForm>

      <WrapForm>
        <label>
          <Span>Topic</Span>
        </label>
        <Select
          isMulti
          name="colors"
          // value={isTopic}
          options={optionsTopic}
          className="basic-multi-select"
          classNamePrefix="select"
          // onChange={handleSelectTopic}
          placeholder="Select topic..."
        />
      </WrapForm>

      <WrapForm>
        <div>
          <label style={{ marginRight: '20px' }}>
            <input type="checkbox" /> Blog
          </label>
          <label>
            <input type="checkbox" />
            Fulfillment
          </label>
        </div>
      </WrapForm>

      <div>
        <SingleImage
          style={{ width: '30%' }}
          id="ads_image"
          // onChange={(e) => handleChange(e, 'ads_image')}
          // isLoading={state.isLoading}
        />
      </div>
    </div>
  );
}

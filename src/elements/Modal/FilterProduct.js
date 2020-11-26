import React, { useState, useEffect } from 'react';
import { fetchGetProduct } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import ModalFilter from './ModalFilter';
import Styled from 'styled-components';

const Span = Styled.span`
    font-weight: bold;
    color: #656565;
    font-size: 18px;
`;
const Input = Styled.input`
    width: 100%;
    padding: 10px;
    font-size: 16px;
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
    width:  ${(props) => (props.isFull ? '100%' : '45%')};
    margin-bottom: 18px;
`;
export default function FilterProduct(props) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.getProduct);
  const [state, setState] = useState({
    filter: '',
    visibility: '',
  });
  useEffect(() => {
    dispatch(fetchGetProduct());
    // eslint-disable-next-line
  }, [dispatch]);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const Data = [
    {
      id: '1',
      value: 'type',
      name: 'type',
    },
    {
      id: '2',
      value: 'visibiliy',
      name: 'visibility',
    },
  ];
  const DataVisibility = [
    {
      id: '1',
      value: 'private',
      name: 'private',
    },
    {
      id: '2',
      value: 'publish',
      name: 'Publish',
    },
  ];
  return (
    <div>
      <ModalFilter buttonLabel="filter">
        <WrapForm isFull>
          <label>
            <Span>Type</Span>
          </label>
          <Input
            as="select"
            name="filter"
            id="filter"
            // value={state.filter}
            // onChange={handleChange}
          >
            <option value="" disabled hidden>
              Choose here
            </option>
            {Data.map((item) => {
              return (
                <option key={item.id} value={item.value}>
                  {item.name}
                </option>
              );
            })}
          </Input>
        </WrapForm>

        {state.filter === 'visibility' ? (
          <WrapForm isFull>
            <label>
              <Span>Visibility</Span>
            </label>
            <Input
              as="select"
              name="visibility"
              id="visibility"
              // value={state.visibility}
              // onChange={handleChange}
            >
              <option value="" disabled hidden>
                Choose here
              </option>
              {DataVisibility.map((item) => {
                return (
                  <option key={item.id} value={item.value}>
                    {item.name}
                  </option>
                );
              })}
            </Input>
          </WrapForm>
        ) : null}
      </ModalFilter>
    </div>
  );
}

import React from 'react';
import Styled from 'styled-components';

const ButtonModal = Styled.button`
    background-color:${(props) => (props.delete ? 'red' : '#0098DA')} ;
    color: white;
    width: 100%;
    padding: 5px;
    font-size: 18px;
    font-weight: 400;
    border-radius: 3px;
    border: 1px solid #ced4da;
    &:focus{
        outline: none !important;
        border:1px solid #66AFE9;
    }
`;
const Input = Styled.input`
    width: 100%;
    padding: .375rem;
    font-size: 14px;
    font-weight: 400;
    color: #495057;
    border-radius: ${(props) => (props.price ? '0' : '3px')};
    background-color: #FCFCFC;
    border:${(props) => (props.price ? '0' : '1px solid #ced4da')};
    &:focus{
    outline: none !important;
    border:1px solid #66AFE9;
    }
`;
const Span = Styled.span`
    font-weight: bold;
    color: #656565;
    font-size: 16px;
`;

const Label = Styled.label`
    
`;
const WrapsField = Styled.div`
    margin-bottom: 25px;
    width: ${(props) => (props.dividedByTwo ? '45%' : null)}
`;

export default function DynamicField(props) {
  const {
    handleAdd,
    handleChange,
    handleChangeContents,
    fields,
    handleRemove,
    handleChangeNote,
  } = props;

  return (
    <div style={Styles.FlexColumn} className="App">
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <Span>Apa yang anda pelajari</Span>
      </div>

      {/* --- Testing --- */}
      <div name="test">
        {fields.map((field, idx) => {
          return (
            <WrapsField key={`${field}-${idx}`}>
              <div style={Styles.FlexBetween}>
                <Input
                  type="text"
                  name={`one-${idx}`}
                  value={field.title}
                  placeholder="Title.."
                  onChange={(e) => handleChange(idx, e)}
                />
                <Input
                  style={{ width: '30%', marginLeft: '5px' }}
                  type="text"
                  name={`note-${idx}`}
                  value={field.note}
                  placeholder="Note.."
                  onChange={(e) => handleChangeNote(idx, e)}
                />
              </div>
              <Input
                style={{ marginTop: '5px' }}
                as="textarea"
                rows="5"
                name={`number-${idx}`}
                placeholder="Content.."
                value={field.content}
                onChange={(e) => handleChangeContents(idx, e)}
              />
              <ButtonModal
                delete
                type="button"
                onClick={() => handleRemove(idx)}
              >
                Delete
              </ButtonModal>
            </WrapsField>
          );
        })}
      </div>
      <ButtonModal
        style={{ marginBottom: '10px' }}
        type="button"
        onClick={() => handleAdd()}
      >
        + Apa yang anda pelajari
      </ButtonModal>
    </div>
  );
}

const Styles = {
  FlexColumn: { display: 'flex', flexDirection: 'column' },
  FlexBetween: { display: 'flex', justifyContent: 'space-between' },
};

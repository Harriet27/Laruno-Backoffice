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
        <div
            style={{ display: 'flex', flexDirection: 'column' }}
            className="App"
        >
            <Label>
                <Span>Learn About</Span>
            </Label>

            {/* --- Testing --- */}
            <div name="test">
                {fields.map((field, idx) => {
                    return (
                        <WrapsField key={`${field}-${idx}`}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Input
                                    type="text"
                                    name={`one-${idx}`}
                                    value={field.title}
                                    placeholder="Enter title.."
                                    onChange={(e) => handleChange(idx, e)}
                                />
                                <Input
                                    style={{ width: '30%' }}
                                    type="text"
                                    name={`note-${idx}`}
                                    value={field.note}
                                    placeholder="Enter note.."
                                    onChange={(e) => handleChangeNote(idx, e)}
                                />
                            </div>
                            <Input
                                as="textarea"
                                rows="5"
                                name={`number-${idx}`}
                                placeholder="Enter Content.."
                                value={field.content}
                                onChange={(e) => handleChangeContents(idx, e)}
                            />
                            <ButtonModal
                                delete
                                type="button"
                                onClick={() => handleRemove(idx)}
                            >
                                Delete Learn About {idx + 1}
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
                Add Learn About
            </ButtonModal>
        </div>
    );
}

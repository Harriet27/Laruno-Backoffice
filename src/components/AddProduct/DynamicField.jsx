import React from 'react';
import Styled from 'styled-components';

const ButtonModal = Styled.button`
    background-color: #0098DA;
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

// --- BATAS BAWAH --- //

export default function DynamicField(props) {
    const {
        handleAdd,
        handleChange,
        handleChangeContents,
        fields,
        handleRemove,
    } = props;

    console.log(fields, 'isi dari fields');

    return (
        <div
            style={{ display: 'flex', flexDirection: 'column' }}
            className="App"
        >
            <Label>
                <Span>Learn About</Span>
            </Label>

            <ButtonModal type="button" onClick={() => handleAdd()}>
                Add Learn About
            </ButtonModal>

            {/* --- Testing --- */}
            <div name="test">
                {fields.map((field, idx) => {
                    return (
                        <WrapsField key={`${field}-${idx}`}>
                            <label>Title</label>
                            <Input
                                type="text"
                                name={`one-${idx}`}
                                value={field.title}
                                placeholder="Enter title.."
                                onChange={(e) => handleChange(idx, e)}
                            />
                            <label>Content</label>
                            <Input
                                as="textarea"
                                name={`number-${idx}`}
                                placeholder="Enter Content.."
                                value={field.content}
                                onChange={(e) => handleChangeContents(idx, e)}
                            />
                            <button
                                type="button"
                                onClick={() => handleRemove(idx)}
                            >
                                X
                            </button>
                        </WrapsField>
                    );
                })}
            </div>
        </div>
    );
}

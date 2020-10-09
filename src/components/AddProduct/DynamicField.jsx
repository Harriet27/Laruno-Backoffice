import React from 'react';
import Styled from 'styled-components';

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
            <Label>Learn About</Label>

            <button type="button" onClick={() => handleAdd()}>
                +
            </button>

            {/* --- Testing --- */}
            <div name="test">
                {fields.map((field, idx) => {
                    return (
                        <WrapsField key={`${field}-${idx}`}>
                            <label>Title</label>
                            <Input
                                type="text"
                                name={`one-${idx}`}
                                placeholder="Enter text"
                                onChange={(e) => handleChange(idx, e)}
                            />
                            <label>Content</label>
                            <Input
                                as="textarea"
                                name={`number-${idx}`}
                                placeholder="Enter text"
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

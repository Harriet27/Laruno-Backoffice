import React, { useState } from 'react';
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

const Section = Styled.section`
    display: flex;
    padding: 50px 100px;
    width: 100%;
    line-height: 1.5;
    @media (max-width: 800px) {
        padding: 20px 40px;
          }
`;
const Label = Styled.label`
    
`;
const WrapsField = Styled.div`
    margin-bottom: 25px;
    width: ${(props) => (props.dividedByTwo ? '45%' : null)}
`;
const Span = Styled.span`
    font-weight: bold;
    color: #656565;
    font-size: 18px;
`;

const SectionOne = Styled.div`
    display: flex;
    width: 50%;
    @media (max-width: 800px) {
        width: 100%
    }
`;

const Form = Styled.form`
    padding: 50px 40px;
    @media (max-width: 800px) {
        padding: 20px;
    }
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
        <div className="App">
            <h1>Test Untuk learn about</h1>

            <button type="button" onClick={() => handleAdd()}>
                +
            </button>

            {/* --- Testing --- */}
            <div
                name="test"
                style={{ display: 'flex', justifyContent: 'center' }}
            >
                {fields.map((field, idx) => {
                    return (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '200px',
                            }}
                            key={`${field}-${idx}`}
                        >
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
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

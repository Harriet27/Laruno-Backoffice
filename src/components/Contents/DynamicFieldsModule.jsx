import Card from '../../elements/Card/Card';
import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchPostDynamicImage } from '../../store/actions';
import Styled from 'styled-components';
import SingleImage from '../AddProduct/SingleImage';
import { Span } from '../../elements/Styled/StyledTabs';
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

const ButtonModal = Styled.button`
    background-color: ${(props) => (props.delete ? 'red' : '#0098DA')};
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

const Section = Styled.section`
    display: flex;
    padding: 50px 100px;
    width: 100%;
    line-height: 1.5;
    @media (max-width: 800px) {
        padding: 20px 40px;
          }
`;

const WrapsField = Styled.div`
    margin-bottom: 25px;
    width: ${(props) => (props.dividedByTwo ? '45%' : null)}
`;

const SectionOne = Styled.div`
    // display: flex;
    width: 100%;
    @media (max-width: 800px) {
        width: 100%
    }
`;

export default function DynamicFieldsModule(props) {
    const dispatch = useDispatch();
    const { handleAdd, handleChange, fields, handleRemove } = props;

    return (
        <>
            <div
                style={{ display: 'flex', flexDirection: 'column' }}
                className="App"
            >
                <div>
                    <label>
                        <Span>Module</Span>
                    </label>
                    <ButtonModal type="button" onClick={() => handleAdd()}>
                        Add Question
                    </ButtonModal>
                </div>
                {/* --- Testing --- */}
                <div name="modules">
                    {fields.map((field, idx) => {
                        return (
                            <WrapsField key={`${field}-${idx}`}>
                                <div style={{ display: 'flex' }}>
                                    <Input
                                        width="35%"
                                        type="text"
                                        name={`module-${idx}`}
                                        placeholder="Question..."
                                        value={field.question}
                                        onChange={(e) => handleChange(idx, e)}
                                    />

                                    <ButtonModal
                                        style={{ width: '10%' }}
                                        delete
                                        type="button"
                                        onClick={() => handleRemove(idx)}
                                    >
                                        x
                                    </ButtonModal>
                                </div>
                            </WrapsField>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

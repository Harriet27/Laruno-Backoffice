import Card from '../../elements/Card/Card';
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
const Label = Styled.label`

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
const Span = Styled.span`
    font-weight: bold;
    color: #656565;
    font-size: 16px;
`;
// --- BATAS BAWAH --- //

export default function DynamicFieldSection(props) {
    const {
        handleAdd,
        handleChange,
        handleChangeContents,
        fields,
        handleRemove,
    } = props;

    console.log(fields, 'isi dari fields');

    return (
        <Section>
            <SectionOne>
                <Card isNormal style={{ width: '100%' }}>
                    <div style={{ padding: '30px 40px' }}>
                        <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                            className="App"
                        >
                            <ButtonModal
                                type="button"
                                onClick={() => handleAdd()}
                            >
                                Add Section
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
                                                placeholder="Enter title..."
                                                value={field.title}
                                                onChange={(e) =>
                                                    handleChange(idx, e)
                                                }
                                            />
                                            <label>Content</label>
                                            <Input
                                                as="textarea"
                                                name={`number-${idx}`}
                                                rows="5"
                                                value={field.content}
                                                placeholder="Enter content.."
                                                onChange={(e) =>
                                                    handleChangeContents(idx, e)
                                                }
                                            />
                                            <ButtonModal
                                                delete
                                                type="button"
                                                onClick={() =>
                                                    handleRemove(idx)
                                                }
                                            >
                                                Delete Section {idx + 1}
                                            </ButtonModal>
                                        </WrapsField>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </Card>
            </SectionOne>
        </Section>
    );
}

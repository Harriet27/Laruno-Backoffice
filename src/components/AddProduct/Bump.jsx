import React, { useState } from 'react';
import Card from '../../elements/Card/Card';
import Styled from 'styled-components';

// --- Styled Components --- //
const Input = Styled.input`
    width: 100%;
    padding: .375rem;
    font-size: 14px;
    font-weight: 400;
    color: #495057;
    border-radius: 3px;
    background-color: #FCFCFC;
    border: 1px solid #ced4da;
    &:focus{
    outline: none !important;
    border:1px solid #66AFE9;
    margin-right: ${(props) => (props.checkbox ? '10px' : null)};
    }
`;

const Label = Styled.label`
    
`;
const WrapsField = Styled.div`
    margin-bottom: 25px;
`;
const Span = Styled.span`
    font-weight: bold;
    color: #656565;
    font-size: 18px;
`;

const Section = Styled.div`
    padding: 50px 750px 50px 100px;
    line-height: 1.5;
    @media (max-width: 1000px) {
      padding: 40px
    }
`;
const SectionOne = Styled.div`
    display: flex;
    width: 50%;
    @media (max-width: 800px) {
        width: 100%
    }
`;
// --- Styled Components --- //

export default function Bump(props) {
    const [box, setBox] = useState({
        checkbox: '',
    });
    const { bump_name, onChange, bump_weight, bump_image, bump_price } = props;
    // handle change untuk onChange
    const handleChange = (event) => {
        setBox({ ...box, [event.target.name]: event.target.checked });
    };
    return (
        <Section>
            <Card isNormal>
                <div style={{ padding: '20px 30px' }}>
                    {/* <label>
                        <input
                            name="checkbox"
                            id="checkbox"
                            value={box.checkbox}
                            type="checkbox"
                            onChange={handleChange}
                        />
                        Do you want to show a bump offer on this product?
                    </label> */}

                    <div>
                        {/* {box.checkbox === true ? ( */}
                        <React.Fragment>
                            <WrapsField>
                                <Label>
                                    <Span>Bump Product</Span> Name will appear
                                    on the cart & invoice
                                </Label>
                                <div>
                                    <Input
                                        type="text"
                                        name="bump_name"
                                        id="bump_name"
                                        value={bump_name}
                                        onChange={onChange}
                                    />
                                </div>
                            </WrapsField>

                            <WrapsField>
                                <Label>
                                    <Span>Harga</Span>
                                </Label>
                                <div>
                                    <Input
                                        type="number"
                                        name="bump_price"
                                        id="bump_price"
                                        value={bump_price}
                                        onChange={onChange}
                                    />
                                </div>
                            </WrapsField>

                            <WrapsField>
                                <Label>
                                    <Span>Bump Weight</Span> (gr)
                                </Label>
                                <div>
                                    <Input
                                        type="number"
                                        name="bump_weight"
                                        id="bump_weight"
                                        value={bump_weight}
                                        onChange={onChange}
                                    />
                                </div>
                            </WrapsField>

                            <WrapsField>
                                <Label>
                                    <Span>Upload Image</Span>
                                </Label>
                                <div>
                                    <Input
                                        type="file"
                                        name="bump_image"
                                        id="bump_image"
                                        value={bump_image}
                                        onChange={onChange}
                                    />
                                </div>
                            </WrapsField>
                        </React.Fragment>
                        {/* ) : null} */}
                    </div>
                </div>
            </Card>
        </Section>
    );
}

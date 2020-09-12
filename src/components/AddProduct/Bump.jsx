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

// --- Styled Components --- //

export default function Bump(props) {
    const [box, setBox] = useState({
        checkbox: '',
    });

    // handle change untuk onChange
    const handleChange = (event) => {
        setBox({ ...box, [event.target.name]: event.target.checked });
    };
    return (
        <div
            style={{
                padding: '50px 100px',
            }}
        >
            <Card isNormal style={{ width: '50%' }}>
                <div style={{ padding: '20px 30px' }}>
                    <label>
                        <input
                            style={{ marginRight: '10PX' }}
                            name="checkbox"
                            id="checkbox"
                            value={box.checkbox}
                            type="checkbox"
                            onChange={handleChange}
                        />
                        Do you want to show a bump offer on this product?
                    </label>

                    <div>
                        {box.checkbox === true ? (
                            <React.Fragment>
                                <WrapsField>
                                    <Label>
                                        <Span>Bump Product</Span> Name will
                                        appear on the cart & invoice
                                    </Label>
                                    <div>
                                        <Input
                                            type="text"
                                            name="bump_product"
                                            id="bump_product"
                                            value={props.bump_product}
                                            onChange={props.onChange}
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
                                            name="price_bump"
                                            id="price_bump"
                                            value={props.price_bump}
                                            onChange={props.onChange}
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
                                            value={props.bump_weight}
                                            onChange={props.onChange}
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
                                            name="image_bump"
                                            id="image_bump"
                                            value={props.image_bump}
                                            onChange={props.onChange}
                                        />
                                    </div>
                                </WrapsField>
                            </React.Fragment>
                        ) : null}
                    </div>
                </div>
            </Card>
        </div>
    );
}

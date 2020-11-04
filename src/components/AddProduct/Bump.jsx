import React, { useState } from 'react';
import Card from '../../elements/Card/Card';
import { useDispatch } from 'react-redux';
import Styled from 'styled-components';
import SingleImage from './SingleImage';
import { fetchPostSingleImage } from '../../store/actions';
// --- Styled Components --- //
const Input = Styled.input`
    width: 100%;
    padding: .375rem;
    font-size: 14px;
    font-weight: 400;
    color: #495057;
    border-radius:${(props) => (props.isPrice ? '0' : '3px')};
    background-color: #FCFCFC;
    border: ${(props) => (props.isPrice ? '0' : '1px solid #ced4da')};
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
    font-size: 16px;
`;

const Section = Styled.div`
    padding: 50px 100px;
    line-height: 1.5;
    @media (max-width: 1000px) {
      padding: 40px
    }
`;

// --- Styled Components --- //

export default function Bump(props) {
    const dispatch = useDispatch();
    const {
        bump_name,
        onChange,
        bump_weight,
        bump_image,
        bump_price,
        formulir,
        setFormulir,
        bump_sub_headline,
        bump_text,
    } = props;

    // --- HandleChange upload Image --- //
    const handleChange = (e) => {
        let image = formulir.image;
        let field = e.target.id;
        image[field] = e.target.files[0];
        setFormulir({ image });
    };

    // --- handleSubmit Upload Image --- //
    const handleSubmit = async (e, id) => {
        e.preventDefault();
        dispatch(fetchPostSingleImage(formulir, e, id, setFormulir));
    };
    return (
        <Section>
            <Card isNormal>
                <div style={{ padding: '20px 30px' }}>
                    <div>
                        <React.Fragment>
                            <WrapsField>
                                <Label>
                                    <Span>Bump Name</Span>
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
                                {/*  Styled for Rp */}
                                <div
                                    style={{
                                        display: 'flex',
                                        border: '1px solid #ced4da',
                                        borderRadius: '3px',
                                    }}
                                >
                                    <div
                                        style={{
                                            backgroundColor: '#e9ecef',
                                            width: '50px',
                                        }}
                                    >
                                        <div
                                            style={{
                                                textAlign: 'center',
                                                marginTop: '3px',
                                            }}
                                        >
                                            Rp
                                        </div>
                                    </div>
                                    <Input
                                        isPrice
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
                                <SingleImage
                                    id="bump_image"
                                    onChange={handleChange}
                                    onSubmit={(e) =>
                                        handleSubmit(e, 'bump_image')
                                    }
                                />
                            </WrapsField>
                            <div
                                style={{
                                    width: '100%',
                                    border: '1px dotted gray',
                                    height: '150px',
                                    marginBottom: '10px',
                                }}
                            >
                                <div style={{ width: '100px' }}>
                                    {typeof formulir.image.bump_image ===
                                    'object' ? null : (
                                        <img
                                            width="100%"
                                            src={formulir.image.bump_image}
                                            alt={formulir.image.bump_image}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Tambahan bump text dan bump sub headline */}
                            <WrapsField>
                                <Label>
                                    <Span>Bump Sub Headline</Span>
                                </Label>
                                <div>
                                    <Input
                                        type="text"
                                        name="bump_sub_headline"
                                        id="bump_sub_headline"
                                        value={bump_sub_headline}
                                        onChange={onChange}
                                    />
                                </div>
                            </WrapsField>

                            <WrapsField>
                                <Label>
                                    <Span>Bump Text</Span>
                                </Label>
                                <div>
                                    <Input
                                        type="text"
                                        name="bump_text"
                                        id="bump_text"
                                        value={bump_text}
                                        onChange={onChange}
                                    />
                                </div>
                            </WrapsField>
                        </React.Fragment>
                    </div>
                </div>
            </Card>
        </Section>
    );
}

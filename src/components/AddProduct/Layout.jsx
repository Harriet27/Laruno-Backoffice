import React, { useState } from 'react';

import Styled from 'styled-components';
import Card from '../../elements/Card/Card';

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
// --- Styled Components --- //

export default function Layout(props) {
    return (
        <Section>
            <SectionOne>
                <Card isNormal style={{ width: '100%' }}>
                    <div style={{ padding: '30px 40px' }}>
                        <WrapsField>
                            <Label>
                                <Span>Headline </Span>
                            </Label>
                            <div>
                                <Input
                                    type="text"
                                    name="headline"
                                    id="headline"
                                    value={props.short_desc}
                                    onChange={props.onChange}
                                />
                            </div>
                        </WrapsField>
                        <WrapsField>
                            <Label>
                                <Span>Sub Headline</Span>
                            </Label>
                            <div>
                                <Input
                                    type="text"
                                    name="sub_headline"
                                    id="sub_headline"
                                    value={props.sub_headline}
                                    onChange={props.onChange}
                                />
                            </div>
                        </WrapsField>

                        <WrapsField>
                            <Label>
                                <Span>Description</Span>
                            </Label>
                            <div>
                                <Input
                                    as="textarea"
                                    name="description"
                                    id="description"
                                    value={props.description}
                                    onChange={props.onChange}
                                />
                            </div>
                        </WrapsField>

                        <WrapsField>
                            <Label>
                                <Span>What You Learn</Span>
                            </Label>
                            <div>
                                <Input
                                    as="textarea"
                                    name="what_you_learn"
                                    id="what_you_learn"
                                    value={props.what_you_learn}
                                    onChange={props.onChange}
                                />
                            </div>
                        </WrapsField>

                        <WrapsField>
                            <Label>
                                <Span>Image Bonus</Span>
                            </Label>
                            <div>
                                <Input
                                    type="file"
                                    name="image_bonus"
                                    id="image_bonus"
                                    value={props.image_bonus}
                                    onChange={props.onChange}
                                />
                            </div>
                        </WrapsField>

                        <WrapsField>
                            <Label>
                                <Span>Image text</Span>
                            </Label>
                            <div>
                                <Input
                                    type="file"
                                    name="image_text"
                                    id="image_text"
                                    value={props.image_text}
                                    onChange={props.onChange}
                                />
                            </div>
                        </WrapsField>

                        <WrapsField>
                            <Label>
                                <Span>Image Product</Span>
                            </Label>
                            <div>
                                <Input
                                    type="file"
                                    name="image_product"
                                    id="image_product"
                                    value={props.image_product}
                                    onChange={props.onChange}
                                />
                            </div>
                        </WrapsField>

                        <WrapsField>
                            <Label>
                                <Span>Video</Span>
                            </Label>
                            <div>
                                <Input
                                    type="file"
                                    name="video"
                                    id="video"
                                    value={props.video}
                                    onChange={props.onChange}
                                />
                            </div>
                        </WrapsField>
                    </div>
                </Card>
            </SectionOne>
        </Section>
    );
}

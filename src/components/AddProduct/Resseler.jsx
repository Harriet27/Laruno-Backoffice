import React, { useState } from "react";

import Styled from "styled-components";
import Card from "../../elements/Card/Card";

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

const Button = Styled.button`
    width: 100%;
    padding: 10px;
    font-weight: bold;
    font-size: 20px;
    border-radius: 3px;
    border: none;
    background-color: #007CB1;
    color: white;
    margin-top: 20px;
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

export default function Resseler(props) {
    return (
        <Section>
            <SectionOne>
                <Card isNormal style={{ width: "100%" }}>
                    <div style={{ padding: "30px 40px" }}>
                        <WrapsField>
                            <Label>
                                <Span>Commision Type </Span>
                            </Label>
                            <div>
                                <Input
                                    as="select"
                                    name="commision_type"
                                    id="commision_type"
                                    value={props.commision_type}
                                    onChange={props.onChange}
                                >
                                    <option value="" selected disabled hidden>
                                        Choose here
                                    </option>
                                    <option value="low">Low</option>
                                    <option value="middle">Middle</option>
                                    <option value="high">High</option>
                                </Input>
                            </div>
                        </WrapsField>

                        <WrapsField>
                            <Label>
                                <Span>Promotion Tools</Span>
                            </Label>
                            <div>
                                <Input
                                    as="select"
                                    name="promotion_tools"
                                    id="promotion_tools"
                                    value={props.promotion_tools}
                                    onChange={props.onChange}
                                >
                                    <option value="" selected disabled hidden>
                                        Choose here
                                    </option>
                                    <option value="image">Image</option>
                                    <option value="video">Video Url</option>
                                    <option value="text">Text</option>
                                </Input>
                            </div>
                        </WrapsField>
                    </div>
                </Card>
            </SectionOne>
        </Section>
    );
}

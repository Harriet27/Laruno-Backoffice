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

export default function AddProduct(props) {
    return (
        <Section>
            <SectionOne>
                <Card isNormal style={{ width: "100%" }}>
                    <Form as="div">
                        <WrapsField>
                            <Label>
                                <Span>Nama Produk</Span>
                            </Label>
                            <div>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={props.name}
                                    onChange={props.onChange}
                                />
                            </div>
                        </WrapsField>

                        <WrapsField>
                            <Label>
                                <Span>Product Category</Span>
                            </Label>
                            <div>
                                <Input
                                    as="select"
                                    name="type"
                                    id="type"
                                    value={props.type}
                                    onChange={props.onChange}
                                >
                                    <option value="" selected disabled hidden>
                                        Choose here
                                    </option>
                                    <option value="webinar">Webinar</option>
                                    <option value="digital">Digital</option>
                                    <option value="ecommerce">Ecommerce</option>
                                    <option value="bonus">Bonus</option>
                                </Input>
                            </div>
                        </WrapsField>

                        <WrapsField>
                            <Label>
                                <Span>Topic</Span>
                            </Label>
                            <div>
                                <Input
                                    as="select"
                                    name="topic"
                                    id="topic"
                                    value={props.topic}
                                    onChange={props.onChange}
                                >
                                    <option value="" selected disabled hidden>
                                        Choose here
                                    </option>
                                    <option value="5f59b0c4f2041be760e8b3c5">
                                        Bussiness
                                    </option>
                                    <option value="5f59b0c4f2041be760e8b3c5">
                                        Finance
                                    </option>
                                    <option value="5f59b0c4f2041be760e8b3c5">
                                        Marketing
                                    </option>
                                    <option value="5f59b0c4f2041be760e8b3c5s">
                                        Sales
                                    </option>
                                </Input>
                            </div>
                        </WrapsField>

                        {/* components harga */}
                        <WrapsField>
                            <Label>
                                <Span>Harga</Span>
                            </Label>
                            <div>
                                <Input
                                    type="number"
                                    name="price"
                                    id="price"
                                    value={props.price}
                                    onChange={props.onChange}
                                />
                            </div>
                        </WrapsField>

                        <WrapsField>
                            <Label>
                                <Span>Periode waktu</Span>
                            </Label>
                            <div>
                                <Input
                                    type="number"
                                    name="time_period"
                                    id="time_period"
                                    value={props.time_period}
                                    onChange={props.onChange}
                                />
                            </div>
                        </WrapsField>

                        <WrapsField>
                            <Label>
                                <Span>Status</Span>
                            </Label>
                            <div>
                                <Input
                                    as="select"
                                    name="visibility"
                                    id="visibility"
                                    value={props.visibility}
                                    onChange={props.onChange}
                                >
                                    <option value="" selected disabled hidden>
                                        Choose here
                                    </option>
                                    <option value="publish">Public</option>
                                    <option value="private">Private</option>
                                    <option value="private">Draft</option>
                                </Input>
                            </div>
                        </WrapsField>

                        <WrapsField>
                            <Label>
                                <Span>Form Type</Span>
                            </Label>
                            <div>
                                <Input
                                    as="select"
                                    name="form_type"
                                    id="form_type"
                                    value={props.form_type}
                                    onChange={props.onChange}
                                >
                                    <option value="" selected disabled hidden>
                                        Choose here
                                    </option>
                                    <option value="simple">Simple</option>
                                    <option value="full">Full</option>
                                </Input>
                            </div>
                        </WrapsField>

                        <WrapsField>
                            <Label>
                                <Span>Upsale</Span>
                            </Label>
                            <div>
                                <Input
                                    as="select"
                                    name="sale_method"
                                    id="sale_method"
                                    value={props.sale_method}
                                    onChange={props.onChange}
                                >
                                    <option value="" selected disabled hidden>
                                        Choose here
                                    </option>
                                    <option value="normal">Normal</option>
                                    <option value="upsale">Upsale</option>
                                    <option value="upgrade">Upgrade</option>
                                    <option value="crossale">Crossale</option>
                                </Input>
                            </div>
                        </WrapsField>

                        {/* tes mentor  */}
                        <WrapsField>
                            <Label>
                                <Span>Mentor</Span>
                            </Label>
                            <div>
                                <Input
                                    type="text"
                                    name="mentor"
                                    id="mentor"
                                    value={props.mentor}
                                    onChange={props.onChange}
                                />
                            </div>
                        </WrapsField>

                        {/* tes product redirect */}
                        <WrapsField>
                            <Label>
                                <Span>Product Redirect</Span>
                            </Label>
                            <div>
                                <Input
                                    type="text"
                                    name="product_redirect"
                                    id="product_redirect"
                                    value={props.product_redirect}
                                    onChange={props.onChange}
                                />
                            </div>
                        </WrapsField>

                        {/* logic type  */}
                        <div>
                            {props.form === "webinar" ? (
                                <div>
                                    <WrapsField>
                                        <Label>
                                            <Span>Zoom ID</Span>
                                        </Label>
                                        <div>
                                            <Input
                                                type="text"
                                                name="media_url"
                                                id="media_url"
                                                value={props.zoom_id}
                                                onChange={props.onChange}
                                            />
                                        </div>
                                    </WrapsField>

                                    <WrapsField>
                                        <Label>
                                            <Span>Start Date</Span>
                                        </Label>
                                        <div>
                                            <Input
                                                type="date"
                                                name="start_at"
                                                id="start_at"
                                                value={props.start_at}
                                                onChange={props.onChange}
                                            />
                                        </div>
                                    </WrapsField>

                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <WrapsField style={{ width: "45%" }}>
                                            <Label>
                                                <Span>Start Time</Span>
                                            </Label>
                                            <div>
                                                <Input
                                                    type="time"
                                                    name="start_time"
                                                    id="start_time"
                                                    value={props.start_time}
                                                    onChange={props.onChange}
                                                />
                                            </div>
                                        </WrapsField>

                                        <WrapsField style={{ width: "45%" }}>
                                            <Label>
                                                <Span>End Time</Span>
                                            </Label>
                                            <div>
                                                <Input
                                                    type="time"
                                                    name="end_time"
                                                    id="end_time"
                                                    value={props.end_time}
                                                    onChange={props.onChange}
                                                />
                                            </div>
                                        </WrapsField>
                                    </div>
                                </div>
                            ) : null}
                            {props.form === "digital" ? (
                                <WrapsField>
                                    <Label>
                                        <Span>Fullfilment</Span>
                                    </Label>
                                    <div>
                                        <Input
                                            as="select"
                                            name="cars"
                                            id="cars"
                                        >
                                            <option value="volvo">Buku</option>
                                            <option value="saab">Video</option>
                                        </Input>
                                    </div>
                                </WrapsField>
                            ) : null}

                            {props.form === "ecommerce" ? (
                                <WrapsField
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <div>
                                        <input
                                            type="radio"
                                            value="cod"
                                            name="cod"
                                            id="cod"
                                        />
                                        <Label>
                                            <Span
                                                style={{ marginLeft: "10PX" }}
                                            >
                                                COD
                                            </Span>
                                        </Label>
                                    </div>

                                    <div>
                                        <input
                                            type="radio"
                                            value="regular"
                                            name="regular"
                                            id="regular"
                                        />
                                        <Label>
                                            <Span
                                                style={{ marginLeft: "10PX" }}
                                            >
                                                Regular
                                            </Span>
                                        </Label>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            value="both"
                                            name="both"
                                            id="both"
                                        />
                                        <Label>
                                            <Span
                                                style={{ marginLeft: "10PX" }}
                                            >
                                                Both
                                            </Span>
                                        </Label>
                                    </div>
                                </WrapsField>
                            ) : null}
                        </div>
                    </Form>
                </Card>
            </SectionOne>
        </Section>
    );
}

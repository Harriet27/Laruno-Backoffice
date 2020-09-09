import React from "react";
import Styled from "styled-components";

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
export default function TypeCondition(props) {
    return (
        <React.Fragment>
            {props.form === "webinar" ? (
                <div>
                    <WrapsField>
                        <Label>
                            <Span>Zoom ID</Span>
                        </Label>
                        <div>
                            <Input
                                type="text"
                                name="zoom_id"
                                id="zoom_id"
                                value={props.zoom_id}
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

                        <WrapsField style={{ width: "45%" }}>
                            <Label>
                                <Span>End Date</Span>
                            </Label>
                            <div>
                                <Input
                                    type="date"
                                    name="end_at"
                                    id="end_at"
                                    value={props.end_at}
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
                        <Input as="select" name="cars" id="cars">
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
                        <input type="radio" value="cod" name="cod" id="cod" />
                        <Label>
                            <Span style={{ marginLeft: "10PX" }}>COD</Span>
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
                            <Span style={{ marginLeft: "10PX" }}>Regular</Span>
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
                            <Span style={{ marginLeft: "10PX" }}>Both</Span>
                        </Label>
                    </div>
                </WrapsField>
            ) : null}
        </React.Fragment>
    );
}

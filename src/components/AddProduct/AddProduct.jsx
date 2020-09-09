import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchPostProducts } from "../../store/actions/product";
import Styled from "styled-components";
import Card from "../../elements/Card/Card";

// --- Styled Components --- //
const Input = Styled.input`
    width: 100%;
    padding: 10px;
    font-size: 20px;
    border-radius: 3px;
    background-color: #FCFCFC;
    border: 1px solid gray;
    &:focus{
    outline: none !important;
    border:1px solid #66AFE9;
    }
`;
const Section = Styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-bottom: 100px;
    line-height: 1.5;
`;
const Label = Styled.label`
    
`;
const WrapsField = Styled.div`
    margin-bottom: 10px;
`;
const Span = Styled.span`
    font-weight: bold;
    color: #656565;
`;

const Button = Styled.button`
    width: 100%;
    padding: 10px;
    font-weight: bold;
    font-size: 24px;
    border-radius: 3px;
    background-color: #007CB1;
    color: white;
    margin-top: 20px;
`;
// --- Styled Components --- //

export default function AddProduct() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [form, setForm] = useState({
        type: "",
        name: "",
        price: "",
        short_desc: "",
        description: "",
        time_period: "",
    });

    // handleSubmit untuk enter dan submit button
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(fetchPostProducts(form, history));
    };

    // handle change untuk onChange
    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    return (
        <Section>
            <Card isNormal style={{ padding: "40px 30px" }}>
                <form onSubmit={handleSubmit} style={{ width: "550px" }}>
                    <WrapsField>
                        <Label>
                            <Span>Nama Produk </Span>
                        </Label>
                        <div>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                value={form.name}
                                onChange={handleChange}
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
                                value={form.type}
                                onChange={handleChange}
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
                            <Span>Harga</Span>
                        </Label>
                        <div>
                            <Input
                                type="number"
                                name="price"
                                id="price"
                                value={form.price}
                                onChange={handleChange}
                            />
                        </div>
                    </WrapsField>

                    <WrapsField>
                        <Label>
                            <Span>Deskripsi Singkat</Span>
                        </Label>
                        <div>
                            <Input
                                type="text"
                                name="short_desc"
                                id="short_desc"
                                value={form.short_desc}
                                onChange={handleChange}
                            />
                        </div>
                    </WrapsField>

                    <WrapsField>
                        <Label>
                            <Span>Deskripsi</Span>
                        </Label>
                        <div>
                            <Input
                                as="textarea"
                                name="description"
                                id="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="add description..."
                            ></Input>
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
                                value={form.time_period}
                                onChange={handleChange}
                            />
                        </div>
                    </WrapsField>
                    {/* logic type  */}
                    <div>
                        {form.type === "webinar" ? (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <WrapsField>
                                    <Label>
                                        <Span>Zoom ID</Span>
                                    </Label>
                                    <div>
                                        <Input
                                            type="text"
                                            name="zoom_id"
                                            id="zoom_id"
                                            value=""
                                            // onChange={handleChange}
                                        />
                                    </div>
                                </WrapsField>
                                <WrapsField>
                                    <Label>
                                        <Span>Schedule</Span>
                                    </Label>
                                    <div>
                                        <Input
                                            type="date"
                                            name="schedule"
                                            id="schedule"
                                            value={form.time_period}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </WrapsField>
                            </div>
                        ) : null}
                        {form.type === "digital" ? (
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

                        {form.type === "ecommerce" ? (
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
                                        <Span style={{ marginLeft: "10PX" }}>
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
                                        <Span style={{ marginLeft: "10PX" }}>
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
                                        <Span style={{ marginLeft: "10PX" }}>
                                            Both
                                        </Span>
                                    </Label>
                                </div>
                            </WrapsField>
                        ) : null}
                    </div>
                    <Button>Add Product</Button>
                </form>
            </Card>
        </Section>
    );
}

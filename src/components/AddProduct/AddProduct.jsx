import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchPostProducts } from "../../store/actions/product";
import Styled from "styled-components";
import Card from "../../elements/Card/Card";

// --- Styled Components --- //
const Input = Styled.input`
    width: 100%;
`;
const Section = Styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;
const Label = Styled.label`
    font-size: 24px;
`;
const WrapsField = Styled.div`

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
            <Card isNormal style={{ padding: "30px" }}>
                <form onSubmit={handleSubmit} style={{ width: "400px" }}>
                    <WrapsField>
                        <Label>Name</Label>
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
                        <Label>Type</Label>
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
                                <option value="webinar">webinar</option>
                                <option value="digital">digital</option>
                                <option value="ecommerce">ecommerce</option>
                                <option value="bonus">bonus</option>
                            </Input>
                        </div>
                    </WrapsField>

                    <WrapsField>
                        <Label>Price</Label>
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
                        <Label>Deskripsi Singkat</Label>
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
                        <Label>Deskripsi</Label>
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
                        <Label>Time Periode</Label>
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

                    <Input as="button">Add Product</Input>
                </form>
            </Card>
        </Section>
    );
}

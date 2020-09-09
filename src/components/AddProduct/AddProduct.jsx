import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchPostProducts } from "../../store/actions/product";
import Styled from "styled-components";
import Card from "../../elements/Card/Card";

// --- Styled Components --- //
const Input = Styled.input`
    width: 100%;
    padding: .375rem;
    font-size: 16px;
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
width: 100%;
`;
const Form = Styled.form`
padding: 50px 40px;
@media (max-width: 800px) {
    padding: 20px;
      }

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
        topic: "",
        start_at: "",
        end_at: "",
        image_url: "",
        video_url: "",
        product_redirect: "",
        sale_method: "",
        topic: "",
        visibility: "",
        form_type: "",
        image_url: "",
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
            <SectionOne>
                <Card isNormal style={{ width: "100%" }}>
                    <Form onSubmit={handleSubmit}>
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
                        {/* tes component */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <WrapsField style={{ width: "45%" }}>
                                <Label>
                                    <Span>Topic</Span>
                                </Label>
                                <div>
                                    <Input
                                        as="select"
                                        name="topic"
                                        id="topic"
                                        value={form.topic}
                                        onChange={handleChange}
                                    >
                                        <option
                                            value=""
                                            selected
                                            disabled
                                            hidden
                                        >
                                            Choose here
                                        </option>
                                        <option value="bussiness">
                                            Bussiness
                                        </option>
                                        <option value="finance">Finance</option>
                                        <option value="marketing">
                                            Marketing
                                        </option>
                                        <option value="sales">Sales</option>
                                    </Input>
                                </div>
                            </WrapsField>

                            {/* tes components */}
                            <WrapsField style={{ width: "45%" }}>
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
                        </div>
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

                        <WrapsField>
                            <Label>
                                <Span>visibility</Span>
                            </Label>
                            <div>
                                <Input
                                    as="select"
                                    name="visibility"
                                    id="visibility"
                                    value={form.visibility}
                                    onChange={handleChange}
                                >
                                    <option value="" selected disabled hidden>
                                        Choose here
                                    </option>
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
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
                                    value={form.form_type}
                                    onChange={handleChange}
                                >
                                    <option value="" selected disabled hidden>
                                        Choose here
                                    </option>
                                    <option value="public">Simple</option>
                                    <option value="private">Full</option>
                                </Input>
                            </div>
                        </WrapsField>

                        {/* logic type  */}
                        <div>
                            {form.type === "webinar" ? (
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
                                                value={form.zoom_id}
                                                onChange={handleChange}
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
                                                    value={form.start_at}
                                                    onChange={handleChange}
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
                                                    value={form.end_at}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </WrapsField>
                                    </div>
                                </div>
                            ) : null}
                            {form.type === "digital" ? (
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
                        <Button>Add Product</Button>
                    </Form>
                </Card>
            </SectionOne>
        </Section>
    );
}

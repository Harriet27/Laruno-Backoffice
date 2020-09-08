import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchPostProducts } from "../../store/actions/product";
import Styled from "styled-components";
import Card from "../../elements/Card/Card";

// styled-components
const Input = Styled.input`
width: 100%;
`;
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
    console.log(form, "add product");
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
            }}
        >
            <Card isNormal style={{ padding: "30px" }}>
                <form onSubmit={handleSubmit} style={{ width: "400px" }}>
                    <div>
                        <label>Name</label>
                        <div>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    {/* Section */}
                    <div>
                        <label>Type</label>
                        <div>
                            <Input
                                as="select"
                                name="type"
                                id="type"
                                value={form.type}
                                onChange={handleChange}
                            >
                                <option value="webinar">webinar</option>
                                <option value="digital">digital</option>
                                <option value="ecommerce">ecommerce</option>
                                <option value="bonus">bonus</option>
                            </Input>
                        </div>
                    </div>
                    {/* Section */}
                    <div>
                        <label>Price</label>
                        <div>
                            <Input
                                type="number"
                                name="price"
                                id="price"
                                value={form.price}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    {/* Section */}
                    <div>
                        <label>Deskripsi Singkat</label>
                        <div>
                            <Input
                                type="text"
                                name="short_desc"
                                id="short_desc"
                                value={form.short_desc}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    {/* Section */}
                    <div>
                        <label>Deskripsi</label>
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
                    </div>
                    {/* Section */}
                    <div>
                        <label>Time Periode</label>
                        <div>
                            <Input
                                type="number"
                                name="time_period"
                                id="time_period"
                                value={form.time_period}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    {/* Section */}
                    <button>Add Product</button>
                </form>
            </Card>
        </div>
    );
}

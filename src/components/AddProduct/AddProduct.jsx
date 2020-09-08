import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchPostProducts } from "../../store/actions/product";
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
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <div>
                        <input
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
                        <select
                            name="type"
                            id="type"
                            value={form.type}
                            onChange={handleChange}
                        >
                            <option>Webinar</option>
                            <option>Product Digital</option>
                            <option>Bonus</option>
                        </select>
                    </div>
                </div>
                {/* Section */}
                <div>
                    <label>Price</label>
                    <div>
                        <input
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
                        <input
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
                        <textarea
                            name="description"
                            id="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="add description..."
                        ></textarea>
                    </div>
                </div>
                {/* Section */}
                <div>
                    <label>Time Periode</label>
                    <div>
                        <input
                            type="number"
                            name="time_period"
                            id="time_period"
                            value={form.time_period}
                            onChange={handleChange}
                        ></input>
                    </div>
                </div>
                {/* Section */}
                <button>Add Product</button>
            </form>
        </React.Fragment>
    );
}

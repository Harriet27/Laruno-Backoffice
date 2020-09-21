import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import MultiSelect from '@khanacademy/react-multi-select';
import { fetchUpdateProduct } from '../../store/actions';
const options = [
    { label: 'One', value: 1 },
    { label: 'Two', value: 2 },
    { label: 'Three', value: 3 },
];
// (selected) => this.setState({ selected });

export default function Testing() {
    let { id } = useParams();
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        name: '',
        slug: '',
    });
    console.log(form);
    const handleSelect = (topic) => {
        setForm({
            topic,
        });
    };

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(fetchUpdateProduct(form, id));
    };
    return (
        <div>
            <input
                type="text"
                value={form.name}
                name="name"
                onChange={handleChange}
            />

            <input
                type="text"
                value={form.slug}
                name="slug"
                onChange={handleChange}
            />

            <button onClick={handleSubmit}>Updated</button>
        </div>
    );
}

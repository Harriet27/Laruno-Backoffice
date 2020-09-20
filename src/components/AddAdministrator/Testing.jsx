import React, { useState } from 'react';
import MultiSelect from '@khanacademy/react-multi-select';

const options = [
    { label: 'One', value: 1 },
    { label: 'Two', value: 2 },
    { label: 'Three', value: 3 },
];
// (selected) => this.setState({ selected });

export default function Testing() {
    const [form, setForm] = useState({
        topic: [],
    });
    console.log(form);
    const handleSelect = (topic) => {
        setForm({
            topic,
        });
    };
    return (
        <div>
            <MultiSelect
                options={options}
                selected={form.topic}
                onSelectedChanged={handleSelect}
            />
        </div>
    );
}

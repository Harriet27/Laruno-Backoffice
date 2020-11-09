import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShowTopic, fetchUpdateTopic } from '../../store/actions';
import { Input } from '../../elements/Styled/StyledForm';

export default function InputUpdateTopic(props) {
    // ---Input value --- //
    const InputValue = (props) => {
        const { name, icon, id } = props;
        const dispatch = useDispatch();
        const [form, setForm] = useState({
            name: name || '',
            icon: icon || '',
        });
        console.log(form, 'form');
        const handleSubmit = (event) => {
            event.preventDefault();
            dispatch(fetchUpdateTopic(form, id));
        };
        const handleChange = (event) => {
            setForm({ ...form, [event.target.name]: event.target.value });
        };

        return (
            <>
                <Input
                    style={{ width: '100%' }}
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />
                <div
                    style={{
                        width: '100px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <img width="100%" src={form.icon} alt={form.icon} />
                </div>
            </>
        );
    };

    const dispatch = useDispatch();
    const { id } = props;
    const topic = useSelector((state) => state.topic.showTopic);
    console.log(topic, 'update tpic by id');

    useEffect(() => {
        dispatch(fetchShowTopic(id));
        // eslint-disable-next-line
    }, [dispatch]);

    return (
        <section>
            <InputValue
                name={topic !== null && topic.data.name}
                icon={topic !== null && topic.data.icon}
                id={id}
            />
        </section>
    );
}

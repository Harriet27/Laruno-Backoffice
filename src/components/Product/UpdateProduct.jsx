import React, { useState } from 'react';
import Card from '../../elements/Card/Card';
import ModalSmart from '../../elements/Modal/ModalSmart';
import { fetchUpdateTopic } from '../../store/actions';
import { useDispatch } from 'react-redux';
import Styled from 'styled-components';

// --- Styled Components --- //
const Section = Styled.section`
    width: 100%;
   
    align-items: center;
    display: flex;
    justify-content: center;
    
    
`;
const Input = Styled.input`
    width: 100%;
    padding: 10px;
    font-size: 18px;
    font-weight: 400;
    color:${(props) => (props.isButton ? 'white' : '#495057')} ;
    border-radius: 3px;
    background-color: ${(props) => (props.isButton ? '#0098DA' : '#FCFCFC')};
    border: 1px solid #ced4da;
    &:focus{
    outline: none !important;
    border:1px solid #66AFE9;
    }
`;
const Brand = Styled.h1`
    text-align: center;
    margin-bottom: 20px;
`;
const WrapForm = Styled.div`
    width: 100%;
    margin-bottom: 20px;
`;
// --- Styled Components --- //

export default function UpdateTopic(props) {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        type: '',
        name: '',
        price: '',
        headline: '',
        description: '',
        time_period: '',
        date: '',
        slug: '',
        image_url: '',
        video_url: '',
        sale_method: '',
        topic: [],
        visibility: '',
        mentor: '',
        client_url: '',
        image_product_url: '',
        image_bonus_url: '',
        image_text_url: '',
        start_time: '',
        end_time: '',
        commision_type: '',
        promotion_tools: '',
        product_redirect: '',
        // bump_product: '',
        // bump_weight: '',
        // image_bump: '',
        // price_bump: '',
    });

    // Fetch submit method Post
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(fetchUpdateTopic(form, props.id));
    };
    // merubah value setiap kali di ketik
    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    return (
        <React.Fragment>
            <ModalSmart
                buttonLabel="Update"
                title="Update Topic"
                onClickConfirm={handleSubmit}
            >
                <Section>
                    <Card isLogin>
                        <div>
                            <WrapForm>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Name"
                                    required
                                />
                            </WrapForm>
                        </div>
                    </Card>
                </Section>
            </ModalSmart>
        </React.Fragment>
    );
}

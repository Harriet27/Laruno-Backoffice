import React, { useState } from 'react';
import Styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { fetchPostCoupons } from '../../store/actions';

// --- Elements, Pages, Components --- //

import ModalSmart from '../../elements/Modal/ModalSmart';

// --- Styled Components --- //
const [md, lg] = ['16px', '18px', '20px'];

const Span = Styled.span`
    font-weight: bold;
    color: #656565;
    font-size: 18px;
`;

const Input = Styled.input`
    width: 100%;
    padding: 10px;
    font-size: ${md};
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

const WrapForm = Styled.div`
    width: 100%;
    margin-bottom: ${lg};
`;

export default function InputOrder() {
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        product: '',
        checkout_page: '',
        phone_number: '',
        handled_by: '',
    });

    // --- Fetch submit method Post --- //
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(fetchPostCoupons(form));
    };
    // --- Change Value when Input Active --- //
    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    return (
        <ModalSmart
            styleModal={{ maxWidth: '700px', width: '100%' }}
            buttonLabel="+ Input Order"
            title="Input Order"
            onClickConfirm={handleSubmit}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <WrapForm style={{ width: '45%' }}>
                    <label>
                        <Span>Product</Span>
                    </label>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        value={form.product}
                        onChange={handleChange}
                        placeholder="Name Coupons"
                        required
                    />
                </WrapForm>

                <WrapForm style={{ width: '45%' }}>
                    <label>
                        <Span>Checkout Page</Span>
                    </label>
                    <Input
                        type="text"
                        name="checkout_page"
                        id="checkout_page"
                        value={form.checkout_page}
                        onChange={handleChange}
                        placeholder="Checkout page"
                        required
                    />
                </WrapForm>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <WrapForm style={{ width: '45%' }}>
                    <label>
                        <Span>Handled By</Span>
                    </label>
                    <Input
                        type="text"
                        name="handled_by"
                        id="handled_by"
                        value={form.handled_by}
                        onChange={handleChange}
                        placeholder="Helen"
                        required
                    />
                </WrapForm>

                <WrapForm style={{ width: '45%' }}>
                    <label>
                        <Span>Contact</Span>
                    </label>
                    <Input
                        type="number"
                        name="phone_number"
                        id="phone_number"
                        value={form.phone_number}
                        onChange={handleChange}
                        placeholder="087875666339"
                        required
                    />
                </WrapForm>
            </div>
        </ModalSmart>
    );
}

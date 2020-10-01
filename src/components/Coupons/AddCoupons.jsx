import React, { useState } from 'react';
import Styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { fetchPostCoupons } from '../../store/actions';

// --- Elements, Pages, Components --- //
import Card from '../../elements/Card/Card';
import ModalSmart from '../../elements/Modal/ModalSmart';

// --- Styled Components --- //
const [sm, md, lg] = ['16px', '18px', '20px'];

const Section = Styled.section`
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
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

export default function AddCoupons() {
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        name: '',
        code: '',
        value: '',
        start_date: '',
        end_date: '',
        max_discount: 0,
        payment_method: '',
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
            buttonLabel="Add Coupons"
            title="Add Coupons"
            onClickConfirm={handleSubmit}
        >
            <Section>
                <Card isLogin>
                    <div>
                        {/* --- Name --- */}
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

                        {/* --- Code --- */}
                        <WrapForm>
                            <Input
                                type="text"
                                name="code"
                                id="code"
                                value={form.code}
                                onChange={handleChange}
                                placeholder="code"
                                required
                            />
                        </WrapForm>

                        {/* --- Value --- */}
                        <WrapForm>
                            <Input
                                type="text"
                                name="value"
                                id="value"
                                value={form.value}
                                onChange={handleChange}
                                placeholder="Value"
                                required
                            />
                        </WrapForm>

                        {/* --- Start_Date --- */}
                        <WrapForm>
                            <Input
                                type="date"
                                name="start_date"
                                id="start_date"
                                value={form.start_date}
                                onChange={handleChange}
                                placeholder="Start Date"
                                required
                            />
                        </WrapForm>

                        {/* --- End_Date --- */}
                        <WrapForm>
                            <Input
                                type="date"
                                name="end_date"
                                id="end_date"
                                value={form.end_date}
                                onChange={handleChange}
                                placeholder="End Date"
                                required
                            />
                        </WrapForm>

                        {/* --- Max Discount --- */}
                        <WrapForm>
                            <Input
                                type="number"
                                name="max_discount"
                                id="max_discount"
                                value={form.max_discount}
                                onChange={handleChange}
                                placeholder="Maksimal Discount"
                                required
                            />
                        </WrapForm>

                        {/* --- Payment Method - Transfer - ovo - LinkAja  ---- Radio Button--- */}
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
    );
}

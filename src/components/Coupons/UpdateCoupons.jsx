import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';

// --- Elements, Pages, Components --- //
import ModalSmart from '../../elements/Modal/ModalSmart';
import { useDispatch } from 'react-redux';
import { fetchUpdateCoupons, fetchShowCoupons } from '../../store/actions';
import CreateIcon from '@material-ui/icons/Create';

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

export default function UpdateCoupons(props) {
    const dispatch = useDispatch();
    // const coupons = useSelector((state) => state.coupons.showCoupons);
    useEffect(() => {
        dispatch(fetchShowCoupons(props.id));
        // eslint-disable-next-line
    }, [dispatch]);

    const [form, setForm] = useState({
        name: '',
        code: '',
        value: '',
        start_date: '',
        end_date: '',
        max_discount: 0,
        payment_method: '',
        is_active: false,
    });

    // --- Fetch submit method Post --- //
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(fetchUpdateCoupons(form, props.id));
    };
    // --- Change Value when Input Active --- //
    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleCheckbox = () => {
        setForm({ ...form, is_active: !form.is_active });
    };

    return (
        <ModalSmart
            styleModal={{ maxWidth: '700px', width: '100%' }}
            buttonLabel={<CreateIcon fontSize="small" />}
            title="Update"
            onClickConfirm={handleSubmit}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <WrapForm style={{ width: '45%' }}>
                    <label>
                        <Span>Name</Span>
                    </label>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </WrapForm>

                <WrapForm style={{ width: '45%' }}>
                    <label>
                        <Span>Coupon Code</Span>
                    </label>
                    <Input
                        type="text"
                        name="code"
                        id="code"
                        value={form.code}
                        onChange={handleChange}
                        placeholder="Code Coupons"
                        required
                    />
                </WrapForm>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <WrapForm style={{ width: '45%' }}>
                    <label>
                        <Span>Start Coupons</Span>
                    </label>
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

                <WrapForm style={{ width: '45%' }}>
                    <label>
                        <Span>End Coupons</Span>
                    </label>
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
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <WrapForm style={{ width: '45%' }}>
                    <label>
                        <Span>Max Discount</Span>
                    </label>
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
                <WrapForm style={{ width: '45%' }}>
                    <label>
                        <Span>Payment Method</Span>
                    </label>
                    <Input
                        as="select"
                        name="payment_method"
                        id="payment_method"
                        value={form.payment_method}
                        onChange={handleChange}
                    >
                        <option value="" disabled hidden>
                            Choose here
                        </option>
                        <option value="OVO">OVO</option>
                        <option value="TRANSFER">Transfer</option>
                        <option value="E-WALLET">E-wallet</option>
                    </Input>
                </WrapForm>
            </div>

            <WrapForm>
                <label>
                    <Span>Nilai Coupons</Span>
                </label>
                <Input
                    type="number"
                    name="value"
                    id="value"
                    value={form.value}
                    onChange={handleChange}
                    required
                />
            </WrapForm>
            <WrapForm style={{ width: '45%' }}>
                <label>
                    <input
                        type="checkbox"
                        name="is_active"
                        id="is_active"
                        value={form.is_active}
                        onChange={handleCheckbox}
                        required
                    />
                    Click to active this coupons
                </label>
            </WrapForm>
        </ModalSmart>
    );
}

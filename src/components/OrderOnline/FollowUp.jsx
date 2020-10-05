import React, { useState } from 'react';
import ModalSmart from '../../elements/Modal/ModalSmart';
import { fetchDeleteProduct } from '../../store/actions';
import { useDispatch } from 'react-redux';
import Styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Input } from '../../elements/Styled/StyledForm';
// --- Styled Components --- //
const Section = Styled.section`
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
`;

export default function FollowUp(props) {
    const [form, setForm] = useState({
        number: '',
        text: '',
    });
    console.log(form, 'isinya apa');
    const dispatch = useDispatch();

    function raiseInvoiceClicked() {
        // %0A INI UNTUK ENTER
        // %20 INI UNTUK SPACE
        // form.text = form.text.replace(/\s+/g, '%20');
        form.text = form.text.replace(/\n+/g, '%0A', /\s+/g, '%20');
        const url = `https://wa.me/${form.number}?text=${form.text}`;
        window.open(url, '_blank');
        console.log(form.text);
    }
    const handleChange = (e) => {
        let name = e.target.name;
        setForm({ ...form, [name]: e.target.value });
    };

    // --- test replace to persen --- //

    return (
        <React.Fragment>
            <ModalSmart
                style={{ backgroundColor: 'green' }}
                buttonLabel={<CheckCircleOutlineIcon />}
                title="Follow Up"
                onClickConfirm={raiseInvoiceClicked}
            >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label>Number</label>
                    <Input
                        type="number"
                        name="number"
                        value={form.number}
                        onChange={handleChange}
                    />
                    <label>Text</label>
                    <Input
                        as="textarea"
                        name="text"
                        value={form.text}
                        onChange={handleChange}
                    />
                </div>
            </ModalSmart>
        </React.Fragment>
    );
}

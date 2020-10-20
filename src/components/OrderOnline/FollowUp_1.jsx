import React, { useState } from 'react';
import ModalSmart from '../../elements/Modal/ModalSmart';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Tooltip } from 'reactstrap';
import { Input } from '../../elements/Styled/StyledForm';
// --- Styled Components --- //

export default function FollowUp_1(props) {
    const [form, setForm] = useState({
        number: '6281212408246',
        text:
            '' ||
            `Hari ini mau transfer jam berapa Salvian Kumara?
Pesanan kami siapkan ya...`,
    });
    console.log(form, 'isinya apa');

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
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggleTooltip = () => setTooltipOpen(!tooltipOpen);
    return (
        <React.Fragment>
            <ModalSmart
                style={{ backgroundColor: 'white', border: 'none' }}
                buttonLabel={
                    <i
                        style={{ background: 'white', color: '#d7d7da' }}
                        className="fa fa-comment fa-2x"
                        id="button-label-1"
                    >
                        <span
                            style={{
                                color: 'white',
                                position: 'relative',
                                top: '-6px',
                                left: '-18px',
                                fontSize: '14px',
                            }}
                        >
                            1
                        </span>
                    </i>
                }
                tooltip={
                    <Tooltip
                        placement="top"
                        isOpen={tooltipOpen}
                        target={`button-label-1`}
                        toggle={toggleTooltip}
                    >
                        Follow-Up 1
                    </Tooltip>
                }
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
                        rows="5"
                        name="text"
                        value={form.text}
                        onChange={handleChange}
                    />
                </div>
            </ModalSmart>
        </React.Fragment>
    );
}
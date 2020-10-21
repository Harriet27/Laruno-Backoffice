import React, { useState } from 'react';

import { fetchPostMultipleImage } from '../../store/actions';
import SingleImage from './SingleImage';
import { useDispatch, useSelector } from 'react-redux';
import Styled from 'styled-components';
import ModalImage from '../../elements/Modal/ModalImage';

// --- Styled Components --- //
const Section = Styled.section`
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
`;

export default function ImageProduct(props) {
    const dispatch = useDispatch();
    const { arr, setArr, formulir, setFormulir } = props;

    // console.log(formulir.image[0], 'array 1');
    const handleChange = (e) => {
        let image = formulir.image;

        let field = e.target.id;

        image[field] = e.target.files[0];
        console.log(field, 'field ini apa');
        setFormulir({ image });
    };
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const handleSubmit = async (e, id) => {
        e.preventDefault();

        dispatch(
            fetchPostMultipleImage(formulir, e, id, setFormulir, arr, setArr)
        );
    };

    return (
        <React.Fragment>
            <SingleImage
                modal={modal}
                toggle={toggle}
                title="Image Product"
                label="Upload Image"
                id="image_product"
                onChange={handleChange}
                onSubmit={(e) => handleSubmit(e, 'image_product')}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {arr.image_product.map((item, index) => {
                    return (
                        <div key={item[index]} style={{ width: '100px' }}>
                            <img width="100%" src={item} alt={item} />
                        </div>
                    );
                })}
            </div>
        </React.Fragment>
    );
}

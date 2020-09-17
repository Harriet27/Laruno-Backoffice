import React, { useState, useEffect } from 'react';
import Card from '../../elements/Card/Card';
import ModalSmart from '../../elements/Modal/ModalSmart';
import { fetchShowProduct } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import Styled from 'styled-components';
// import { useHistory } from 'react-router-dom';

// --- Styled Components --- //
const Section = Styled.section`
    width: 100%;

    align-items: center;
    display: flex;
    justify-content: center;

`;

// --- Styled Components --- //

export default function ShowTopic(props) {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.detailproduct);
    console.log(product, 'data show product for pages product');

    // --- useEffect --- get data topic ---//
    useEffect(() => {
        dispatch(fetchShowProduct(props.id));
    }, [dispatch]);

    return (
        <React.Fragment>
            <ModalSmart buttonLabel="show" title="Show Topic">
                <Section></Section>
            </ModalSmart>
        </React.Fragment>
    );
}

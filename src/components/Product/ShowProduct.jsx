import React, { useState, useEffect } from 'react';
import Card from '../../elements/Card/Card';
import ModalSmart from '../../elements/Modal/ModalSmart';
import { fetchShowProduct } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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
    let { id } = useParams();
    const product = useSelector((state) => state.detailproduct.data);
    console.log(product, 'data show product for pages topic');

    // --- useEffect --- get data topic ---//
    useEffect(() => {
        dispatch(fetchShowProduct(id));
    }, [dispatch]);

    return (
        <React.Fragment>
            <section style={{ margin: '100px 50px' }}>
                {product !== undefined && (
                    <div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Card style={{ width: '50%' }} isNormal>
                                <div>
                                    <p>Name: {product.name}</p>
                                    <h5>Description</h5>
                                    <p>{product.description}</p>
                                </div>
                            </Card>
                            <Card style={{ width: '50%' }} isNormal>
                                <div>
                                    <h5>Description</h5>
                                    <p>{product.description}</p>
                                </div>
                            </Card>
                        </div>
                        <Card isNormal>
                            <div>
                                <h5>Description</h5>
                                <p>{product.description}</p>
                            </div>
                        </Card>
                        <Card isNormal>
                            <div>
                                <h5>Description</h5>
                                <p>{product.description}</p>
                            </div>
                        </Card>
                        <Card isNormal>
                            <div>
                                <h5>Description</h5>
                                <p>{product.description}</p>
                            </div>
                        </Card>

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            {' '}
                            <Card isNormal>
                                <div>
                                    <h5>Description</h5>
                                    <p>{product.description}</p>
                                </div>
                            </Card>
                            <Card isNormal>
                                <div>
                                    <h5>Description</h5>
                                    <p>{product.description}</p>
                                </div>
                            </Card>
                        </div>
                    </div>
                )}
            </section>
        </React.Fragment>
    );
}

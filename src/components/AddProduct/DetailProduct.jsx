import React, { useState, useEffect, Component } from 'react';
import Select from 'react-select';

import { useDispatch, useSelector } from 'react-redux';
import { fetchGetTopic } from '../../store/actions';

import Styled from 'styled-components';
import Card from '../../elements/Card/Card';

// --- Styled Components --- //
const Input = Styled.input`
    width: 100%;
    padding: .375rem;
    font-size: 14px;
    font-weight: 400;
    color: #495057;
    border-radius: 3px;
    background-color: #FCFCFC;
    border: 1px solid #ced4da;
    &:focus{
    outline: none !important;
    border:1px solid #66AFE9;
    }
`;
const Section = Styled.section`
    display: flex;
    padding: 50px 100px;
    width: 100%;
    line-height: 1.5;
    @media (max-width: 800px) {
        padding: 20px 40px;
          }
`;
const Label = Styled.label`
    
`;
const WrapsField = Styled.div`
    margin-bottom: 25px;
    width: ${(props) => (props.dividedByTwo ? '45%' : null)}
`;
const Span = Styled.span`
    font-weight: bold;
    color: #656565;
    font-size: 18px;
`;

const SectionOne = Styled.div`
    display: flex;
    width: 50%;
    @media (max-width: 800px) {
        width: 100%
    }
`;
const Form = Styled.form`
    padding: 50px 40px;
    @media (max-width: 800px) {
        padding: 20px;
    }

`;
// --- Styled Components --- //

export default function DetailProduct(props) {
    const dispatch = useDispatch();
    const {
        name,
        onChange,
        slug,
        type,
        price,
        time_period,
        visibility,
        sale_method,
        mentor,
        product_redirect,
        zoom_id,
        start_at,
        start_time,
        end_time,
    } = props;
    const topic = useSelector((state) => state.topic);
    console.log(topic.data, 'topic ini isinya apa cih');

    useEffect(() => {
        dispatch(fetchGetTopic());
    }, [dispatch]);

    // optionsTopic for value select topic
    let optionsTopic =
        topic.data !== undefined &&
        topic.data.map((item) => {
            return { key: item._id, value: item._id, label: item.name };
        });
    return (
        <Section>
            <SectionOne>
                <Card isNormal style={{ width: '100%' }}>
                    <Form as="div">
                        {/* Field name product */}
                        <WrapsField>
                            <Label>
                                <Span>Nama Produk</Span>
                            </Label>
                            <div>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={name}
                                    onChange={onChange}
                                />
                            </div>
                        </WrapsField>

                        {/* Slug */}
                        <WrapsField>
                            <Label>
                                <Span>Slug</Span>
                            </Label>
                            <div>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={slug}
                                    onChange={onChange}
                                />
                            </div>
                        </WrapsField>

                        {/* Field Product Category */}
                        <WrapsField>
                            <Label>
                                <Span>Product Category</Span>
                            </Label>
                            <div>
                                <Input
                                    as="select"
                                    name="type"
                                    id="type"
                                    value={type}
                                    onChange={onChange}
                                >
                                    <option value="" selected disabled hidden>
                                        Choose here
                                    </option>
                                    <option value="webinar">Webinar</option>
                                    <option value="digital">Digital</option>
                                    <option value="ecommerce">Ecommerce</option>
                                    <option value="bonus">Bonus</option>
                                </Input>
                            </div>
                        </WrapsField>

                        {/* Field Topic */}
                        <WrapsField>
                            <Label>
                                <Span>Topic</Span>
                            </Label>
                            <div>
                                {/* Test components React select */}
                                <Select
                                    isMulti
                                    name="colors"
                                    options={optionsTopic}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </div>
                        </WrapsField>

                        {/* Field Price */}
                        <WrapsField>
                            <Label>
                                <Span>Harga</Span>
                            </Label>
                            <div>
                                <Input
                                    type="number"
                                    name="price"
                                    id="price"
                                    value={price}
                                    onChange={onChange}
                                />
                            </div>
                        </WrapsField>

                        {/* Field Time Period */}
                        <WrapsField>
                            <Label>
                                <Span>Periode waktu</Span>
                            </Label>
                            <div>
                                <Input
                                    type="number"
                                    name="time_period"
                                    id="time_period"
                                    value={time_period}
                                    onChange={onChange}
                                />
                            </div>
                        </WrapsField>

                        {/* Field Status */}
                        <WrapsField>
                            <Label>
                                <Span>Status</Span>
                            </Label>
                            <div>
                                <Input
                                    as="select"
                                    name="visibility"
                                    id="visibility"
                                    value={visibility}
                                    onChange={onChange}
                                >
                                    <option value="" selected disabled hidden>
                                        Choose here
                                    </option>
                                    <option value="publish">Public</option>
                                    <option value="private">Private</option>
                                    <option value="private">Draft</option>
                                </Input>
                            </div>
                        </WrapsField>

                        {/* Field UpSale */}
                        <WrapsField>
                            <Label>
                                <Span>Method Sale</Span>
                            </Label>
                            <div>
                                <Input
                                    as="select"
                                    name="sale_method"
                                    id="sale_method"
                                    value={sale_method}
                                    onChange={onChange}
                                >
                                    <option value="" selected disabled hidden>
                                        Choose here
                                    </option>
                                    <option value="normal">Normal</option>
                                    <option value="upsale">Upsale</option>
                                    <option value="upgrade">Upgrade</option>
                                    <option value="crossale">Crossale</option>
                                </Input>
                            </div>
                        </WrapsField>

                        {/* Field mentor  */}
                        <WrapsField>
                            <Label>
                                <Span>Mentor</Span>
                            </Label>
                            <div>
                                <Input
                                    type="text"
                                    name="mentor"
                                    id="mentor"
                                    value={mentor}
                                    onChange={onChange}
                                />
                            </div>
                        </WrapsField>

                        {/* Filed product redirect */}
                        <WrapsField>
                            <Label>
                                <Span>Product Redirect</Span>
                            </Label>
                            <div>
                                <Input
                                    type="text"
                                    name="product_redirect"
                                    id="product_redirect"
                                    value={product_redirect}
                                    onChange={onChange}
                                />
                            </div>
                        </WrapsField>

                        {/* Field logic in field product category  */}
                        <div>
                            {props.form === 'webinar' ? (
                                <div>
                                    <WrapsField>
                                        <Label>
                                            <Span>Zoom ID</Span>
                                        </Label>
                                        <div>
                                            <Input
                                                type="text"
                                                name="media_url"
                                                id="media_url"
                                                value={zoom_id}
                                                onChange={onChange}
                                            />
                                        </div>
                                    </WrapsField>

                                    <WrapsField>
                                        <Label>
                                            <Span>Start Date</Span>
                                        </Label>
                                        <div>
                                            <Input
                                                type="date"
                                                name="start_at"
                                                id="start_at"
                                                value={start_at}
                                                onChange={onChange}
                                            />
                                        </div>
                                    </WrapsField>

                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <WrapsField dividedByTwo>
                                            <Label>
                                                <Span>Start Time</Span>
                                            </Label>
                                            <div>
                                                <Input
                                                    type="time"
                                                    name="start_time"
                                                    id="start_time"
                                                    value={start_time}
                                                    onChange={onChange}
                                                />
                                            </div>
                                        </WrapsField>

                                        <WrapsField dividedByTwo>
                                            <Label>
                                                <Span>End Time</Span>
                                            </Label>
                                            <div>
                                                <Input
                                                    type="time"
                                                    name="end_time"
                                                    id="end_time"
                                                    value={end_time}
                                                    onChange={onChange}
                                                />
                                            </div>
                                        </WrapsField>
                                    </div>
                                </div>
                            ) : null}
                            {props.form === 'digital' ? (
                                <WrapsField>
                                    <Label>
                                        <Span>Fullfilment</Span>
                                    </Label>
                                    <div>
                                        <Input
                                            as="select"
                                            name="cars"
                                            id="cars"
                                        >
                                            <option value="volvo">Buku</option>
                                            <option value="saab">Video</option>
                                        </Input>
                                    </div>
                                </WrapsField>
                            ) : null}

                            {props.form === 'ecommerce' ? (
                                <WrapsField
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <div>
                                        <input
                                            type="radio"
                                            value="cod"
                                            name="cod"
                                            id="cod"
                                        />
                                        <Label>
                                            <Span
                                                style={{ marginLeft: '10PX' }}
                                            >
                                                COD
                                            </Span>
                                        </Label>
                                    </div>

                                    <div>
                                        <input
                                            type="radio"
                                            value="regular"
                                            name="regular"
                                            id="regular"
                                        />
                                        <Label>
                                            <Span
                                                style={{ marginLeft: '10PX' }}
                                            >
                                                Regular
                                            </Span>
                                        </Label>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            value="both"
                                            name="both"
                                            id="both"
                                        />
                                        <Label>
                                            <Span
                                                style={{ marginLeft: '10PX' }}
                                            >
                                                Both
                                            </Span>
                                        </Label>
                                    </div>
                                </WrapsField>
                            ) : null}
                        </div>
                    </Form>
                </Card>
            </SectionOne>
        </Section>
    );
}

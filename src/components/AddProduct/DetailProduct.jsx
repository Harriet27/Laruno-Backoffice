import React, { useEffect } from 'react';
import MultiSelect from '@khanacademy/react-multi-select';
import { useDispatch, useSelector } from 'react-redux';

// --- Elements, Pages, Components --- //
import { fetchGetTopic } from '../../store/actions';
import Styled from 'styled-components';
import Card from '../../elements/Card/Card';
import {
    optionsTime,
    DurationHour,
    DurationMinutes,
} from '../FakeData/FakeData';
import SingleImage from './SingleImage';
// --- Styled Components --- //
const Input = Styled.input`
    width: 100%;
    padding: .375rem;
    font-size: 14px;
    font-weight: 400;
    color: #495057;
    border-radius: ${(props) => (props.price ? '0' : '3px')};
    background-color: #FCFCFC;
    border:${(props) => (props.price ? '0' : '1px solid #ced4da')};
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
        product_redirect,
        zoom_id,
        date,
        start_time,
        topic_select,
        handleSelect,
        // duration,
        weight,
        handleWebinar,
        // --- radio button --- //
        checked_bayar,
        checked_gratis,
        bayar_ongkir,
        gratis_ongkir,
        handleRadio,
        sale_price,
        duration_hours,
        duration_minute,
        handleDuration,
    } = props;

    const topic = useSelector((state) => state.topic.getTopic);

    useEffect(() => {
        dispatch(fetchGetTopic());
    }, [dispatch]);

    // --- optionsTopic for value select topic --- //
    let optionsTopic =
        topic !== null &&
        topic.data.map((item) => {
            return { key: item._id, value: item._id, label: item.name };
        });

    return (
        <Section>
            <SectionOne>
                <Card isNormal style={{ width: '100%' }}>
                    <Form as="div">
                        {/* --- Field name product --- */}
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

                        {/* --- Slug --- */}
                        <WrapsField>
                            <Label>
                                <Span>Slug</Span>
                            </Label>
                            <div>
                                <Input
                                    type="text"
                                    name="slug"
                                    id="slug"
                                    value={slug}
                                    onChange={onChange}
                                />
                            </div>
                        </WrapsField>

                        {/* --- Field Product Category --- */}
                        <WrapsField>
                            <Label>
                                <Span>Product Type</Span>
                            </Label>
                            <div>
                                <Input
                                    as="select"
                                    name="type"
                                    id="type"
                                    value={type}
                                    onChange={onChange}
                                >
                                    <option value="digital">
                                        Product Digital
                                    </option>
                                    <option value="webinar">Webinar</option>
                                    <option value="ecommerce">Ecommerce</option>
                                    <option value="bonus">Bonus</option>
                                </Input>
                            </div>
                        </WrapsField>

                        {/* --- Field logic in field product category ---  */}
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
                                                name="client_url"
                                                id="client_url"
                                                value={zoom_id}
                                                onChange={handleWebinar}
                                            />
                                        </div>
                                    </WrapsField>

                                    <Label>
                                        <Span>Start</Span>
                                    </Label>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <WrapsField dividedByTwo>
                                            <div>
                                                <Input
                                                    type="date"
                                                    name="date"
                                                    id="date"
                                                    value={date}
                                                    onChange={handleWebinar}
                                                />
                                            </div>
                                        </WrapsField>
                                        <WrapsField dividedByTwo>
                                            <div>
                                                <Input
                                                    as="select"
                                                    name="start_time"
                                                    id="start_time"
                                                    value={start_time}
                                                    onChange={handleWebinar}
                                                >
                                                    {optionsTime.map((item) => {
                                                        return (
                                                            <option
                                                                value={
                                                                    item.value
                                                                }
                                                            >
                                                                {item.label}
                                                            </option>
                                                        );
                                                    })}
                                                </Input>
                                            </div>
                                        </WrapsField>
                                    </div>

                                    {/* --- time picker try it --- */}
                                    <Label>
                                        <Span>Duration</Span>
                                    </Label>

                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <WrapsField dividedByTwo>
                                            <div>
                                                <Input
                                                    as="select"
                                                    name="hours"
                                                    id="duration"
                                                    value={duration_hours}
                                                    onChange={handleDuration}
                                                >
                                                    {DurationHour.map(
                                                        (item) => {
                                                            return (
                                                                <option
                                                                    value={
                                                                        item.value
                                                                    }
                                                                >
                                                                    {item.label}
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                                </Input>
                                            </div>
                                        </WrapsField>

                                        <WrapsField dividedByTwo>
                                            <div>
                                                <Input
                                                    as="select"
                                                    name="minutes"
                                                    id="minutes"
                                                    value={duration_minute}
                                                    onChange={handleDuration}
                                                >
                                                    {DurationMinutes.map(
                                                        (item) => {
                                                            return (
                                                                <option
                                                                    value={
                                                                        item.value
                                                                    }
                                                                >
                                                                    {item.label}
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                                </Input>
                                            </div>
                                        </WrapsField>
                                    </div>
                                    {/* --- Batas Percobaan TIME PICKER --- */}
                                </div>
                            ) : null}

                            {/* ---- Ecommerce --- Testing nunggu Service dari Backend ---- */}
                            {props.form === 'ecommerce' ? (
                                <div>
                                    <WrapsField>
                                        <Label>
                                            <Span>Weight</Span> (gr)
                                        </Label>
                                        <div>
                                            <Input
                                                type="number"
                                                name="weight"
                                                id="weight"
                                                value={weight}
                                                onChange={onChange}
                                            />
                                        </div>
                                    </WrapsField>

                                    {/* --- Radio Button 1 --- */}
                                    <WrapsField>
                                        <Input
                                            style={{ width: '3%' }}
                                            type="radio"
                                            name="tambah_ongkir"
                                            id="tambah_ongkir"
                                            value={bayar_ongkir}
                                            checked={checked_bayar}
                                            onChange={handleRadio}
                                        />{' '}
                                        <Span>Mau Tambah Ongkos Kirim ?</Span>
                                    </WrapsField>

                                    {/* Radio Button 2 --- */}
                                    <WrapsField>
                                        <Input
                                            style={{ width: '3%' }}
                                            type="radio"
                                            name="weight"
                                            id="weight"
                                            value={gratis_ongkir}
                                            checked={checked_gratis}
                                            onChange={handleRadio}
                                        />{' '}
                                        <Span>
                                            Mau Ongkos Kirim Secara Gratis ?
                                        </Span>
                                    </WrapsField>
                                </div>
                            ) : null}
                        </div>

                        {/* Field Topic masih error */}
                        <WrapsField>
                            <Label>
                                <Span>Topic</Span>
                            </Label>
                            <div>
                                <MultiSelect
                                    options={optionsTopic}
                                    selected={topic_select}
                                    onSelectedChanged={handleSelect}
                                />
                            </div>
                        </WrapsField>

                        {/* Field Price ---- Styled masih di inject ----*/}
                        <WrapsField>
                            <Label>
                                <Span>Harga Normal</Span>
                            </Label>
                            {/*  Styled for Rp */}
                            <div
                                style={{
                                    display: 'flex',
                                    border: '1px solid #ced4da',
                                    borderRadius: '3px',
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: '#e9ecef',
                                        width: '50px',
                                    }}
                                >
                                    <div style={{ textAlign: 'center' }}>
                                        Rp
                                    </div>
                                </div>
                                <Input
                                    price
                                    type="number"
                                    name="price"
                                    id="price"
                                    value={price}
                                    onChange={onChange}
                                />
                            </div>
                        </WrapsField>

                        {/* --- Harga Penjualan */}
                        <WrapsField>
                            <Label>
                                <Span>Harga Penjualan</Span>
                            </Label>
                            {/*  Styled for Rp */}
                            <div
                                style={{
                                    display: 'flex',
                                    border: '1px solid #ced4da',
                                    borderRadius: '3px',
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: '#e9ecef',
                                        width: '50px',
                                    }}
                                >
                                    <div style={{ textAlign: 'center' }}>
                                        Rp
                                    </div>
                                </div>
                                <Input
                                    type="number"
                                    name="sale_price"
                                    id="sale_price"
                                    value={sale_price}
                                    onChange={onChange}
                                />
                            </div>
                        </WrapsField>

                        {/* --- Field Time Period --- */}

                        <WrapsField>
                            <Label>
                                <Span>Periode Waktu</Span>
                            </Label>
                            {/*  Styled for Rp */}
                            <div
                                style={{
                                    display: 'flex',
                                    border: '1px solid #ced4da',
                                    borderRadius: '3px',
                                }}
                            >
                                <Input
                                    price
                                    type="number"
                                    name="time_period"
                                    id="time_period"
                                    value={time_period}
                                    onChange={onChange}
                                />{' '}
                                <div
                                    style={{
                                        backgroundColor: '#e9ecef',
                                        width: '80px',
                                    }}
                                >
                                    <div style={{ textAlign: 'center' }}>
                                        Month
                                    </div>
                                </div>
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
                                    <option
                                        value="choose here"
                                        selected
                                        disabled
                                        hidden
                                    >
                                        Choose here
                                    </option>
                                    <option value="publish">Public</option>
                                    <option value="private">Private</option>
                                    <option value="draft">Draft</option>
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

                        {/* Filed product redirect logic for sale_method */}
                        {sale_method === 'upsale' ||
                        sale_method === 'upgrade' ||
                        sale_method === 'crossale' ? (
                            <WrapsField>
                                <Label>
                                    <Span>Product Redirect</Span>
                                </Label>
                                <div>
                                    <Input
                                        as="select"
                                        name="product_redirect"
                                        id="product_redirect"
                                        value={product_redirect}
                                        onChange={onChange}
                                    >
                                        <option
                                            value=""
                                            selected
                                            disabled
                                            hidden
                                        >
                                            Choose here
                                        </option>

                                        {/*Pekerjaan yang harus di selesaikan fetch data all name product yg sudah ada */}
                                        <option value="normal">normal</option>
                                    </Input>
                                </div>
                            </WrapsField>
                        ) : null}
                        <WrapsField>
                            {' '}
                            <SingleImage />{' '}
                        </WrapsField>
                    </Form>
                </Card>
            </SectionOne>
        </Section>
    );
}

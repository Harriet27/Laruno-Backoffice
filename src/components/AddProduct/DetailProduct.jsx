import React, { useEffect, useState } from 'react';
import MultiSelect from '@khanacademy/react-multi-select';
import { useDispatch, useSelector } from 'react-redux';

// --- Elements, Pages, Components --- //
import { fetchGetTopic, fetchPostSingleImage } from '../../store/actions';
import Styled from 'styled-components';
import Card from '../../elements/Card/Card';
import {
    optionsTime,
    DurationHour,
    DurationMinutes,
} from '../FakeData/FakeData';

import ImageProduct from './ImageProduct';
import {
    Form,
    Section,
    SectionOne,
    Span,
    WrapsField,
    Label,
    Input,
} from '../../elements/Styled/StyledTabs';
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
        // product_redirect,
        zoom_id,
        date,
        start_time,
        topic_select,
        handleSelect,
        // duration,
        weight,
        stock,
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
        handleEcommerce,
        code,
        formulir,
        setFormulir,
        arr,
        setArr,
        register,
        errors,
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
    let topicNull = [{ key: '1', value: '1', label: 'Loading...' }];
    return (
        <Section>
            <SectionOne>
                <Card isNormal style={{ width: '100%' }}>
                    <Form as="div">
                        {/* --- Field name product --- */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <WrapsField>
                                <Label>
                                    <Span>Nama Produk</Span>
                                </Label>
                                <div>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        defaultValue={name}
                                        onChange={onChange}
                                        placeholder="Product Name..."
                                        // ref={register}
                                    />
                                </div>
                                {/* <span> {errors.name?.message}</span> */}
                            </WrapsField>

                            {/* --- Product code --- */}
                            <WrapsField>
                                <Label>
                                    <Span>Produk Code</Span>
                                </Label>
                                <div>
                                    <Input
                                        type="text"
                                        name="code"
                                        id="code"
                                        defaultValue={code}
                                        onChange={onChange}
                                        placeholder="Product Code..."
                                        // ref={register}
                                    />
                                </div>
                                {/* <span> {errors.code?.message}</span> */}
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
                                        defaultValue={slug}
                                        onChange={onChange}
                                        placeholder="Product Slug..."
                                        // ref={register}
                                    />
                                </div>
                                {/* <span> {errors.slug?.message}</span> */}
                            </WrapsField>
                        </div>
                        {/* --- Field Product Category --- */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <WrapsField>
                                <Label>
                                    <Span>Product Type</Span>
                                </Label>
                                <div>
                                    <Input
                                        as="select"
                                        name="type"
                                        id="type"
                                        defaultValue={type}
                                        onChange={onChange}
                                        // ref={register}
                                    >
                                        <option value="" disabled hidden>
                                            Choose here
                                        </option>
                                        <option value="digital">
                                            Product Digital
                                        </option>
                                        <option value="webinar">Webinar</option>
                                        <option value="ecommerce">
                                            Ecommerce
                                        </option>
                                        <option value="bonus">Bonus</option>
                                    </Input>
                                </div>
                                {/* <span> {errors.name?.message}</span> */}
                            </WrapsField>
                            <WrapsField>
                                <Label>
                                    <Span>Topic</Span>
                                </Label>
                                <div>
                                    <MultiSelect
                                        options={
                                            topic === null
                                                ? topicNull
                                                : optionsTopic
                                        }
                                        selected={topic_select}
                                        onSelectedChanged={handleSelect}
                                    />
                                </div>
                            </WrapsField>

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
                                        isPrice
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
                                        <div
                                            style={{
                                                textAlign: 'center',
                                                marginTop: '3px',
                                            }}
                                        >
                                            Month
                                        </div>
                                    </div>
                                </div>
                            </WrapsField>
                        </div>
                        {/* --- Field logic in field product category ---  */}
                        <div>
                            {props.form === 'webinar' ? (
                                <div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
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

                                        <WrapsField>
                                            <Label>
                                                <Span>Start</Span>
                                            </Label>
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
                                        <WrapsField>
                                            <Label></Label>
                                            <div>
                                                <Input
                                                    style={{
                                                        height: '35px',
                                                        marginTop: '10PX',
                                                    }}
                                                    as="select"
                                                    name="start_time"
                                                    id="start_time"
                                                    value={start_time}
                                                    onChange={handleWebinar}
                                                >
                                                    {optionsTime.map((item) => {
                                                        return (
                                                            <option
                                                                key={item.value}
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
                                        <WrapsField>
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
                                                                    key={
                                                                        item.value
                                                                    }
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

                                        <WrapsField
                                            style={{ marginRight: '35%' }}
                                        >
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
                                                                    key={
                                                                        item.value
                                                                    }
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
                                                onChange={handleEcommerce}
                                            />
                                        </div>
                                    </WrapsField>
                                    <WrapsField>
                                        <Label>
                                            <Span>Stock</Span>
                                        </Label>
                                        <div>
                                            <Input
                                                type="number"
                                                name="stock"
                                                id="stock"
                                                value={stock}
                                                onChange={handleEcommerce}
                                            />
                                        </div>
                                    </WrapsField>

                                    {/* --- Radio Button 1 --- */}
                                    <WrapsField>
                                        <Input
                                            isRadioButton
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
                                            isRadioButton
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

                        {/* Field Price ---- Styled masih di inject ----*/}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
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
                                        <div
                                            style={{
                                                textAlign: 'center',
                                                marginTop: '3px',
                                            }}
                                        >
                                            Rp
                                        </div>
                                    </div>
                                    <Input
                                        isPrice
                                        type="number"
                                        name="price"
                                        id="price"
                                        value={price}
                                        onChange={onChange}
                                    />
                                </div>
                            </WrapsField>

                            {/* --- Harga Penjualan */}
                            <WrapsField style={{ marginRight: '35%' }}>
                                <Label>
                                    <Span>Harga Promo</Span>
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
                                        <div
                                            style={{
                                                textAlign: 'center',
                                                marginTop: '3px',
                                            }}
                                        >
                                            Rp
                                        </div>
                                    </div>
                                    <Input
                                        isPrice
                                        type="number"
                                        name="sale_price"
                                        id="sale_price"
                                        value={sale_price}
                                        onChange={onChange}
                                    />
                                </div>
                            </WrapsField>
                        </div>
                        {/* --- Field Time Period --- */}

                        {/* Field Status */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <WrapsField>
                                <Label>
                                    <Span>Status</Span>
                                </Label>
                                <div>
                                    <Input
                                        as="select"
                                        name="visibility"
                                        id="visibility"
                                        defaultValue={visibility}
                                        onChange={onChange}
                                        // ref={register}
                                    >
                                        <option value="" disabled hidden>
                                            Choose here
                                        </option>
                                        <option value="publish">Public</option>
                                        <option value="private">Private</option>
                                        <option value="draft">Draft</option>
                                    </Input>
                                </div>
                                {/* <span> {errors.visibility?.message}</span> */}
                            </WrapsField>

                            {/* Field UpSale */}
                            <WrapsField style={{ marginRight: '35%' }}>
                                <Label>
                                    <Span>Method Sale</Span>
                                </Label>
                                <div>
                                    <Input
                                        as="select"
                                        name="sale_method"
                                        id="sale_method"
                                        defaultValue={sale_method}
                                        onChange={onChange}
                                        // ref={register}
                                    >
                                        <option value="" disabled hidden>
                                            Choose here
                                        </option>
                                        <option value="normal">Normal</option>
                                        <option value="upsale">Upsale</option>
                                        <option value="upgrade">Upgrade</option>
                                        <option value="crossale">
                                            Crossale
                                        </option>
                                    </Input>
                                </div>
                                {/* <span> {errors.sale_method?.message}</span> */}
                            </WrapsField>
                        </div>
                        <WrapsField>
                            {/* image product */}
                            <ImageProduct
                                arr={arr}
                                setArr={setArr}
                                formulir={formulir}
                                setFormulir={setFormulir}
                            />
                        </WrapsField>
                    </Form>
                </Card>
            </SectionOne>
        </Section>
    );
}

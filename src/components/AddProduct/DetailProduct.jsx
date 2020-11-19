import React, { useEffect, useState } from 'react';
import Select from 'react-select';
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
    isTopic,
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
    // eslint-disable-next-line
  }, [dispatch]);

  // --- optionsTopic for value select topic --- //
  const data = [{ key: 1, value: 'Loading', label: 'Loading...' }];
  let options =
    topic === null
      ? data.map((item) => {
          return {
            item: item.key,
            value: item.value,
            label: item.label,
            isDisabled: true,
          };
        })
      : topic.data.map((item) => {
          return { key: item._id, value: item._id, label: item.name };
        });

  return (
    <Section>
      <SectionOne>
        <Card isNormal style={{ width: '100%' }}>
          <Form as="div">
            {/* --- Field name product --- */}
            <div style={Styles.FlexBetween}>
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
                  />
                </div>
              </WrapsField>

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
                  />
                </div>
              </WrapsField>

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
                  />
                </div>
              </WrapsField>
            </div>

            <div style={Styles.FlexBetween}>
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
                  >
                    <option value="" disabled hidden>
                      Choose here
                    </option>
                    <option value="digital">Product Digital</option>
                    <option value="webinar">Webinar</option>
                    <option value="ecommerce">Ecommerce</option>
                    <option value="bonus">Bonus</option>
                  </Input>
                </div>
              </WrapsField>
              <WrapsField>
                <Label>
                  <Span>Topic</Span>
                </Label>
                <div>
                  <Select
                    isMulti
                    name="colors"
                    value={isTopic || ''}
                    options={options}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleSelect}
                  />
                </div>
              </WrapsField>

              <WrapsField>
                <Label>
                  <Span>Periode Waktu</Span>
                </Label>
                {/*  Styled for Rp */}
                <div style={Styles.BorderPriceMonth}>
                  <Input
                    isPrice
                    type="number"
                    name="time_period"
                    id="time_period"
                    value={time_period}
                    onChange={onChange}
                  />
                  <div style={Styles.PeriodMonth}>
                    <div style={Styles.MarginPriceMonth}>Month</div>
                  </div>
                </div>
              </WrapsField>
            </div>
            {/* --- Field logic in field product category ---  */}
            <div>
              {props.form === 'webinar' ? (
                <div>
                  <div style={Styles.FlexBetween}>
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
                          style={Styles.StartTime}
                          as="select"
                          name="start_time"
                          id="start_time"
                          value={start_time}
                          onChange={handleWebinar}
                        >
                          {optionsTime.map((item) => {
                            return (
                              <option key={item.value} value={item.value}>
                                {item.label}
                              </option>
                            );
                          })}
                        </Input>
                      </div>
                    </WrapsField>
                  </div>

                  <Label>
                    <Span>Duration</Span>
                  </Label>

                  <div style={Styles.FlexBetween}>
                    <WrapsField>
                      <div>
                        <Input
                          as="select"
                          name="hours"
                          id="duration"
                          value={duration_hours}
                          onChange={handleDuration}
                        >
                          {DurationHour.map((item) => {
                            return (
                              <option key={item.value} value={item.value}>
                                {item.label}
                              </option>
                            );
                          })}
                        </Input>
                      </div>
                    </WrapsField>

                    <WrapsField style={Styles.MarginRight}>
                      <div>
                        <Input
                          as="select"
                          name="minutes"
                          id="minutes"
                          value={duration_minute}
                          onChange={handleDuration}
                        >
                          {DurationMinutes.map((item) => {
                            return (
                              <option key={item.value} value={item.value}>
                                {item.label}
                              </option>
                            );
                          })}
                        </Input>
                      </div>
                    </WrapsField>
                  </div>
                </div>
              ) : null}

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
                    <Span>Mau Ongkos Kirim Secara Gratis ?</Span>
                  </WrapsField>
                </div>
              ) : null}
            </div>

            <div style={Styles.FlexBetween}>
              <WrapsField>
                <Label>
                  <Span>Harga Normal</Span>
                </Label>

                <div style={Styles.BorderPriceMonth}>
                  <div style={Styles.Price}>
                    <div style={Styles.MarginPriceMonth}>Rp</div>
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

              <WrapsField style={Styles.MarginRight}>
                <Label>
                  <Span>Harga Promo</Span>
                </Label>
                {/*  Styled for Rp */}
                <div style={Styles.BorderPriceMonth}>
                  <div style={Styles.Price}>
                    <div style={Styles.MarginPriceMonth}>Rp</div>
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

            <div style={Styles.FlexBetween}>
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
                  >
                    <option value="" disabled hidden>
                      Choose here
                    </option>
                    <option value="publish">Public</option>
                    <option value="private">Private</option>
                    <option value="draft">Draft</option>
                  </Input>
                </div>
              </WrapsField>

              <WrapsField style={Styles.MarginRight}>
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
                    <option value="crossale">Crossale</option>
                  </Input>
                </div>
              </WrapsField>
            </div>
            <WrapsField>
              <Label>
                <Span>Image Product</Span>
              </Label>
              <div>
                <ImageProduct
                  arr={arr}
                  setArr={setArr}
                  formulir={formulir}
                  setFormulir={setFormulir}
                />
              </div>
            </WrapsField>
            <>
              <div style={{ display: 'flex' }}>
                {arr.image_url.map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{ width: '125px', marginRight: '10px' }}
                    >
                      <img width="100%" src={item} alt={item} />
                    </div>
                  );
                })}
              </div>
            </>
          </Form>
        </Card>
      </SectionOne>
    </Section>
  );
}

const Styles = {
  FlexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  BorderPriceMonth: {
    display: 'flex',
    border: '1px solid #ced4da',
    borderRadius: '3px',
  },
  PeriodMonth: {
    backgroundColor: '#e9ecef',
    width: '80px',
  },
  MarginPriceMonth: {
    textAlign: 'center',
    marginTop: '3px',
  },
  Price: {
    backgroundColor: '#e9ecef',
    width: '50px',
  },
  StartTime: {
    height: '35px',
    marginTop: '10PX',
  },
  MarginRight: {
    marginRight: '0',
  },
};

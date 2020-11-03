import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Form,
    Section,
    SectionOne,
    Span,
    WrapsField,
    Label,
    Input,
} from '../../elements/Styled/StyledTabs';
import { fetchGetTopic, fetchGetProduct } from '../../store/actions';
import MultiSelect from '@khanacademy/react-multi-select';
import Card from '../../elements/Card/Card';
export default function Detail(props) {
    const {
        onChange,
        name,
        isFulfillment,
        visibility,
        handleRadio,
        checkedFalse,
        checkedTrue,
        form,
        checked,
        setChecked,
        handleSelectTopic,
        topic_select,
        handleSelectProduct,
        product_select,
    } = props;
    const dispatch = useDispatch();
    const topic = useSelector((state) => state.topic.getTopic);
    const product = useSelector((state) => state.product.getProduct);
    console.log(product, 'product di dalam blogg');
    useEffect(() => {
        dispatch(fetchGetTopic());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchGetProduct());
    }, [dispatch]);
    let optionsTopic =
        topic !== null &&
        topic.data.map((item) => {
            return { key: item._id, value: item._id, label: item.name };
        });
    let optionsProduct =
        product !== null &&
        product.data.map((item) => {
            return { key: item._id, value: item._id, label: item.name };
        });
    let SelectNull = [{ key: '1', value: '1', label: 'Loading...' }];

    return (
        <Section>
            <SectionOne>
                <Card isNormal style={{ width: '100%' }}>
                    <Form>
                        {/* --- Field name product --- */}

                        <WrapsField fullwidth>
                            <Label>
                                <Span>Tittle Content</Span>
                            </Label>
                            <div>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={name}
                                    onChange={onChange}
                                    placeholder="Title Content..."
                                />
                            </div>
                        </WrapsField>

                        <WrapsField fullwidth>
                            <Label>
                                <Span>Status</Span>
                            </Label>
                            <div>
                                <Input
                                    as="select"
                                    name="status"
                                    id="status"
                                    value={visibility}
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
                        {/* test */}

                        <Label>
                            <Span>Content Type</Span>
                        </Label>
                        <div style={{ display: 'flex' }}>
                            <WrapsField>
                                <Input
                                    isRadioButton
                                    type="radio"
                                    name="content-type"
                                    id="fulfillment"
                                    value="true"
                                    checked={checkedTrue}
                                    onChange={handleRadio}
                                />{' '}
                                <label htmlFor="fulfillment">Fulfillment</label>
                            </WrapsField>
                            {/* blog */}
                            <WrapsField>
                                <Input
                                    isRadioButton
                                    type="radio"
                                    name="content_type"
                                    id="blog"
                                    value="false"
                                    checked={checkedFalse}
                                    onChange={handleRadio}
                                />{' '}
                                <label htmlFor="blog">Blog</label>
                            </WrapsField>

                            {/* Radio Button 2 --- */}
                        </div>

                        {/* product dan module */}
                        {form.isFulfillment === false ? (
                            <>
                                <WrapsField fullwidth>
                                    <Label>
                                        <Span>Product</Span>
                                    </Label>
                                    <div>
                                        <MultiSelect
                                            options={
                                                product === null
                                                    ? SelectNull
                                                    : optionsProduct
                                            }
                                            selected={product_select}
                                            onSelectedChanged={
                                                handleSelectProduct
                                            }
                                        />
                                    </div>
                                </WrapsField>
                                <WrapsField fullwidth>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="module"
                                            checked={checked}
                                            onChange={() =>
                                                setChecked(!checked)
                                            }
                                            // onChange={handleCheckbox}
                                            // required
                                        />
                                        Click to active Module
                                    </label>
                                </WrapsField>
                            </>
                        ) : null}

                        <WrapsField fullwidth>
                            <Label>
                                <Span>Topic</Span>
                            </Label>
                            <div>
                                <MultiSelect
                                    options={
                                        topic === null
                                            ? SelectNull
                                            : optionsTopic
                                    }
                                    selected={topic_select}
                                    onSelectedChanged={handleSelectTopic}
                                />
                            </div>
                        </WrapsField>
                    </Form>
                </Card>
            </SectionOne>
        </Section>
    );
}

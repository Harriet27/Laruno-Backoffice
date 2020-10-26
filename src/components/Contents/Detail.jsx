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
    const { onChange, name, type, visibility } = props;
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
                                <Span>Content Type</Span>
                            </Label>
                            <div>
                                <Input
                                    as="select"
                                    name="isFulfillment"
                                    id="isFulFillment"
                                    value={type}
                                    onChange={onChange}
                                >
                                    <option value="" disabled hidden>
                                        Choose here
                                    </option>
                                    <option value="blog">Blog</option>
                                    <option value="fulfillment">
                                        Fulfillment
                                    </option>
                                </Input>
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

                        {/* product dan module */}
                        <WrapsField fullwidth>
                            <Label>
                                <Span>Product</Span>
                            </Label>
                            <div>
                                <Input
                                    as="select"
                                    name="status"
                                    id="status"
                                    // value={visibility}
                                    // onChange={onChange}
                                >
                                    <option value="" disabled hidden>
                                        Choose here
                                    </option>
                                    {product === null ? (
                                        <option value="publish">
                                            Loading...
                                        </option>
                                    ) : (
                                        product.data.map((item) => {
                                            return (
                                                <option
                                                    key={item._id}
                                                    value={item.name}
                                                >
                                                    {item.name}
                                                </option>
                                            );
                                        })
                                    )}
                                </Input>
                            </div>
                        </WrapsField>
                        <WrapsField fullwidth>
                            {' '}
                            <label>
                                <input
                                    type="checkbox"
                                    name="is_active"
                                    id="is_active"
                                    // value={form.is_active}
                                    // onChange={handleCheckbox}
                                    // required
                                />
                                Click to active Module
                            </label>
                        </WrapsField>
                        <WrapsField fullwidth>
                            {/* <MultiSelect
                                options={optionsTopic}
                                selected={topic_select}
                                onSelectedChanged={handleSelect}
                            /> */}
                        </WrapsField>
                    </Form>
                </Card>
            </SectionOne>
        </Section>
    );
}

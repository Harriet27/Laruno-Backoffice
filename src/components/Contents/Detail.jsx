import React from 'react';
import {
    Form,
    Section,
    SectionOne,
    Span,
    WrapsField,
    Label,
    Input,
} from '../../elements/Styled/StyledTabs';
import Card from '../../elements/Card/Card';
export default function Detail() {
    return (
        <Section>
            <SectionOne>
                <Card isNormal style={{ width: '100%' }}>
                    <Form>
                        {/* --- Field name product --- */}

                        <WrapsField>
                            <Label>
                                <Span>Tittle Content</Span>
                            </Label>
                            <div>
                                <Input
                                    type="text"
                                    name="title"
                                    id="title"
                                    // value={name}
                                    // onChange={onChange}
                                    placeholder="Title Content..."
                                />
                            </div>
                        </WrapsField>

                        <WrapsField>
                            <Label>
                                <Span>Product Type</Span>
                            </Label>
                            <div>
                                <Input
                                    as="select"
                                    name="type"
                                    id="type"
                                    // value={type}
                                    // onChange={onChange}
                                >
                                    <option value="" disabled hidden>
                                        Choose here
                                    </option>
                                    <option value="digital">
                                        Product Digital
                                    </option>
                                    <option value="webinar">Webinar</option>
                                    <option value="ecommerce">Ecommerce</option>
                                    <option value="bonus">Bonus</option>
                                </Input>
                            </div>
                        </WrapsField>

                        <WrapsField>
                            <Label>
                                <Span>Status</Span>
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
                                    <option value="publish">Public</option>
                                    <option value="private">Private</option>
                                    <option value="draft">Draft</option>
                                </Input>
                            </div>
                        </WrapsField>
                    </Form>
                </Card>
            </SectionOne>
        </Section>
    );
}

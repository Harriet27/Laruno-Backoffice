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
import ReactQuillTest from '../AddProduct/ReactQuill';
export default function Contents(props) {
    return (
        <>
            <Section>
                <SectionOne>
                    <Card isNormal style={{ width: '100%' }}>
                        <Form>
                            <WrapsField>
                                <Label>
                                    <Span>Tags</Span>
                                </Label>
                                <div>
                                    <Input
                                        type="text"
                                        name="title"
                                        id="title"
                                        // value={name}
                                        // onChange={onChange}
                                        placeholder="Tags..."
                                    />
                                </div>
                            </WrapsField>
                            <>{props.children}</>
                            <Label>
                                <Span>Content</Span>
                            </Label>
                            <ReactQuillTest
                                value={props.value}
                                setValue={props.setValue}
                            />
                        </Form>
                    </Card>
                </SectionOne>
            </Section>
        </>
    );
}

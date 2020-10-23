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
export default function Contents() {
    return (
        <>
            <Section>
                <SectionOne>
                    <Card isNormal style={{ width: '100%' }}>
                        <Form></Form>
                    </Card>
                </SectionOne>
            </Section>
        </>
    );
}

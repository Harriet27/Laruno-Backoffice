import React from 'react';
import DataTopic from '../../components/Topic/DataTopic';
import Styled from 'styled-components';

// --- Styled components --- //

const Section = Styled.section`
margin: 0 50px;
`;
// --- styled components --- //
export default function Topic() {
    return (
        <Section>
            <DataTopic />
        </Section>
    );
}

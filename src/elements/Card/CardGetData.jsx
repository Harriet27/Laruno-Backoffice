import React from 'react';
import Card from './Card';
import Styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Wraps = Styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100%;
`;
const WrapRow = Styled.div`
display: flex;
flex-direction: row;

`;
export default function CardGetData(props) {
    return (
        <Card isBold>
            <Wraps>
                <div
                    style={{
                        fontSize: '36px',
                        color: '#F98A12',
                        fontWeight: 'Bold',
                    }}
                >
                    {props.number}
                </div>
                <WrapRow>
                    <div style={{ marginRight: '10px' }}>
                        <FontAwesomeIcon icon={props.icon} />
                    </div>
                    <span>{props.text}</span>
                </WrapRow>
            </Wraps>
        </Card>
    );
}

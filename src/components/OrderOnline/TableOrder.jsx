import React from 'react';
import { Table } from 'reactstrap';
import Card from '../../elements/Card/Card';
import Styled from 'styled-components';

// --- Styled Components --- //

const Th = Styled.th`
font-size:  ${(props) => (props.td ? '16px' : '20px')};
font-weight: ${(props) => (props.td ? 'normal' : '600')};
text-align: center;
`;

// --- Styled Components --- //

const TableOrder = (props) => {
    return (
        <Card isNormal>
            <Table borderless>
                <thead>
                    <tr>
                        <Th>
                            <input type="checkbox" />
                        </Th>
                        <Th>Name</Th>
                        <Th>City</Th>
                        <Th>Status</Th>
                        <Th>Payment status</Th>
                        <Th>Date</Th>
                        <Th>Gross Revenue</Th>
                        <Th>Follow Up</Th>
                        <Th>Actions</Th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <Th scope="row">
                            <input type="checkbox" />
                        </Th>
                        <Th as="td" td>
                            One
                        </Th>
                        <Th as="td" td>
                            Two
                        </Th>
                        <Th as="td" td>
                            Three
                        </Th>
                        <Th as="td" td>
                            Four
                        </Th>
                        <Th as="td" td>
                            Five
                        </Th>
                        <Th as="td" td>
                            Six
                        </Th>
                        <Th as="td" td>
                            Seven
                        </Th>
                        <Th as="td" td>
                            Eight
                        </Th>
                    </tr>
                    <tr>
                        <Th scope="row">
                            <input type="checkbox" />
                        </Th>
                        <Th as="td" td>
                            One
                        </Th>
                        <Th as="td" td>
                            Two
                        </Th>
                        <Th as="td" td>
                            Three
                        </Th>
                        <Th as="td" td>
                            Four
                        </Th>
                        <Th as="td" td>
                            Five
                        </Th>
                        <Th as="td" td>
                            Six
                        </Th>
                        <Th as="td" td>
                            Seven
                        </Th>
                        <Th as="td" td>
                            Eight
                        </Th>
                    </tr>
                    <tr>
                        <Th scope="row">
                            <input type="checkbox" />
                        </Th>
                        <Th as="td" td>
                            One
                        </Th>
                        <Th as="td" td>
                            Two
                        </Th>
                        <Th as="td" td>
                            Three
                        </Th>
                        <Th as="td" td>
                            Four
                        </Th>
                        <Th as="td" td>
                            Five
                        </Th>
                        <Th as="td" td>
                            Six
                        </Th>
                        <Th as="td" td>
                            Seven
                        </Th>
                        <Th as="td" td>
                            Eight
                        </Th>
                    </tr>
                </tbody>
            </Table>
        </Card>
    );
};

export default TableOrder;
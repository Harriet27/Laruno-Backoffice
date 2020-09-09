import React from "react";
import Styled from "styled-components";

// Styled components
const FooterStyled = Styled.footer`
background-color: rgba(0, 0, 0, 0.1);
bottom: 0;
padding: 10px 0 0 0;
position: fixed;
width: 100%;
`;
const Paragraph = Styled.p`
text-align: center;
`;
export default function Footer() {
    return (
        <FooterStyled>
            <Paragraph>Copyright 2020</Paragraph>
        </FooterStyled>
    );
}

import React from "react";
import Card from "./Card";
import Styled from "styled-components";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
export default function CardGetData() {
    return (
        <Card
            isBold
            style={{
                width: "450px",
                height: "150px",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Wraps>
                <h1>0</h1>
                <WrapRow>
                    <div>
                        <FontAwesomeIcon icon={faCoffee} />
                    </div>
                    <span>Text Disni</span>
                </WrapRow>
            </Wraps>
        </Card>
    );
}

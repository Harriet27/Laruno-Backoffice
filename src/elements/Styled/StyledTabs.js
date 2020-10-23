import Styled from 'styled-components';

const Input = Styled.input`
    width: 100%;
    padding: .375rem;
    font-size: 14px;
    font-weight: 400;
    color: #495057;
    border-radius: ${(props) => (props.price ? '0' : '3px')};
    background-color: #FCFCFC;
    border:${(props) => (props.price ? '0' : '1px solid #ced4da')};
    &:focus{
    outline: none !important;
    border:1px solid #66AFE9;
    }
`;

const Section = Styled.section`
    display: flex;
    padding: 50px 100px;
    width: 100%;
    line-height: 1.5;
    @media (max-width: 800px) {
        padding: 20px 40px;
          }
`;
const Label = Styled.label`
    
`;
const WrapsField = Styled.div`
    margin-bottom: 25px;
    width: ${(props) => (props.dividedByTwo ? '45%' : '30%')}
`;
const Span = Styled.span`
    font-weight: bold;
    color: #656565;
    font-size: 16px;
`;

const SectionOne = Styled.div`
    // display: flex;
    width: 100%;
    @media (max-width: 800px) {
        width: 100%
    }
`;

const Form = Styled.div`
    padding: 50px 40px;
    @media (max-width: 800px) {
        padding: 20px;
    }
`;

export { Form, Section, SectionOne, Span, WrapsField, Label, Input };

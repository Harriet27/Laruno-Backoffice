import Styled from 'styled-components';

const [sm, md, lg] = ['16px', '18px', '20px'];
const Th = Styled.th`
    font-size:  ${(props) => (props.td ? `${sm}` : `${md}`)};
    font-weight: ${(props) => (props.td ? 'normal' : '600')};
    text-align: left;
`;
const Input = Styled.input`
    padding: .375rem;
    font-size: ${sm};
    font-weight: 400;
    color: #495057;
    border-radius: 3px;
    background-color: #FCFCFC;
    border: 1px solid #ced4da;
    &:focus{
    outline: none !important;
    border:1px solid #66AFE9;
    }
`;
const SectionOne = Styled.div`
    margin: ${lg} 0;
    display: flex;
    justify-content: space-between;
`;

export { sm, md, lg, Input, Th, SectionOne };

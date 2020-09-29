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
    margin-left: ${(props) => (props.checkbox ? '9px' : null)};
    transform: ${(props) => (props.checkbox ? 'scale(1.2)' : null)};
    &:focus{
    outline: none !important;
    border:1px solid #66AFE9;
    }
    &:hover{
        cursor: ${(props) => (props.checkbox ? 'pointer' : 'default')}
    }
`;
const SectionOne = Styled.div`
    margin: ${lg} 0;
    display: flex;
    justify-content: space-between;
`;

export { sm, md, lg, Input, Th, SectionOne };

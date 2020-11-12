import Styled from 'styled-components';

const Icon = Styled.i`
background: none;
color:#d7d7da;
`;
const IconSpan = Styled.span`
color: white;
position: relative;
top: -6px;
left: -18px;
font-size: 14px;
`;

const [md, lg] = ['16px', '18px', '20px'];
const Input = Styled.input`
    width: 100%;
    padding: 10px;
    font-size: ${md};
    font-weight: 400;
    color:${(props) => (props.isButton ? 'white' : '#495057')} ;
    border-radius: 3px;
    background-color: ${(props) => (props.isButton ? '#0098DA' : '#FCFCFC')};
    border: 1px solid #ced4da;
    &:focus{
    outline: none !important;
    border:1px solid #66AFE9;
    }
`;

const WrapForm = Styled.div`
    width: 100%;
    margin-bottom: ${lg};
`;

const Span = Styled.span`
color: #c7254e;
background-color: #f9f2f4;
`;

export { Icon, IconSpan, Span, WrapForm, Input };

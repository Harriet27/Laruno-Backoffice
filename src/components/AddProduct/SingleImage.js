import React from 'react';
import Styled from 'styled-components';
import { Spinner } from 'reactstrap';

const LabelImage = Styled.label`
border: 1px solid #ccc;
display: inline-block;
padding: 6px 12px;
cursor: pointer;
background: rgb(0,152,218,0.9);
color: white;
border-radius: 3px;
&:hover{
  background: rgb(0,152,218);
}
`;
export default function SingleImage(props) {
  const { id, onChange, isLoading } = props;

  return (
    <React.Fragment>
      <LabelImage>
        <input
          style={{ display: 'none' }}
          disabled={isLoading}
          type="file"
          name="file"
          id={id}
          onChange={onChange}
          accept="image/x-png,image/gif,image/jpeg"
        />
        <div style={{ width: '100px', textAlign: 'center' }}>
          {isLoading ? <Spinner size="sm" /> : 'Upload'}
        </div>
      </LabelImage>
      {/* <button onClick={onSubmit}>Upload</button> */}
    </React.Fragment>
  );
}

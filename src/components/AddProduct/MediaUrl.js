import React from 'react';

import Styled from 'styled-components';

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
export default function MediaUrl(props) {
  const { id, onChange, isLoading } = props;

  return (
    <React.Fragment>
      <LabelImage>
        <input
          style={{ display: 'none' }}
          type="file"
          name="file"
          id={id}
          onChange={onChange}
          disabled={isLoading}
          accept="video/mp4,video/x-m4v,video/*,image/x-png,image/gif,image/jpeg"
        />
        {isLoading ? 'Loading...' : 'Upload Media'}
      </LabelImage>
    </React.Fragment>
  );
}

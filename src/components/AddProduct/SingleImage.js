import React from 'react';

export default function SingleImage(props) {
  const { id, onChange, onSubmit } = props;

  return (
    <React.Fragment>
      <input
        type="file"
        name="file"
        id={id}
        onChange={onChange}
        accept="image/x-png,image/gif,image/jpeg"
      />
      <button onClick={onSubmit}>Upload</button>
    </React.Fragment>
  );
}

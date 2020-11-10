import React from 'react';

export default function MediaUrl(props) {
  const { id, onChange, onSubmit } = props;

  return (
    <React.Fragment>
      <input
        type="file"
        name="file"
        id={id}
        onChange={onChange}
        accept="video/mp4,video/x-m4v,video/*,image/x-png,image/gif,image/jpeg"
      />
      <button onClick={onSubmit}>Upload</button>
    </React.Fragment>
  );
}

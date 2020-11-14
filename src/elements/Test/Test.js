import React from 'react';

const handleChange = (e) => {
  let a = e.target.id;
  // let b = (e.target.type = 'text');
  e.target.type = 'text';
  e.target.type = 'file';

  // console.log({ a, b, c });
};
export default function Test() {
  return (
    <div>
      <input type="file" onChange={handleChange} />
    </div>
  );
}

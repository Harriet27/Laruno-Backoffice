import React, { useState } from 'react';

export default function Test() {
  const [fields, setFields] = useState([{ product_id: '' }]);
  const handleChange = (event, index) => {
    const values = [...fields];

    values[index].product_id = event.target.value;

    setFields(values);
  };

  function handleAdd() {
    //  menambahkan field ke dalam value input terbaru
    const values = [...fields];
    values.push({ product_id: '' });

    setFields(values);
  }
  console.log(fields, 'fields');
  return (
    <div>
      {fields.map((item, index) => {
        return (
          <input
            type="text"
            onChange={(event) => {
              handleChange(event, index);
            }}
            value={item.product_id}
          />
        );
      })}
      <button onClick={handleAdd}>add</button>
    </div>
  );
}

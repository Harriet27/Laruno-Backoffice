import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SingleImage from '../../AddProduct/SingleImage';
export default function PopUpFbAds() {
  const [form, setForm] = useState({
    checked: false,
  });
  console.log({ form }, 'FORM');
  const toggleChecked = () => {
    return setForm({ ...form, checked: !form.checked });
  };
  return (
    <div style={{ margin: '20px' }}>
      <div>
        <FormControlLabel
          control={<Switch checked={form.checked} onChange={toggleChecked} />}
          label="Status"
        />
      </div>

      <div>
        <SingleImage
          style={{ width: '30%' }}
          id="ads_image"
          // onChange={(e) => handleChange(e, 'ads_image')}
          // isLoading={state.isLoading}
        />
      </div>

      <input style={{ width: '60%' }} type="text" placeholder="Link Url" />

      <div>
        <label>
          <input type="checkbox" /> Blog
        </label>
        <label>
          <input type="checkbox" />
          Fulfillment
        </label>
      </div>
      <label>Type</label>
      <select
        as="select"
        name="type"
        id="type"
        // defaultValue={form.type}
        // onChange={handleChange}
      >
        <option value="" disabled hidden>
          Choose here
        </option>
        <option value="Product">Product</option>
        <option value="Payment">Payment</option>
        <option value="User">User</option>
        <option value="Event">Event</option>
      </select>
    </div>
  );
}

import React, { useState } from 'react';

import { fetchPostMultipleImage } from '../../store/actions';
import SingleImage from './SingleImage';
import { useDispatch } from 'react-redux';

export default function ImageProduct(props) {
  const dispatch = useDispatch();
  const { arr, setArr, formulir, setFormulir } = props;

  const [state, setState] = useState({
    isLoading: false,
  });
  const handleChange = (e, id) => {
    let image = formulir.image;
    let field = e.target.id;
    image[field] = e.target.files[0];
    setFormulir({ image });
    setState({
      isLoading: true,
    });
    dispatch(
      fetchPostMultipleImage({
        formulir,
        e,
        id,
        setFormulir,
        arr,
        setArr,
        setState,
      })
    );
    e.target.type = 'text';
    e.target.type = 'file';
  };
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <React.Fragment>
      <SingleImage
        id="image_url"
        onChange={(e) => handleChange(e, 'image_url')}
        isLoading={state.isLoading}
        // onSubmit={(e) => handleSubmit(e, 'image_url')}
      />
      {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {arr.image_url.map((item, index) => {
          return (
            <div key={index} style={{ width: '100px' }}>
              <img width="100%" src={item} alt={item} />
            </div>
          );
        })}
      </div> */}
    </React.Fragment>
  );
}

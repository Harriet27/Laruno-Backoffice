import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchShowTopic,
  fetchUpdateTopic,
  fetchPostSingleImage,
} from '../../store/actions';
import { Input } from '../../elements/Styled/StyledForm';
import SingleImage from '../AddProduct/SingleImage';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from 'reactstrap';
import { CircularProgress } from '@material-ui/core';
export default function InputUpdateTopic(props) {
  // ---Input value --- //
  const InputValue = (props) => {
    const { name, icon, id, topic } = props;
    const dispatch = useDispatch();
    const [form, setForm] = useState({
      name: name || '',
      icon: '',
    });
    const [state, setState] = useState({
      isLoading: false,
      isUpdate: false,
    });
    console.log(form, 'form');
    const handleSubmit = (event) => {
      setState({
        isUpdate: true,
      });
      dispatch(fetchUpdateTopic({ form, id, setState }));
    };
    const handleChange = (event) => {
      setForm({ ...form, [event.target.name]: event.target.value });
    };

    // --- Image --- //
    const [formulir, setFormulir] = useState({
      image: { icon: icon },
    });
    form.icon = formulir.image.icon;

    // --- HandleChange upload Image --- //
    const handleChangeImage = (e, id) => {
      let image = formulir.image;
      let field = e.target.id;
      image[field] = e.target.files[0];
      setFormulir({ image });

      setState({
        isLoading: true,
      });
      dispatch(
        fetchPostSingleImage({ formulir, e, id, setFormulir, setState })
      );
      e.target.type = 'text';
      e.target.type = 'file';
    };

    console.log(formulir.image.icon, 'image icon');
    return (
      <>
        <Input
          style={{ width: '100%', marginBottom: '10px' }}
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <SingleImage
          id="icon"
          onChange={(e) => handleChangeImage(e, 'icon')}
          isLoading={state.isLoading}
        />

        <div
          style={{
            width: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {typeof formulir.image.icon === 'object' ||
          formulir.image.icon === false ? null : (
            <img
              width="100%"
              src={formulir.image.icon}
              alt={formulir.image.icon}
            />
          )}
        </div>
        <ModalFooter>
          <Button
            color="white"
            style={{ border: '1px solid gray' }}
            onClick={props.toggle}
          >
            Cancel
          </Button>{' '}
          <Button color="primary" onClick={handleSubmit}>
            <div style={{ width: '100px', textAlign: 'center' }}>
              {state.isUpdate ? (
                <Spinner style={{ width: '1.5rem', height: '1.5rem' }} />
              ) : (
                'Update'
              )}
            </div>
          </Button>{' '}
        </ModalFooter>
      </>
    );
  };

  // ---- Finish ----//
  const dispatch = useDispatch();
  const { id, toggle, topic } = props;
  // const topic = useSelector((state) => state.topic.showTopic);
  console.log(topic, 'update tpic by id');

  // useEffect(() => {
  //   dispatch(fetchShowTopic(id));
  //   // eslint-disable-next-line
  // }, [dispatch]);

  return (
    <section>
      {topic === null ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <InputValue
          name={topic.name}
          icon={topic.icon}
          id={id}
          toggle={toggle}
        />
      )}
    </section>
  );
}

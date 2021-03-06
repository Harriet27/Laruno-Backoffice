import Card from '../../elements/Card/Card';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPostDynamicVideo } from '../../store/actions';
import Styled from 'styled-components';
import SingleImage from '../AddProduct/SingleImage';
import { Span, Input } from '../../elements/Styled/StyledTabs';
import VideoAndPodcast from './VideoAndPodcast';

const ButtonModal = Styled.button`
    background-color: ${(props) => (props.delete ? 'red' : '#0098DA')};
    color: white;
    width: 100%;
    padding: 5px;
    font-size: 18px;
    font-weight: 400;
    border-radius: 3px;
    border: 1px solid #ced4da;
    &:focus{
        outline: none !important;
        border:1px solid #66AFE9;
    }
`;

const WrapsField = Styled.div`
    margin-bottom: 25px;
    width: ${(props) => (props.dividedByTwo ? '45%' : null)}
`;

export default function DynamicFieldsContents(props) {
  const dispatch = useDispatch();
  const {
    handleAdd,
    handleChange,
    handleRemove,
    formulir,
    setFormulir,
    sectionAdd,
    setSectionAdd,
  } = props;

  const [state, setState] = useState({
    isLoading: false,
  });
  const handleChangeImage = (e, id, index) => {
    let image = formulir.image;
    let field = e.target.id;

    image[field] = e.target.files[0];
    setFormulir({ image });
    setState({
      isLoading: true,
    });
    dispatch(
      fetchPostDynamicVideo({
        formulir,
        e,
        id,
        setFormulir,
        sectionAdd,
        setSectionAdd,
        index,
        setState,
      })
    );
    e.target.type = 'text';
    e.target.type = 'file';
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }} className="App">
        <div></div>
        {/* --- Testing --- */}
        <div name="test">
          {sectionAdd.map((field, idx) => {
            return (
              <WrapsField key={`${field}-${idx}`}>
                <div>
                  <Input
                    // width="35%"
                    type="text"
                    name={`one-${idx}`}
                    placeholder="Video Url..."
                    value={field.url}
                    onChange={(e) => handleChange(idx, e)}
                  />

                  <VideoAndPodcast
                    // style={{ width: '10%' }}
                    id={`video_section_${idx}`}
                    onChange={(e) =>
                      handleChangeImage(e, `video_section_${idx}`, idx)
                    }
                    isLoading={state.isLoading}
                    accept="video/mp4,video/x-m4v,video/*"
                  />
                  {/* <img
                    src={sectionAdd[idx].video}
                    alt={sectionAdd[idx].video}
                  /> */}
                  <ButtonModal
                    style={{ width: '10%' }}
                    delete
                    type="button"
                    onClick={() => handleRemove(idx)}
                  >
                    x
                  </ButtonModal>
                </div>
              </WrapsField>
            );
          })}
        </div>
        <ButtonModal type="button" onClick={() => handleAdd()}>
          Add Video section
        </ButtonModal>
      </div>
    </>
  );
}

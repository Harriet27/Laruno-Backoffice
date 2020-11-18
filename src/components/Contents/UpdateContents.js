import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUpdateContents, fetchShowContents } from '../../store/actions';
import UpdateContentsId from './UpdateContentsId';
export default function UpdateContents() {
  const dispatch = useDispatch();
  const contents = useSelector((state) => state.contents.showContents);
  let { id } = useParams();
  useEffect(() => {
    dispatch(fetchShowContents(id));
  }, [dispatch]);
  console.log({ id, contents }, 'id');
  const UpdateContentsRender = (props) => {
    const { name, cover_img, isBlog, id } = props;
    return (
      <>
        <UpdateContentsId
          name={name}
          cover_img={cover_img}
          isBlog={isBlog}
          id={id}
        />
      </>
    );
  };

  return (
    <div>
      {contents !== null && (
        <UpdateContentsRender
          name={contents.data.name}
          cover_img={contents.data.cover_img}
          isBlog={contents.data.isBlog}
          id={id}
        />
      )}
    </div>
  );
}
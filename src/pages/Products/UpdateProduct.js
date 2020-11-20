import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchShowProduct } from '../../store/actions';
import UpdateContentsId from './UpdateContentsId';
import UpdateProductPages from './UpdateProductPages';
export default function UpdateProduct() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.showProduct);
  let { id } = useParams();
  useEffect(() => {
    dispatch(fetchShowProduct(id));
  }, [dispatch]);
  console.log({ id, product }, 'product by id');
  const UpdateProductRender = (props) => {
    const { name, cover_img, isBlog, id } = props;
    return (
      <>
        <UpdateProductPages
        // name={name}
        // cover_img={cover_img}
        // isBlog={isBlog}
        // id={id}
        />
      </>
    );
  };

  return (
    <div>
      {product !== null && (
        <UpdateProductRender
        // name={contents.data.name}
        // cover_img={contents.data.cover_img}
        // isBlog={contents.data.isBlog}
        // id={id}
        />
      )}
    </div>
  );
}

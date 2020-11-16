import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UpdateProduct from '../../components/Product/UpdateProduct';
import { fetchShowProduct } from '../../store/actions';

export default function UpdateProductPages() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const product = useSelector((state) => state.product);
  console.log({ product }, 'CONSOLE DI PRODUCT');

  useEffect(() => {
    dispatch(fetchShowProduct(id));
  }, [dispatch]);
  return <div>{/* <UpdateProduct /> */}</div>;
}

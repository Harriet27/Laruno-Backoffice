import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UpdateProduct from '../../components/Product/UpdateProduct';
import { fetchShowProduct } from '../../store/actions';
import { CircularProgress } from '@material-ui/core';

export default function UpdateProductPages() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const product = useSelector((state) => state.product.showProduct);
  console.log({ product }, 'CONSOLE DI PRODUCT');

  const ProductRenderToUpdate = (props) => {
    const {
      name,
      price,
      sale_price,
      slug,
      subheadline,
      time_period,
      type,
      visibility,
      media_url,
      code,
      id,
      sale_method,
      description,
      headline,
      feature_onpage,
      feature_onheader,
      image_bonus,
      image_url,
      ecommerce,
      boe,
      bump,
      topic,
      agent,
      section,
      learn_about,
    } = props;
    return (
      <>
        <UpdateProduct
          name={name}
          price={price}
          sale_price={sale_price}
          slug={slug}
          subheadline={subheadline}
          time_period={time_period}
          type={type}
          visibility={visibility}
          media_url={media_url}
          code={code}
          id={id}
          sale_method={sale_method}
          description={description}
          headline={headline}
          feature_onpage={feature_onpage}
          feature_onheader={feature_onheader}
          image_bonus={image_bonus}
          image_url={image_url}
          boe={boe}
          bump={bump}
          ecommerce={ecommerce}
          topic={topic}
          agent={agent}
          learn_about={learn_about}
          section={section}
        />
      </>
    );
  };

  useEffect(() => {
    dispatch(fetchShowProduct(id));
  }, [dispatch]);

  return (
    <div>
      {product === null || product.data._id !== id ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <ProductRenderToUpdate
          id={id}
          name={product.data.name}
          price={product.data.price}
          sale_price={product.data.sale_price}
          slug={product.data.slug}
          subheadline={
            product.data.subheadline !== null && product.data.subheadline
          }
          time_period={product.data.time_period}
          type={product.data.type}
          visibility={product.data.visibility}
          boe={
            product.data.boe === null || product.data.boe === undefined
              ? null
              : product.data.boe
          }
          media_url={product.data.media_url !== null && product.data.media_url}
          code={product.data.code}
          description={product.data.description}
          sale_method={product.data.sale_method}
          headline={product.data.headline !== null && product.data.headline}
          feature_onheader={
            product.data.feature.feature_onheader !== null &&
            product.data.feature.feature_onheader
          }
          feature_onpage={
            product.data.feature.feature_onpage !== null &&
            product.data.feature.feature_onpage
          }
          image_bonus={
            product.data.image_bonus_url !== null &&
            product.data.image_bonus_url
          }
          image_url={product.data.image_url !== null && product.data.image_url}
          bump={product.data.bump[0] !== null && product.data.bump[0]}
          ecommerce={
            product.data.ecommerce === null ||
            product.data.ecommerce === undefined
              ? null
              : product.data.ecommerce
          }
          topic={product.data.topic !== null && product.data.topic}
          agent={product.data.agent !== null && product.data.agent}
          learn_about={
            product.data.learn_about !== null && product.data.learn_about
          }
          section={product.data.section !== null && product.data.section}
        />
      )}
    </div>
  );
}

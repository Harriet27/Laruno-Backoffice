import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UpdateProduct from '../../components/Product/UpdateProduct';
import { fetchShowProduct } from '../../store/actions';

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
      webinar_date,
      webinar_start,
      webinar_url,
      webinar_duration,
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
      bump_desc,
      bump_heading,
      bump_image,
      bump_name,
      bump_weight,
      bump_price,
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
          webinar_date={webinar_date}
          webinar_start={webinar_start}
          webinar_url={webinar_url}
          webinar_duration={webinar_duration}
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
          bump_desc={bump_desc}
          bump_heading={bump_heading}
          bump_image={bump_image}
          bump_name={bump_name}
          bump_weight={bump_weight}
          bump_price={bump_price}
        />
      </>
    );
  };

  useEffect(() => {
    dispatch(fetchShowProduct(id));
  }, [dispatch]);

  return (
    <div>
      {product !== null && (
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
          webinar_date={
            product.data.webinar.date !== null && product.data.webinar.date
          }
          webinar_start={
            product.data.webinar.start_time !== null &&
            product.data.webinar.start_time
          }
          webinar_url={
            product.data.webinar.client_url !== null &&
            product.data.webinar.client_url
          }
          webinar_duration={
            product.data.webinar.duration !== null &&
            product.data.webinar.duration
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
          bump_name={
            product.data.bump[0].bump_name !== null &&
            product.data.bump[0].bump_name
          }
          bump_image={
            product.data.bump[0].bump_image !== null &&
            product.data.bump[0].bump_image
          }
          bump_heading={
            product.data.bump[0].bump_heading !== null &&
            product.data.bump[0].bump_heading
          }
          bump_price={
            product.data.bump[0].bump_price !== null &&
            product.data.bump[0].bump_price
          }
          bump_weight={
            product.data.bump[0].bump_weight !== null &&
            product.data.bump[0].bump_weight
          }
          bump_desc={
            product.data.bump[0].bump_desc !== null &&
            product.data.bump[0].bump_desc
          }
        />
      )}
    </div>
  );
}

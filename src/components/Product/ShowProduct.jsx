import React, { useEffect } from 'react';
// import Card from '../../elements/Card/Card';

import { fetchShowProduct } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Table, Spinner } from 'reactstrap';
import { CircularProgress, Card } from '@material-ui/core';

export default function ShowProduct(props) {
  const dispatch = useDispatch();
  let { id } = useParams();
  // const product = useSelector((state) => state.detail.data);
  const product = useSelector((state) => state.product.showProduct);
  console.log({ product }, 'product');
  // --- useEffect --- get data topic ---//
  useEffect(() => {
    dispatch(fetchShowProduct(id));

    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <React.Fragment>
      <section style={{ margin: '100px 50px' }}>
        <Card>
          {product === null || product.data._id !== id ? (
            <Card
              style={{
                width: '100%',
                height: '50vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div>
                {/* <Spinner color="primary" /> */}
                <CircularProgress />
              </div>
            </Card>
          ) : (
            <div key={product.data._id}>
              <Card style={{ padding: '20px' }}>
                <Table borderless size="sm">
                  <thead>
                    <tr>
                      <td style={{ width: '200px' }}>Visibility</td>
                      <td>: {product.data.visibility}</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Type</td>
                      <td>: {product.data.type}</td>
                    </tr>

                    <tr>
                      <td>Product Name</td>
                      <td>: {product.data.name}</td>
                    </tr>
                    <tr>
                      <td>Code</td>
                      <td>: {product.data.code}</td>
                    </tr>
                    <tr>
                      <td>Headline</td>
                      <td>: {product.data.headline}</td>
                    </tr>
                    <tr>
                      <td>Description</td>
                      <td>
                        :{' '}
                        <span
                          key={product.data._id}
                          dangerouslySetInnerHTML={{
                            __html: `${product.data.description}`,
                          }}
                        />
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td>Time Periode</td>
                      <td>: {product.data.time_period} Months</td>
                    </tr>
                    <tr>
                      <td>Price</td>
                      <td>:Rp. {product.data.price} </td>
                    </tr>
                    <tr>
                      <td>Image</td>
                      <td>
                        {product.data.image_url === null ||
                        product.data.image_url === undefined ||
                        product.data.image_url.length === 0
                          ? 'Not Image'
                          : product.data.image_url.map((item) => {
                              return (
                                <>
                                  <img src={item} alt={item} />
                                </>
                              );
                            })}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </div>
          )}
        </Card>
      </section>
    </React.Fragment>
  );
}

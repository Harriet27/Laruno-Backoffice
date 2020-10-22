import React, { useEffect } from 'react';
import Card from '../../elements/Card/Card';

import { fetchShowProduct } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Table } from 'reactstrap';

export default function ShowTopic(props) {
    const dispatch = useDispatch();
    let { id } = useParams();
    // const product = useSelector((state) => state.detail.data);
    const product = useSelector((state) => state.product.showProduct);

    // --- useEffect --- get data topic ---//
    useEffect(() => {
        dispatch(fetchShowProduct(id));

        // eslint-disable-next-line
    }, [dispatch]);

    return (
        <React.Fragment>
            <section style={{ margin: '100px 50px' }}>
                <Card>
                    {product !== null && (
                        <div key={product.data._id}>
                            <React.Fragment></React.Fragment>
                            <Card isNormal style={{ padding: '10px' }}>
                                <Table borderless size="sm">
                                    <thead>
                                        <tr>
                                            <td style={{ width: '200px' }}>
                                                Visibility
                                            </td>
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
                                                :
                                                <div
                                                    key={product.data._id}
                                                    dangerouslySetInnerHTML={{
                                                        __html: `${product.data.description}`,
                                                    }}
                                                />
                                                <br />
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent:
                                                            'space-between',
                                                        margin: '10px 0',
                                                    }}
                                                >
                                                    {product.data
                                                        .image_bonus_url &&
                                                        product.data.image_bonus_url.map(
                                                            (item, index) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        style={{
                                                                            width:
                                                                                '49%',
                                                                        }}
                                                                    >
                                                                        <img
                                                                            width="100%"
                                                                            src={
                                                                                item
                                                                            }
                                                                            alt={
                                                                                item
                                                                            }
                                                                        />
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Time Periode</td>
                                            <td>
                                                : {product.data.time_period}{' '}
                                                Months
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Price</td>
                                            <td>:Rp. {product.data.price} </td>
                                        </tr>
                                        <tr>
                                            <td>Image</td>
                                            <td>
                                                <img
                                                    src={product.data.image_url}
                                                    alt={product.data.image_url}
                                                />
                                            </td>
                                        </tr>
                                        {/* <tr>
                                            <td>Video</td>
                                            <td>
                                                <video
                                                    width="320"
                                                    height="240"
                                                    controls
                                                >
                                                    <source
                                                        src={
                                                            product.data
                                                                .video_url
                                                        }
                                                        type="video/mp4"
                                                    />{' '}
                                                    <source
                                                        src={
                                                            product.data
                                                                .video_url
                                                        }
                                                        type="video/ogg"
                                                    />
                                                </video>
                                            </td>
                                        </tr> */}
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

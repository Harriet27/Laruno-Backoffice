import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import DetailProduct from '../../components/AddProduct/DetailProduct';

import DataOrders from '../../components/OrderOnline/DataOrder';
import TabPanel from './TabPanel';
import Layout from '../../components/AddProduct/Layout';
import DynamicField from '../../components/AddProduct/DynamicField';
// --- Fetch/Store/Actions --- //
import { fetchPostProducts } from '../../store/actions';

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function TestAddProduct() {
    const [value, setValue] = React.useState(0);
    const dispatch = useDispatch();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    // --- Form All --- //
    const [form, setForm] = useState({
        // --- section one --- //
        name: '',
        code: '',
        slug: '',
        type: '',
        webinar: {
            date: '',
            duration: '',
            start_time: '',
            client_url: '',
        },
        ecommerce: {
            weight: 0,
            shipping_charges: true,
            stock: 0,
        },
        topic: [],
        price: 0,
        time_period: '',
        visibility: '',
        sale_method: '',
        bump: [
            {
                bump_name: '',
                bump_price: 0,
                bump_weight: '',
                bump_image: '',
            },
        ],

        // --- Section 2 --- //
        headline: '',
        subheadline: '',
        description: '',
        learn_about: [
            {
                title: '',
                content: '',
            },
        ],
        sale_price: 0,
        image_url: '',
        video_url: '',
        agent: [],
        image_bonus_url: [],
        image_text_url: [],
        image_product_url: [],
        section: [
            {
                title: '',
                content: '',
            },
        ],
        feature: {
            feature_onheader: '',
            feature_onpage: '',
        },
    });

    // --- Detail Product --- //
    // --- Test Order Bump,  Webinar, ecommerce--- //
    const [objBump, setObjBump] = useState({
        bump_name: '',
        bump_price: '',
        bump_image: '',
        bump_weight: 0,
    });

    const [objWebinar, setObjWebinar] = useState({
        date: '',
        duration: '',
        start_time: '',
        client_url: '',
    });

    const [objEcommerce, setObjEcommerce] = useState({
        weight: 0,
        shipping_charges: true,
        stock: 0,
    });

    const [objFeature, setObjFeature] = useState({
        feature_onheader: '',
        feature_onpage: '',
    });

    const handleBump = (event) => {
        setObjBump({ ...objBump, [event.target.name]: event.target.value });
    };
    const handleWebinar = (event) => {
        setObjWebinar({
            ...objWebinar,
            [event.target.name]: event.target.value,
        });
    };
    const handleEcommerce = (event) => {
        setObjEcommerce({
            ...objEcommerce,
            [event.target.name]: event.target.value,
        });
    };
    const handleFeature = (event) => {
        setObjFeature({
            ...objFeature,
            [event.target.name]: event.target.value,
        });
    };

    const bayar_ongkir = 'true';
    const gratis_ongkir = 'false';
    // handle radio button
    const handleRadio = (event) => {
        if (event.target.value === 'true') {
            setObjEcommerce({ ...objEcommerce, shipping_charges: true });
        } else if (event.target.value === 'false') {
            setObjEcommerce({ ...objEcommerce, shipping_charges: false });
        }
    };

    form.bump = [{ ...objBump }];
    form.webinar = { ...objWebinar };
    form.ecommerce = { ...objEcommerce };
    form.feature = { ...objFeature };

    // --- handleSubmit untuk enter dan submit button --- //
    const handleSubmit = (event) => {
        event.preventDefault();
        // history
        dispatch(fetchPostProducts(form));
    };

    console.log(form, 'ini form isinya apa aja. ORDER BUMP');
    // handle change untuk onChange
    const handleChangeForm = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    // --- try handle select multiple --- //
    const handleSelect = (topic) => {
        setForm({ ...form, topic });
    };

    const handleSelectAgent = (agent) => {
        setForm({ ...form, agent });
    };

    // ======>>> lOGIC DETAIL PRODUCT SECTION 2 "layout" <<<====== //

    // ------> Logic untuk Dynamic Form Learn About <------ //
    const [fields, setFields] = useState([{ title: '', content: '' }]);
    // ===>> Handle Change <<===  //
    function handleChangeDynamic(i, event) {
        const values = [...fields];
        values[i].title = event.target.value;
        setFields(values);
    }
    function handleChangeContents(i, event) {
        // semua object di dalam fields
        const values = [...fields];
        // untuk semua object yang berisi key 'content' di dalam fields yg kita klik maka valuenya merupakan hasil inputan kita
        values[i].content = event.target.value;

        setFields(values);
    }

    function handleAdd() {
        //  menambahkan field ke dalam value input terbaru
        const values = [...fields];
        values.push({ title: '', content: '' });
        setFields(values);
    }

    // --- Optional "just test" ---- //
    function handleRemove(i) {
        const values = [...fields];
        // splice (i = indeks, (2) berarti delete 2 value di mulai dari indeks ke i)
        values.splice(i, 1);
        setFields(values);
    }
    form.learn_about = [...fields];
    // ---- BATAS BAWAH !!!! ---- //

    // ------> Logic untuk Dynamic Form Section <------ //
    const [sectionAdd, setSectionAdd] = useState([{ title: '', content: '' }]);
    // ===>> Handle Change <<===  //
    function handleChangeDynamicSection(i, event) {
        const values = [...sectionAdd];
        values[i].title = event.target.value;
        setSectionAdd(values);
    }
    function handleChangeContentsSection(i, event) {
        // semua object di dalam fields
        const values = [...sectionAdd];
        // untuk semua object yang berisi key 'content' di dalam fields yg kita klik maka valuenya merupakan hasil inputan kita
        values[i].content = event.target.value;

        setSectionAdd(values);
    }

    function handleAddSection() {
        //  menambahkan field ke dalam value input terbaru
        const values = [...sectionAdd];
        values.push({ title: '', content: '' });
        setSectionAdd(values);
    }

    // --- Optional "just test" ---- //
    function handleRemoveSection(i) {
        const values = [...sectionAdd];
        // splice (i = indeks, (2) berarti delete 2 value di mulai dari indeks ke i)
        values.splice(i, 1);
        setSectionAdd(values);
    }
    form.section = [...sectionAdd];
    // ---- BATAS BAWAH !!!! ---- //

    // --- DURATION --- ///
    const [duration, setDuration] = useState({
        hours: '',
        minutes: '',
    });
    console.log('duration disini', duration);
    const handleDuration = (e) => {
        setDuration({ ...duration, [e.target.name]: e.target.value });
    };
    objWebinar.duration = duration.hours + ':' + duration.minutes;

    // --- react quill --- //
    const [quill, setQuill] = useState('');

    form.description = value;

    // --- Upload Image --- //
    const [formulir, setFormulir] = useState({
        image: {},
    });
    console.log(formulir, 'formulir ini sinya apa sih');
    console.log(formulir.image.image_url, 'formulir ini isinya apa sih');
    console.log(
        formulir.image.bump_image,
        'formulir ini isinya apa bump image'
    );
    form.image_url = formulir.image.image_url;
    objBump.bump_image = formulir.image.bump_image;
    return (
        <div style={{ margin: '50px' }}>
            <AppBar position="static" color="white">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Item One" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                </Tabs>
            </AppBar>

            <TabPanel value={value} index={0}>
                <div
                    style={{
                        width: '100%',
                        background: 'white',
                        height: '900px',
                    }}
                >
                    <DetailProduct
                        checked_bayar={objEcommerce.shipping_charges === true}
                        checked_gratis={objEcommerce.shipping_charges === false}
                        bayar_ongkir={bayar_ongkir}
                        gratis_ongkir={gratis_ongkir}
                        handleRadio={handleRadio}
                        handleSelect={handleSelect}
                        onChange={handleChange}
                        handleWebinar={handleWebinar}
                        handleDuration={handleDuration}
                        form={form.type}
                        name={form.name}
                        type={form.type}
                        topic_select={form.topic}
                        price={form.price}
                        time_period={form.time_period}
                        visibility={form.visibility}
                        sale_method={form.sale_method}
                        zoom_id={form.client_url}
                        date={form.date}
                        start_time={form.start_time}
                        slug={form.slug}
                        // duration={form.duration}
                        sale_price={form.sale_price}
                        duration_hours={duration.hours}
                        duration_minutes={duration.minutes}
                        stock={objEcommerce.stock}
                        handleEcommerce={handleEcommerce}
                        weight={objEcommerce.weight}
                        code={form.code}
                        formulir={formulir}
                        setFormulir={setFormulir}
                    />
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div
                    style={{
                        width: '100%',
                        background: 'white',
                        height: '900px',
                    }}
                >
                    <Layout
                        handleSelectAgent={handleSelectAgent}
                        onChange={handleChange}
                        handleFeature={handleFeature}
                        headline={form.headline}
                        description={form.description}
                        image_bonus_url={form.image_bonus_url}
                        image_text_url={form.image_text_url}
                        image_product_url={form.image_product_url}
                        video={form.video_url}
                        feature_onpage={objFeature.feature_onpage}
                        feature_onheader={objFeature.feature_onheader}
                        agent={form.agent}
                        value={quill}
                        setValue={setQuill}
                        subheadline={form.subheadline}
                    >
                        {form.type === 'ecommerce' ? null : (
                            <DynamicField
                                fields={fields}
                                handleAdd={handleAdd}
                                handleChange={handleChangeDynamic}
                                handleChangeContents={handleChangeContents}
                                handleRemove={handleRemove}
                            />
                        )}
                    </Layout>
                </div>
            </TabPanel>
        </div>
    );
}

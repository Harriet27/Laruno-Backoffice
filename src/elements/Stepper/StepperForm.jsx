import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Elements, Components, Pages
import Layout from '../../components/AddProduct/Layout';
import DetailProduct from '../../components/AddProduct/DetailProduct';
import DynamicField from '../../components/AddProduct/DynamicField';
import DynamicFieldSection from '../../components/AddProduct/DynamicFieldSection';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchPostProducts } from '../../store/actions';
import Bump from '../../components/AddProduct/Bump';
import { duration } from 'moment';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Detail Information', 'Layout'];
}

export default function StepperForm() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        window.scrollTo(1, 0);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        window.scrollTo(1, 0);
    };

    //  --- Fetching Data include Logic --- //
    const dispatch = useDispatch();
    const history = useHistory();
    const image = useSelector((state) => state.image.imageProduct);

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

    // ======>>> lOGIC DETAIL PRODUCT SECTION 1 <<<====== //
    const reqImage = image !== null && image.result.url;
    form.image_url = reqImage;

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
        dispatch(fetchPostProducts(form, history));
    };

    console.log(form, 'ini form isinya apa aja. ORDER BUMP');
    // handle change untuk onChange
    const handleChange = (event) => {
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
    const [value, setValue] = useState('');

    form.description = value;
    // --- Content --- //
    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <>
                        <DetailProduct
                            checked_bayar={
                                objEcommerce.shipping_charges === true
                            }
                            checked_gratis={
                                objEcommerce.shipping_charges === false
                            }
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
                        />
                        <Bump
                            onChange={handleBump}
                            bump_name={objBump.bump_name}
                            bump_price={objBump.bump_price}
                            bump_weight={objBump.bump_weight}
                            bump_image={objBump.bump_image}
                        />
                    </>
                );
            case 1:
                return (
                    <>
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
                            feature_onpage={form.feature_onpage}
                            feature_onheader={form.feature_onheader}
                            agent={form.agent}
                            value={value}
                            setValue={setValue}
                            subheadline={form.subheadline}
                        >
                            <DynamicField
                                fields={fields}
                                handleAdd={handleAdd}
                                handleChange={handleChangeDynamic}
                                handleChangeContents={handleChangeContents}
                                handleRemove={handleRemove}
                            />
                        </Layout>
                        <DynamicFieldSection
                            fields={sectionAdd}
                            handleAdd={handleAddSection}
                            handleChange={handleChangeDynamicSection}
                            handleChangeContents={handleChangeContentsSection}
                            handleRemove={handleRemoveSection}
                        />
                    </>
                );

            default:
                return 'Unknown stepIndex';
        }
    }

    return (
        <div
            style={{ borderTop: '1px solid #ced4da' }}
            className={classes.root}
        >
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                <div>
                    <Typography
                        component="span"
                        className={classes.instructions}
                    >
                        <form onSubmit={handleSubmit}>
                            {getStepContent(activeStep)}
                            <>
                                {activeStep === steps.length - 1 ? (
                                    <>
                                        <button
                                            style={{
                                                color: 'white',
                                                padding: 10,
                                                backgroundColor: '#303F9F',
                                                marginLeft: '100px',
                                                border: 'none',
                                                borderRadius: '3px',
                                            }}
                                        >
                                            Confirm
                                        </button>
                                    </>
                                ) : null}
                            </>
                        </form>
                    </Typography>
                    <div>
                        {activeStep === 0 ? (
                            <React.Fragment>
                                <span style={{ marginLeft: '100px' }}></span>
                            </React.Fragment>
                        ) : (
                            <Button
                                style={{ marginLeft: '100px' }}
                                onClick={handleBack}
                                className={classes.backButton}
                            >
                                Back
                            </Button>
                        )}
                        <React.Fragment>
                            {activeStep === steps.length - 1 ? null : (
                                <React.Fragment>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                    >
                                        Next
                                    </Button>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    </div>
                </div>
            </div>
        </div>
    );
}

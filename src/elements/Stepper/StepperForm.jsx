import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Elements, Components, Pages
import Layout from '../../components/AddProduct/Layout';
import DetailProduct from '../../components/AddProduct/DetailProduct';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchPostProducts } from '../../store/actions/product';
import Bump from '../../components/AddProduct/Bump';
import { array } from 'yup';

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
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    //  --- Fetching Data include Logic --- //
    const dispatch = useDispatch();
    const history = useHistory();

    const [form, setForm] = useState({
        // --- section one --- //
        name: '',
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
        },
        topic: [],
        price: 0,
        time_period: '',
        visibility: '',
        sale_method: '',
        bump: [
            {
                bump_name: '',
                bump_price: '',
                bump_weight: 0,
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

    // --- Test Order Bump,  Webinar, ecommerce--- //
    const [objBump, setObjBump] = useState({
        bump_name: '',
        bump_price: '',
        bump_image: '',
        bump_weight: '',
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

    form.bump = [{ ...objBump }];
    form.webinar = { ...objWebinar };
    form.ecommerce = { ...objEcommerce };
    form.feature = { ...objFeature };
    // handleSubmit untuk enter dan submit button
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

    // --- Content --- //
    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <>
                        <DetailProduct
                            handleSelect={handleSelect}
                            onChange={handleChange}
                            handleWebinar={handleWebinar}
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
                            duration={form.duration}
                        />
                        <Bump
                            onChange={handleChange}
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
                            feedback={form.feedback}
                            image_bonus_url={form.image_bonus_url}
                            image_text_url={form.image_text_url}
                            image_product_url={form.image_product_url}
                            video={form.video_url}
                            feature_onpage={form.feature_onpage}
                            feature_onheader={form.feature_onheader}
                            sale_price={form.sale_price}
                            agent={form.agent}
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

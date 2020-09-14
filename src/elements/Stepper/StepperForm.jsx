import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Layout from '../../components/AddProduct/Layout';
import DetailProduct from '../../components/AddProduct/DetailProduct';
import Resseler from '../../components/AddProduct/Resseler';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchPostProducts } from '../../store/actions/product';
import Bump from '../../components/AddProduct/Bump';

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
    return ['Detail Information', 'Layout', 'Resseler'];
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

    //  --- Fetching Data beserta logicnya --- //
    const dispatch = useDispatch();
    const history = useHistory();
    const [form, setForm] = useState({
        type: '',
        name: '',
        price: '',
        short_desc: '',
        description: '',
        time_period: '',
        start_at: '',

        image_url: '',
        video_url: '',
        product_redirect: '',
        sale_method: '',
        topic: [],
        visibility: '',
        form_type: '',
        media_url: '',
    });

    // handleSubmit untuk enter dan submit button
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(fetchPostProducts(form, history));
    };

    // handle change untuk onChange
    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    //  --- Fetching Data beserta logicnya "batas bawah" --- //

    // --- Content --- //
    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <>
                        <DetailProduct
                            onChange={handleChange}
                            form={form.type}
                            name={form.name}
                            type={form.type}
                            topic={form.topic}
                            price={form.price}
                            time_period={form.time_period}
                            visibility={form.visibility}
                            form_type={form.form_type}
                            sale_method={form.sale_method}
                            zoom_id={form.media_url}
                            start_at={form.start_at}
                            start_time={form.start_time}
                            end_time={form.end_time}
                            mentor={form.mentor}
                        />
                        <Bump
                            bump_product={form.bump_product}
                            price_bump={form.price_bump}
                            bump_weight={form.bump_weight}
                            image_bump={form.image_bump}
                            onChange={handleChange}
                        />
                    </>
                );
            case 1:
                return (
                    <>
                        <Layout
                            onChange={handleChange}
                            // short description di field adalah Headline
                            short_desc={form.short_desc}
                            sub_headline={form.sub_headline}
                            description={form.description}
                            what_you_learn={form.what_you_learn}
                            image_bonus={form.image_bonus}
                            image_text={form.image_text}
                            image_product={form.image_product}
                            video={form.video}
                        />
                    </>
                );
            case 2:
                return (
                    <>
                        <Resseler
                            onChange={handleChange}
                            commision_type={form.commision_type}
                            promotion_tools={form.promotion_tools}
                            product_redirect={form.product_redirect}
                        />
                    </>
                );

            default:
                return 'Unknown stepIndex';
        }
    }
    // --- content --- "batas bawah" //

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

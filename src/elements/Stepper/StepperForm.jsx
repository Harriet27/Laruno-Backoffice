import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Layout from '../../components/AddProduct/Layout';
import DetailProduct from '../../components/AddProduct/DetailProduct';
// import Resseler from '../../components/AddProduct/Resseler';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchPostProducts } from '../../store/actions/product';
// import Bump from '../../components/AddProduct/Bump';

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

    //  --- Fetching Data beserta logicnya --- //
    const dispatch = useDispatch();
    const history = useHistory();
    const [form, setForm] = useState({
        type: '',
        name: '',
        price: '',
        headline: '',
        description: '',
        time_period: '',
        date: '',
        slug: '',
        image_url: '',
        video_url: '',
        sale_method: '',
        topic: [],
        visibility: '',
        mentor: '',
        client_url: '',
        image_product_url: '',
        image_bonus_url: '',
        image_text_url: '',
        start_time: '',
        end_time: '',
        commision_type: '',
        promotion_tools: '',
        product_redirect: '',
        feature_onheader: '',
        feature_onpage: '',
        sale_price: '',
        // bump_product: '',
        // bump_weight: '',
        // image_bump: '',
        // price_bump: '',
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

    // try handle select multiple
    const handleSelect = (topic) => {
        setForm({ ...form, topic });
    };
    //  --- Fetching Data beserta logicnya "batas bawah" --- //
    console.log(form);
    // --- Content --- //
    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <>
                        <DetailProduct
                            handleSelect={handleSelect}
                            onChange={handleChange}
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
                            end_time={form.end_time}
                            // mentor={form.mentor}
                            slug={form.slug}
                        />
                        {/* <Bump
                            bump_product={form.bump_product}
                            price_bump={form.price_bump}
                            bump_weight={form.bump_weight}
                            image_bump={form.image_bump}
                            onChange={handleChange}
                        /> */}
                    </>
                );
            case 1:
                return (
                    <>
                        <Layout
                            onChange={handleChange}
                            // short description di field adalah Headline
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
                        />
                    </>
                );
            // case 2:
            //     return (
            //         <>
            //             <Resseler
            //                 onChange={handleChange}
            //                 commision_type={form.commision_type}
            //                 promotion_tools={form.promotion_tools}
            //                 product_redirect={form.product_redirect}
            //             />
            //         </>
            //     );

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

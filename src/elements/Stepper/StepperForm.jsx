import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Layout from "../../components/AddProduct/Layout";
import AddProduct from "../../components/AddProduct/AddProduct";
import Resseler from "../../components/AddProduct/Resseler";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchPostProducts } from "../../store/actions/product";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
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
    return ["Detail Information", "Layout", "Resseler"];
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

    const handleReset = () => {
        setActiveStep(0);
    };

    //  --- Fetching Data beserta logicnya --- //
    const dispatch = useDispatch();
    const history = useHistory();
    const [form, setForm] = useState({
        type: "",
        name: "",
        price: "",
        short_desc: "",
        description: "",
        time_period: "",
        topic: "",
        start_at: "",
        end_at: "",
        image_url: "",
        video_url: "",
        product_redirect: "",
        sale_method: "",
        topic: "",
        visibility: "",
        form_type: "",
        image_url: "",
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
                        <AddProduct
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
                            zoom_id={form.zoom_id}
                            start_at={form.start_at}
                            end_at={form.end_at}
                        />
                    </>
                );
            case 1:
                return (
                    <>
                        <Layout
                            onChange={handleChange}
                            headline={form.headline}
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
                        />
                    </>
                );

            default:
                return "Unknown stepIndex";
        }
    }
    // --- content --- "batas bawah" //

    return (
        <div
            style={{ borderTop: "1px solid #ced4da" }}
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
                {activeStep === steps.length ? (
                    <div>
                        <h1>INI SEMUA TAMPILAN YANG SUDAH DI INPUT</h1>
                        <Button>Confirm</Button>
                    </div>
                ) : (
                    <div>
                        <Typography className={classes.instructions}>
                            <form>{getStepContent(activeStep)}</form>
                        </Typography>
                        <div>
                            {activeStep === 0 ? (
                                <React.Fragment>
                                    <span
                                        style={{ marginLeft: "100px" }}
                                    ></span>
                                </React.Fragment>
                            ) : (
                                <Button
                                    style={{ marginLeft: "100px" }}
                                    onClick={handleBack}
                                    className={classes.backButton}
                                >
                                    Back
                                </Button>
                            )}
                            <React.Fragment>
                                {activeStep === steps.length - 1 ? (
                                    <Button variant="contained" color="primary">
                                        Confirm
                                    </Button>
                                ) : (
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
                )}
            </div>
        </div>
    );
}

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Layout from "../../components/AddProduct/Layout";
import AddProduct from "../../components/AddProduct/AddProduct";
import Resseler from "../../components/AddProduct/Resseler";
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
    return ["Detail Informations", "Layout", "Resseler"];
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return (
                <>
                    <AddProduct />
                </>
            );
        case 1:
            return (
                <>
                    <Layout />
                </>
            );
        case 2:
            return (
                <>
                    <Resseler />
                </>
            );

        default:
            return "Unknown stepIndex";
    }
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

    return (
        <div className={classes.root}>
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
                            {getStepContent(activeStep)}
                        </Typography>
                        <div>
                            {activeStep === 0 ? (
                                <React.Fragment></React.Fragment>
                            ) : (
                                <Button
                                    onClick={handleBack}
                                    className={classes.backButton}
                                >
                                    Back
                                </Button>
                            )}
                            <React.Fragment>
                                {activeStep === 2 ? (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        // onClick={handleNext}
                                    >
                                        Confirm
                                    </Button>
                                ) : (
                                    <React.Fragment></React.Fragment>
                                )}
                            </React.Fragment>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                            >
                                {activeStep === steps.length - 1
                                    ? "Confirm"
                                    : "Next"}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

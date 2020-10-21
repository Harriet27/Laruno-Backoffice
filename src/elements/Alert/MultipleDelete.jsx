import React, { useState } from 'react';
import Styled from 'styled-components';
import { md, ButtonActions } from '../Styled/StyledForm';
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    FormControl,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
// import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { makeStyles } from '@material-ui/core/styles';
import { fetchDeleteProduct } from '../../store/actions';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function MultipleDelete(props) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <ButtonActions onClick={handleClickOpen}>Delete</ButtonActions>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Are You Sure Want to Delete ?'}
                </DialogTitle>
                <form onSubmit={props.onSubmit}>
                    <FormControl className={classes.formControl}>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                onClick={handleClose}
                                color="primary"
                            >
                                Delete
                            </Button>
                        </DialogActions>
                    </FormControl>
                </form>
            </Dialog>
        </div>
    );
}

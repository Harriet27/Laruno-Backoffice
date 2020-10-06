// import React from 'react';
// import ModalSmart from '../../elements/Modal/ModalSmart';
// import { fetchDeleteProduct } from '../../store/actions';
// import { useDispatch } from 'react-redux';
// import Styled from 'styled-components';
// import DeleteIcon from '@material-ui/icons/Delete';
// // --- Styled Components --- //
// const Section = Styled.section`
//     width: 100%;
//     align-items: center;
//     display: flex;
//     justify-content: center;
// `;

// export default function DeleteProduct(props) {
//     const dispatch = useDispatch();

//     // --- Fetch submit method Post --- //
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         dispatch(fetchDeleteProduct(props.id));
//     };

//     return (
//         <React.Fragment>
//             <ModalSmart
//                 style={{ backgroundColor: 'red' }}
//                 buttonLabel={<DeleteIcon fontSize="small" />}
//                 title="Delete Product"
//                 onClickConfirm={handleSubmit}
//             >
//                 <Section>
//                     <h1>Apakah kamu yakin ingin menghapus Product ini ?</h1>
//                 </Section>
//             </ModalSmart>
//         </React.Fragment>
//     );
// }

import React, { useState } from 'react';
import Styled from 'styled-components';
import { Input, Th, Overflow, md } from '../../elements/Styled/StyledForm';
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

const ButtonLink = Styled.button`
    background-color:${(props) => (props.detail ? 'grey' : '#0098DA')};
    padding: 5px;
    border-radius: 3px;
    color: white;
    font-size: ${md};
    border: 1px solid #ced4da;
    font-Weight: 400;
`;

export default function ModalDeleteData(props) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(fetchDeleteProduct(props.id));
    };

    return (
        <div>
            <ButtonLink
                style={{ backgroundColor: 'red' }}
                onClick={handleClickOpen}
            >
                <DeleteIcon fontSize="small" />
            </ButtonLink>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Are You Sure Want to Delete ?'}
                </DialogTitle>
                <form onSubmit={handleSubmit}>
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

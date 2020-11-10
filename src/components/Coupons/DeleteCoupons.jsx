import React, { useState } from 'react';
import Styled from 'styled-components';
import { md } from '../../elements/Styled/StyledForm';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { fetchDeleteCoupons } from '../../store/actions';
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
    dispatch(fetchDeleteCoupons(props.id));
  };

  return (
    <div>
      <ButtonLink style={{ backgroundColor: 'red' }} onClick={handleClickOpen}>
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
              <Button type="submit" onClick={handleClose} color="primary">
                Delete
              </Button>
            </DialogActions>
          </FormControl>
        </form>
      </Dialog>
    </div>
  );
}

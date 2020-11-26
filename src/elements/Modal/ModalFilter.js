import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from 'reactstrap';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import { md } from '../../elements/Styled/StyledForm';
// --- Styled Components --- //

const ButtonLink = Styled.button`
    background-color:${(props) => (props.detail ? 'grey' : '#0098DA')};
    padding: 5px;
    border-radius: 3px;
    color: white;
    font-size: ${md};
    border: 1px solid #ced4da;
    // --- ini catatan untuk sementara --- //
    // font-Weight: bold;
    &:focus{
        outline: none;
    }
`;
// --- Styled Components --- //

const ModalFilter = (props) => {
  const {
    buttonLabel,
    className,
    style,

    children,
    title,
    onClickConfirm,
    styleModal,
    isLoading,
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <ButtonLink style={style} onClick={toggle}>
        {buttonLabel}
      </ButtonLink>

      <Modal
        style={styleModal}
        isOpen={modal}
        toggle={toggle}
        className={className}
      >
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          {/* modal body untuk isi content bisa dengan html */}
          {children}
        </ModalBody>
        <ModalFooter>
          {/* onClickConfirm bisa berfungsi untuk mengkonusmi api */}
          <Button
            color="primary"
            onClick={onClickConfirm}
            style={{ width: '100px', textAlign: 'center' }}
          >
            {isLoading ? (
              <Spinner style={{ width: '1.5rem', height: '1.5rem' }} />
            ) : (
              'Confirm'
            )}
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

ModalFilter.propTypes = {
  buttonLabel: PropTypes.any,
  onClickConfirm: PropTypes.any,
  isLoadin: PropTypes.any,
};

export default ModalFilter;

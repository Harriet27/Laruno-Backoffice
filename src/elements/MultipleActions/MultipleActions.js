import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import MultipleDelete from '../../elements/Alert/MultipleDelete';
import { ButtonActions } from '../Styled/StyledForm';
import PropTypes from 'prop-types';
export default function MultipleActions(props) {
  const { isLogic, handleDelete, handleClone } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <>
      {isLogic ? (
        <Dropdown size="sm" isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle style={{ backgroundColor: '#0098DA' }} caret>
            Actions
          </DropdownToggle>
          <DropdownMenu>
            <MultipleDelete onSubmit={handleDelete} />

            <ButtonActions onClick={handleClone}>Clone</ButtonActions>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Dropdown size="sm" isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle style={{ backgroundColor: '#0098DA' }} caret disabled>
            Actions
          </DropdownToggle>
        </Dropdown>
      )}
    </>
  );
}

MultipleActions.propTypes = {
  isLogic: PropTypes.any.isRequired,
  handleDelete: PropTypes.any,
  handleClone: PropTypes.any,
};

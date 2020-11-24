import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import MultipleDelete from '../../elements/Alert/MultipleDelete';
import { ButtonActions } from '../Styled/StyledForm';
import PropTypes from 'prop-types';
export default function MultipleActions(props) {
  const { isLogic, handleDelete, handleClone, isClone } = props;
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
            {/* <MultipleDelete onSubmit={handleDelete} /> */}
            <ButtonActions onClick={handleDelete}>Delete</ButtonActions>
            {isClone ? (
              <ButtonActions onClick={handleClone}>Clone</ButtonActions>
            ) : null}
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
  isLogic: PropTypes.any,
  handleDelete: PropTypes.any,
  handleClone: PropTypes.any,
  isClone: PropTypes.bool,
};

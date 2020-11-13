import React, { useState, useEffect } from 'react';

import { logout } from '../../store/actions';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Styled from 'styled-components';
import ImageBrand from '../../assets/images/laruno1.png';
import PersonIcon from '@material-ui/icons/Person';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { fetchGetUsersAuthentication } from '../../store/actions/';

// --- Styled components --- //
const Button = Styled.button`
    background-color: #fa962b;
    color: white;
    border-radius: 3px;
    border: none;
    padding: 5px 15px;
    &:hover {
        border-radius: 2em;
    }
    &:focus{
        outline: none;
    }
`;
const Span = Styled.span`
    text-transform: uppercase;
    font-weight: 600;
    color: rgba(0,0,0,.6);
    font-size: 18px;
`;

const HeaderStyled = Styled.header`
    -webkit-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    --//--Postion sticky--//--
    position: sticky;
    top: 0;
    z-index: 1000;
    width: 100%;
    font-size: 20px;
    background-color: white;
    padding: 5px 40px;
`;
const Image = Styled.img`
    width:100%;
    height: 100%;
`;
const WrapsImage = Styled.div`
    height: 40px;
    margin-right: 40px;
`;

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  //  --- Is Open --- //
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // --- Who I am --- //
  const user = useSelector((state) => state.user.userAuthentication);

  useEffect(() => {
    dispatch(fetchGetUsersAuthentication());
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <HeaderStyled>
      <Navbar light expand="md">
        <NavbarBrand href="/">
          <WrapsImage>
            <Image src={ImageBrand} alt="brand" />
          </WrapsImage>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <Link style={Styles.Link} to="/dashboard">
              <Span>Dashboard</Span>
            </Link>
            <Link style={Styles.Link} to="/product">
              <Span>Product</Span>
            </Link>
            <Link style={Styles.Link} to="/Order">
              <Span>Order</Span>
            </Link>
            <Link style={Styles.Link} to="/reports">
              <Span>Report</Span>
            </Link>
            <Link style={Styles.Link} to="/tools">
              <Span>Tools</Span>
            </Link>

            {/* --- Dropdown Others --- */}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <Span>Others</Span>
              </DropdownToggle>
              <DropdownMenu right>
                <Link to="/topic">
                  <DropdownItem>
                    <Span>Topic</Span>
                  </DropdownItem>
                </Link>
                <Link to="/roles">
                  <DropdownItem>
                    <Span>roles</Span>
                  </DropdownItem>
                </Link>
                <Link to="/users">
                  <DropdownItem>
                    <Span>Users</Span>
                  </DropdownItem>
                </Link>
                <Link to="/coupons">
                  <DropdownItem>
                    <Span>coupons</Span>
                  </DropdownItem>
                </Link>
                <Link to="/payments">
                  <DropdownItem>
                    <Span>Payments</Span>
                  </DropdownItem>
                </Link>
                <Link to="/add-contents">
                  <DropdownItem>
                    <Span>Add Contents</Span>
                  </DropdownItem>
                </Link>
                <Link to="/contents">
                  <DropdownItem>
                    <Span>Contents</Span>
                  </DropdownItem>
                </Link>
                <Link to="/template">
                  <DropdownItem>
                    <Span>Template</Span>
                  </DropdownItem>
                </Link>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

          {/* --- Button Add Product --- */}
          <Link to="/add-product">
            <Button> + Add Product</Button>
          </Link>
          {user === null ? (
            <div style={Styles.MarginNavbar}>
              <Nav className="mr-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    <Span>
                      <PersonIcon />
                    </Span>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <Span>Looading...</Span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </div>
          ) : (
            <div style={Styles.MarginNavbar}>
              <Nav className="mr-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    <Span>
                      <PersonIcon />
                    </Span>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <Span>{user.data.name}</Span>
                    </DropdownItem>

                    <DropdownItem divider />
                    <DropdownItem onClick={() => dispatch(logout(history))}>
                      <Span>Logout</Span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </div>
          )}
        </Collapse>
      </Navbar>
    </HeaderStyled>
  );
};

const Styles = {
  Link: {
    padding: '8px',
  },
  MarginNavbar: { margin: '0 20px' },
};

export default Header;

import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import Styled from 'styled-components';
import ImageBrand from '../../assets/images/laruno1.png';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

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
`;

const NavigationLink = Styled.p`
    color: black;
    margin-right: 10px;
    margin-top: 10px;
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
// --- Styled Components --- //

const Header = () => {
    //  --- Is Open --- //
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <HeaderStyled>
            <Navbar light expand="md" style={{ padding: 0 }}>
                <NavbarBrand href="/">
                    <WrapsImage>
                        <Image src={ImageBrand} alt="brand" />
                    </WrapsImage>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <Link to="/dashboard">
                            <NavigationLink>Dashboard</NavigationLink>
                        </Link>
                        <Link to="/product">
                            <NavigationLink>Product</NavigationLink>
                        </Link>
                        <Link to="/Order">
                            <NavigationLink>Order</NavigationLink>
                        </Link>
                        <Link to="/reports">
                            <NavigationLink>Report</NavigationLink>
                        </Link>
                        <Link to="/tools">
                            <NavigationLink>Tools</NavigationLink>
                        </Link>

                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle
                                nav
                                caret
                                style={{ color: 'black' }}
                            >
                                Others
                            </DropdownToggle>
                            <DropdownMenu right>
                                <Link to="/topic">
                                    <DropdownItem>Topic</DropdownItem>
                                </Link>
                                <Link to="/roles">
                                    <DropdownItem>roles</DropdownItem>
                                </Link>
                                <Link to="/users">
                                    <DropdownItem>Users</DropdownItem>
                                </Link>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <Link to="/add-product">
                        <Button> + Add Product</Button>
                    </Link>
                </Collapse>
            </Navbar>
        </HeaderStyled>
    );
};

export default Header;

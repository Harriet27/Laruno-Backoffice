import React, { useState } from 'react';

import Styled from 'styled-components';
import ImageBrand from '../../assets/images/laruno1.png';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
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
                        <NavItem>
                            <NavLink href="/dashboard">Dashboard</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/report">Report</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/product">Product</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/order">Order</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/tools">Tools</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Others
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>Option 1</DropdownItem>
                                <DropdownItem>Option 2</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Reset</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <Button>Add Product</Button>
                </Collapse>
            </Navbar>
        </HeaderStyled>
    );
};

export default Header;

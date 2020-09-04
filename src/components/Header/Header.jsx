import React, { useState } from "react";
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
    NavbarText,
    Button,
} from "reactstrap";
import "../../assets/css/styles.css";
const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <header className="header-shadow-css">
            <Navbar className="container-css" color="white" light expand="md">
                <NavbarBrand href="/">Laruno</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto left-50px" navbar>
                        <NavItem>
                            <NavLink href="/">DASHBOARD</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/">PRODUCT</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/">ORDERS</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/">CONTACTS</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/">REPORTS</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                OTHERS
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>Option 1</DropdownItem>
                                <DropdownItem>Option 2</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Reset</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <Button color="primary">Add Product</Button>
                    </Nav>
                </Collapse>
            </Navbar>
        </header>
    );
};

export default Header;

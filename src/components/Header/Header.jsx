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
} from "reactstrap";
import "./header.scss";
const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <header className="header-shadow header-fixed container-general">
            <Navbar light expand="md">
                <NavbarBrand href="/">Laruno</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/dashboard">Dashboard</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/reactstrap/reactstrap">
                                Report
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/reactstrap/reactstrap">
                                Product
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/reactstrap/reactstrap">
                                Order
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/reactstrap/reactstrap">
                                Tools
                            </NavLink>
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
                    <button className="button-hover">Add Product</button>
                </Collapse>
            </Navbar>
        </header>
    );
};

export default Header;

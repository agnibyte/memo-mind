import Link from "next/link";
import { useState } from "react";
import { Dropdown, Nav, Navbar, NavDropdown } from "react-bootstrap";
import headerJson from "../../public/json/header.json";
import { Container } from "reactstrap";

import styles from "@/styles/common/header.module.scss"; // Import SCSS

export default function TopHeader() {
  const [menuItems, setMenuItems] = useState(headerJson.menu);

  const renderMenuItems = (items) =>
    items.map((item, index) =>
      item.subMenu ? (
        <NavDropdown
          title={item.label}
          id={`nav-dropdown-${index}`}
          key={index}
          className={styles.rightAlignedMenu}
        >
          {renderMenuItems(item.subMenu)}
        </NavDropdown>
      ) : (
        <NavDropdown.Item
          href={item.url}
          key={index}
        >
          {item.label}
        </NavDropdown.Item>
      )
    );

  return (
    <Navbar
      expand="lg"
      className="px-4 py-2 bg-light shadow-sm"
    >
      <Container>
        <Link
          href="/"
          className="navbar-brand"
        >
          {/* <img
            src="/logo.png"
            alt="Logo"
            width="120"
          /> */}
          Dashboard
        </Link>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto">
            {menuItems.map((item, index) =>
              item.subMenu ? (
                <NavDropdown
                  title={item.label}
                  id={`nav-dropdown-main-${index}`}
                  key={index}
                  className={styles.mainDropdown}
                >
                  {renderMenuItems(item.subMenu)}
                </NavDropdown>
              ) : (
                <Nav.Link
                  href={item.url}
                  key={index}
                >
                  {item.label}
                </Nav.Link>
              )
            )}
          </Nav>
          <Dropdown align="end">
            <Dropdown.Toggle className="btn btn-light border-0">
              {/* <img
                src="/profile-icon.png"
                alt="Profile"
                className="rounded-circle"
                width="40"
              /> */}
              user
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/settings">Settings</Dropdown.Item>
              <Dropdown.Item href="/logout">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

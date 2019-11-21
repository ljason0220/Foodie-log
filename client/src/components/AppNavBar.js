import React, { Component, Fragment } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Container } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/registerModal';
import LoginModal from './auth/loginModal';
import Logout from './auth/logout';

class AppNavBar extends Component {
  state = {
    isOpen: false
  }

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <Logout />
        </NavItem>  
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
      <Navbar color="dark" dark expand="sm" className="mb-5" id='navbar'>
        <Container>
          <NavbarBrand href="/">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgMTkyIDE5MiIgd2lkdGg9IjUxMiIgY2xhc3M9IiI+PGc+PGcgaWQ9Il8xOC1yZWNvbW1lbmQiIGRhdGEtbmFtZT0iMTgtcmVjb21tZW5kIj48cGF0aCBkPSJtMTcwLjcyNSAyMC4yNDZjLTE2LjUyNS0xNi41MjctNDQuMzkzLTIzLjg1Mi03NC43MjUgMi40ODktMzAuMzMzLTI2LjM0Mi01OC4yLTE5LjAxNi03NC43MjUtMi40ODktMjIuNDQxIDIyLjQ0MS0yOS40MzEgNjUuNjQ2LTUuMiA4OS44NzkgMjAuOSAyMC45IDU5LjU1MiA0NS42MzYgNzEuOTIzIDUzLjM0MnYyOC41MzNoMTZ2LTI4LjUzM2MxMi4zNzEtNy43MDYgNTEuMDI2LTMyLjQ0NSA3MS45MjQtNTMuMzQyIDI0LjIzNC0yNC4yMzMgMTcuMjQzLTY3LjQzOC01LjE5Ny04OS44Nzl6bS01OC43MjUgODMuNzU0YTE2IDE2IDAgMCAxIC0zMiAwem01Mi42MDktNS4xODljLTE2LjA0MSAxNi4wNDItNDQuNDQzIDM1LjI1OC02MC42MDkgNDUuNjg5di05LjUxNWEzMi4wNTcgMzIuMDU3IDAgMCAwIDI0LTMwLjk4NXYtNDhoLTE2djMyaC04di0zMmgtMTZ2MzJoLTh2LTMyaC0xNnY0OGEzMi4wNTcgMzIuMDU3IDAgMCAwIDI0IDMwLjk4N3Y5LjUxM2MtMTYuMTY2LTEwLjQzMy00NC41NjgtMjkuNjQ5LTYwLjYxLTQ1LjY5MS03Ljg2LTcuODYtMTEuNDgzLTE5LjYyNi0xMC4yLTMzLjEzIDEuMjI5LTEyLjk1MiA2Ljk4Ni0yNS43MDcgMTUuNC0zNC4xMjEgNi44LTYuOCAxNC41MzctMTAuMTY1IDIyLjgtMTAuMTY1IDExLjA1MSAwIDIzLjA0MSA2LjAyNSAzNC45NTIgMTcuOTM3YTggOCAwIDAgMCAxMS4zMTQgMGMyMC44MjItMjAuODIyIDQxLjg3NC0yMy42NTIgNTcuNzU0LTcuNzcyIDguNDEzIDguNDEzIDE0LjE3IDIxLjE2OSAxNS40IDM0LjEyMSAxLjI4MyAxMy41MDYtMi4zNCAyNS4yNzItMTAuMjAxIDMzLjEzMnoiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6I0ZGRkZGRiIgZGF0YS1vbGRfY29sb3I9IiMwMDAwMDAiPjwvcGF0aD48L2c+PC9nPiA8L3N2Zz4=" width="44" height="44" className="d-inline-block align-top mr-3" alt="logo" />
            Eatr
          </NavbarBrand>
          { isAuthenticated ? 
          <span className="navbar-text">
          <strong>{ user ? `Welcome ${user.name}` : ''}</strong>
          </span> : null}
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto navbar-items" navbar>
              { isAuthenticated ? authLinks : guestLinks }
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(mapStateToProps, null)(AppNavBar);
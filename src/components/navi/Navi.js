import React, { useState, Component } from "react";
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
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userActions } from "../../redux/actions/authActions";
import { history } from "../../redux/reducers/helpers/history";

class Navi extends Component {
  constructor(props) {
    super(props);
   this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      logged: "",
    };
  }
  componentDidMount() {
   
    if (this.props.user) {
      this.setState({ logged: true });
    } else {
      this.setState({ logged: false });
    }
    console.log(this.props.user);
  }

  toggle = () => this.setIsOpen(!this.isOpen);
  handleLoginClick() {
      history.push("/login");
      this.setState({ logged: true });

  }

  handleLogoutClick() {
      this.setState({ logged: false });
       this.props.actions.logout();
       history.push("/");
  }
  render() {
    function LogOut(props) {
      const username=props.username;
      return (

        <UncontrolledDropdown >
        <DropdownToggle nav caret>
          {username}
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem><Link>Profile</Link></DropdownItem>
          <DropdownItem><Link>Settings</Link></DropdownItem>
          <DropdownItem divider />
          <DropdownItem> <Link
          to="/login"
          onClick={props.onClick}>
          Log out
        </Link></DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
       
      ) 
    }
    
    function Login(props) {
      return (
        <Link
          to="/login"
          onClick={props.onClick}  >
          Log in
        </Link>
      )
    }
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Firuza's Habr</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/components/">You see</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  It is
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Amazing
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>And will be</DropdownItem>
                  <DropdownItem>even more amazing</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>!!!</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <NavbarText>
              {this.state.logged === true ? 
               <LogOut username={this.props.user? this.props.user.username :""} onClick={this.handleLogoutClick}></LogOut>  : 
               <Login onClick={this.handleLoginClick }></Login>}
            </NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { user: state.authReducer };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      logout: bindActionCreators(userActions.logout, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navi);

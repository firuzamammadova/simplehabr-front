import React, { useState, Component } from 'react';
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
    NavbarText
  } from 'reactstrap';
import { Link } from 'react-router-dom';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userActions } from "../../redux/actions/authActions";
import { history}  from "../../redux/reducers/helpers/history";


class Navi extends Component{
    constructor(props){
        super(props);
    
        this.toggle=this.toggle.bind(this);
        this.state={
            isOpen:false,
            
        };
    }
    componentDidMount(){

      
      if(this.props.user){
        this.setState({logged:true})
        console.log("sasad")
      }
      else{
        this.setState({logged:false})
        console.log("noo")

      }
      console.log(this.state.logged)
    }
    



   toggle = () => this.setIsOpen(!this.isOpen);
render(){
  return (
  
      <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
  <NavbarText>{this.state.logged==true  ? (<Link to="/login" onClick={()=>{
    this.setState({logged:false})
    this.props.actions.logout();
    console.log(this.state.logged)
   history.push('/')
  }}>Log out</Link>) : (<Link to="/login" onClick={()=>{
    console.log(this.state.logged)
    this.setState({logged:true})
   history.push('/login')
  }}>Log in</Link>)}</NavbarText>
        </Collapse>
      </Navbar>
    </div>
   
  );
}
}
function mapStateToProps(state) {
   
  return { user : state.authReducer };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      logout: bindActionCreators(userActions.logout, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navi);

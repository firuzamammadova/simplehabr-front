import React, { Component } from "react";
import { Form, FormGroup, Col, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userActions } from "../../redux/actions/authActions";

class Register extends Component {
  state = {
    username: "",
    password: "",
    repassword: "",

  };

  render() {
    return (
      <div className="col-lg-8 offset-lg-2">
        <h2>Login</h2>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            if(this.state.password===this.state.repassword){
            this.props.actions.register(this.state.username, this.state.password);}
           // window.location.reload();
          }}
        >
          <FormGroup row>
            <Col sm={7}>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                onChange={(e) => {
                  this.setState({ username: e.target.value });
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={7}>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={7}>
              <Input
                type="password"
                name="repassword"
                id="repassword"
                placeholder="Re-write Password"
                onChange={(e) => {
                  this.setState({ repassword: e.target.value });
                }}
              />
            </Col>
          </FormGroup>
          <Button color="primary">Register</Button>

        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    // currentCategory: state.changeCategoryReducer,
    user: state.RegisterReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      register: bindActionCreators(userActions.register, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
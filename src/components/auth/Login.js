import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../../redux/actions/authActions";
class Login extends Component {
  render() {
    return (
      <div>
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Username</Label>
            <Input
              type="username"
              name="username"
              id="username"
              placeholder="your username"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="your password"
            />
          </FormGroup>

          <Button>Log In</Button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
    // const productId = ownProps.match.params.productId;
    // const product =
    //   productId && state.productListReducer.length > 0
    //     ? getProductById(state.productListReducer, productId)
    //     : {};
    // return {
    //   product
    // };
  }
  
  const mapDispatchToProps = {
   // getCategories,
   // saveProduct,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login);
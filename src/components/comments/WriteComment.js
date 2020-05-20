import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as postActions from "../../redux/actions/postAction";
import * as commentActions from "../../redux/actions/commentActions";
import { Form, FormGroup, Input } from "reactstrap";
import $ from "jquery";

class WriteComment extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);

    this.state = {
      comment: {},
    };
  }
  componentDidMount() {
    if (this.props.comment) {
      this.setState({ edit: true });
      console.log(this.props.comment);
      $(`[id=comment${this.props.comment.postId}]:eq(0)`).val(
        this.props.comment.text
      );
    }
  }
  handleChange(e) {
    // console.log(e)
    var text = e.target.value;
    var postId = this.props.id;
    this.setState({ comment: { postId, text } });
  }
  getCorrectPosts(){
    if (this.props.profile) {
      this.props.profile();
       this.setState({profile:"true"})
     }
     else{
       this.props.actions.getPosts();
     }
  }

  keyPress(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      if (this.props.comment) {
        this.props.comment.text = $(
          `[id=comment${this.props.comment.postId}]:eq(0)`
        ).val();
        this.props.actions.edit(this.props.comment);
        $(`[id=comment${this.props.comment.postId}]:eq(0)`).val("");

        this.props.save();
      } else {
        this.props.actions.comment(this.state.comment);
      }
this.getCorrectPosts();
      this.setState({ comment: {} });
      e.target.value = "";
      // put the login here
    }
  }
  render() {
    return (
      <div>
        <Form className="margin">
          <FormGroup>
            <Input
              type="text"
              name="comment"
              placeholder="Write Comment"
              id={"comment" + this.props.id}
              onChange={(e) => {
                this.handleChange(e);
              }}
              onKeyDown={this.keyPress}
            />
          </FormGroup>
        </Form>
      </div>
    );
  }
}
function mapDistpatchToProps(dispatch) {
  return {
    actions: {
      getPosts: bindActionCreators(postActions.getPosts, dispatch),
        edit:bindActionCreators(commentActions.editComment,dispatch),
      comment: bindActionCreators(commentActions.addComment, dispatch),
    },
  };
}
function mapStateToProps(state) {
  return {
    // currentCategory: state.changeCategoryReducer,
    posts: state.postListReducer,
    user: state.authReducer,
  };
}

export default connect(mapStateToProps, mapDistpatchToProps)(WriteComment);

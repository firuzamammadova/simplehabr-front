import React, { Component } from "react";
import { Form, FormGroup, Input, Card, Button, CardSubtitle } from "reactstrap";
import $ from "jquery";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as postActions from "../../redux/actions/postAction";
class SharePost extends Component {
  state = {
    header: "",
    text: "",
    photourl: "lalala",
    edit: false,
  };

  componentDidMount() {
    if (this.props.post) {
      this.setState({ edit: true });
      console.log(this.props.post);
      $("[id=text]:eq(1)").val(this.props.post.text);
      $("[id=header]:eq(1)").val(this.props.post.header);
    }
  }
  componentWillMount() {
    this.props.profile === "true"
      ? this.props.actions.getUserPosts()
      : this.props.actions.getPosts();
  }

  render() {
    return (
      <div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();

            this.props.actions.getPosts();
            if (this.props.post) {
              this.props.post.header = $("[id=header]:eq(1)").val();
              this.props.post.photoUrl = this.state.photourl;
              this.props.post.text = $("[id=text]:eq(1)").val();
              this.props.actions.edit(this.props.post);
              this.props.save();
            } else {
              this.props.actions.share(
                this.state.header,
                this.state.photourl,
                this.state.text
              );
              $("#text").val("");
              $("#header").val("");
              this.setState({ header: "" });
              this.setState({ text: "" });
            }

            this.props.actions.getPosts();
            // window.location.reload();
          }}
        >
          <Card className="card share">
            {this.state.edit ? (
              <CardSubtitle className="post">
                <big>{this.props.post.username}</big>
              </CardSubtitle>
            ) : (
              <div></div>
            )}
            <br></br>
            <FormGroup>
              <Input
                type="text"
                name="header"
                placeholder="Your Header"
                id="header"
                onChange={(e) => {
                  this.setState({ header: e.target.value });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="textarea"
                name="text"
                placeholder="Share something"
                id="text"
                onChange={(e) => {
                  this.setState({ text: e.target.value });
                  console.log("fdsf");
                }}
              >
              </Input>
            </FormGroup>
            <Button color="primary">
              {" "}
              {this.state.edit ? "Save" : "Share Post"}
            </Button>
          </Card>
        </Form>
      </div>
    );
  }
}
function mapDistpatchToProps(dispatch) {
  return {
    actions: {
      getUserPosts: bindActionCreators(postActions.getUserPosts, dispatch),

      getPosts: bindActionCreators(postActions.getPosts, dispatch),
      share: bindActionCreators(postActions.sharePost, dispatch),
      edit: bindActionCreators(postActions.editPost, dispatch),
    },
  };
}
function mapStateToProps(state) {
  return {
    posts: state.postListReducer,
  };
}
export default connect(mapStateToProps, mapDistpatchToProps)(SharePost);

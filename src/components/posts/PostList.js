import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as postActions from "../../redux/actions/postAction";
import * as likeActions from "../../redux/actions/likeActions";
import {
  Form,
  FormGroup,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
} from "reactstrap";
import "./PostListStyle.css";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardBody,
  CardSubtitle,
} from "reactstrap";
import { Link } from "react-router-dom";
import Post from "../posts/Post";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.handleLikeClick = this.handleLikeClick.bind(this);
    this.handleDislikeClick = this.handleDislikeClick.bind(this);


    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);

    this.state = {
      header: "",
      text: "",
      photourl: "lalala",
      editActive: "",
    };
  }

  componentDidMount() {
    this.props.actions.getPosts();
  }
  handleEditClick(id) {
    console.log(id);
    this.setState({ editActive: id });
  }

  handleLikeClick(id) {
    this.props.actions.like(id);
    this.props.actions.getPosts();
  }

  handleDislikeClick(id) {
    this.props.actions.dislike(id);
    this.props.actions.getPosts();
  }
  handleDeleteClick(id) {
    console.log(this)
    this.props.actions.getPosts();

    this.props.actions.delete(id);
    this.props.actions.getPosts();
  }
  render() {
  
    return (
      <div>
        <div>
          <Form
            onSubmit={(e) => {
              e.preventDefault();

              this.props.actions.getPosts();
              this.props.actions.share(
                this.state.header,
                this.state.photourl,
                this.state.text
              );

              this.props.actions.getPosts();
              // window.location.reload();
            }}
          >
            <Card className="card share">
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
                  }}
                />
              </FormGroup>
              <Button color="primary">Share Post</Button>
            </Card>
          </Form>
        </div>

        {this.props.posts.map((p) => (
          <div>
            {p.id === this.state.editActive ? (
              <div className={p.id === this.state.editActive ? "" : "none"}>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();

                    this.props.actions.share(
                      this.state.header,
                      this.state.photourl,
                      this.state.text
                    );
                    // window.location.reload();
                  }}
                >
                  <Card className="card share">
                    <CardSubtitle className="post">
                      <big>{p.username}</big>
                    </CardSubtitle>
                    <FormGroup>
                      <Input
                        type="text"
                        name="header"
                        placeholder="Your Header"
                        id="header"
                        onChange={(e) => {
                          this.setState({ header: e.target.value });
                        }}
                        value={p.header}
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
                        }}
                        value={p.text}
                      />
                    </FormGroup>
                    <Button color="primary">Save</Button>
                  </Card>
                </Form>
              </div>
            ) : (
              <Post
                post={p}
                username={this.props.user.username}
                edit={this.handleEditClick}
                deletep={this.handleDeleteClick}
                like={this.handleLikeClick}
                dislike={this.handleDislikeClick}
              ></Post>
            )}
          </div>
        ))}
      </div>
    );
  }
}

// {p.likes.some((u) => u.username === this.props.user.username) ? (
//   <Dislike></Dislike>
// ) : (
//   <Like id={p.id} Click={this.handleLikeClick}></Like>
// )}
function mapDistpatchToProps(dispatch) {
  return {
    actions: {
      getPosts: bindActionCreators(postActions.getPosts, dispatch),
      share: bindActionCreators(postActions.sharePost, dispatch),
      like: bindActionCreators(likeActions.Like, dispatch),
      dislike: bindActionCreators(likeActions.Dislike, dispatch),
      delete: bindActionCreators(postActions.deletePost, dispatch),
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
export default connect(mapStateToProps, mapDistpatchToProps)(PostList);

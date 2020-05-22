import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import PostList from "../posts/PostList";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as likeActions from "../../redux/actions/likeActions";

import * as postActions from "../../redux/actions/postAction";
import * as commentActions from "../../redux/actions/commentActions";
import Comment from "../comments/Comment";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.getCorrectPosts = this.getCorrectPosts.bind(this);

    this.state = {
      username: "",
    };
  }
  componentDidMount() {
    this.props.actions.getUserPosts();
    if (this.props.match.params.username) {
      this.setState({ username: this.props.match.params.username });
      this.props.actions.getSpecPosts(this.props.match.params.username);
      this.props.actions.getSpecPosts(this.props.match.params.username);

      this.props.actions.getSpecPosts(this.props.match.params.username);
      this.props.actions.getSpecPosts(this.props.match.params.username);

      this.props.actions.getSpecLikes(this.props.match.params.username);
    }
    //this.props.actions.getComments();
  }
  getCorrectPosts() {
    if (this.props.match.params.username) {
      this.props.actions.getSpecPosts(this.props.match.params.username);
    } else {
      this.props.actions.getUserPosts();
    }
  }
  getCorrectComments() {
    if (this.props.match.params.username) {
      this.props.actions.getSpecUserComments(this.props.match.params.username);
    } else {
      this.props.actions.getUserComments();
    }
  }
  componentWillMount() {
this.getCorrectComments();  }
  render() {
    return (
      <div>
        <Row>
          <Col xs="4">
            <h3>ID: {this.state.username}</h3>
            <h3>{this.props.user.username}</h3>
            <br></br>
            <p>Comments:</p>
            {this.props.comments.map((c) => (
              <div>
<Comment comment={c} profile="true"></Comment>              </div>
            ))}
            <p>Likes:</p>
              {this.props.likes.map((l)=>(
                <p>{l.postId}</p>
              ))}
          </Col>
          <Col xs="8">
            <PostList profile={this.getCorrectPosts}></PostList>
          </Col>
        </Row>
      </div>
    );
  }
}
function mapDistpatchToProps(dispatch) {
  return {
    actions: {
      getUserPosts: bindActionCreators(postActions.getUserPosts, dispatch),
      getSpecPosts: bindActionCreators(postActions.getSpecUserPosts, dispatch),
      getSpecLikes:bindActionCreators(likeActions.getSpecUserLikes,dispatch),
      getUserComments: bindActionCreators(commentActions.getUserComments, dispatch),
      getSpecUserComments: bindActionCreators(commentActions.getSpecUserComments, dispatch),

    },
  };
}
function mapStateToProps(state) {
  return {
    // currentCategory: state.changeCategoryReducer,
    posts: state.postListReducer,
    user: state.authReducer,
    comments: state.commentReducer,
    likes:state.likeReducer
  };
}

export default connect(mapStateToProps, mapDistpatchToProps)(Profile);

import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import PostList from "../posts/PostList";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as postActions from "../../redux/actions/postAction";
import * as likeActions from "../../redux/actions/likeActions";
import * as commentActions from "../../redux/actions/commentActions";
import Comment from "../comments/Comment";

class Profile extends Component {

  constructor(props) {
    super(props);


    this.state = {
   username:""
    };

  }
  componentDidMount() {
    this.props.actions.getPosts();
    this.setState({username:this.props.match.params.username})
    console.log(this.props.match.params.username);
    this.props.actions.getComments();
  }
  componentWillMount(){
    console.log(this.props.match.params.username);

   // this.props.actions.getComments();
  
  }
  render() {
    const { handle } = this.props.match.params.username
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
          </Col>
          <Col xs="8">
            <PostList profile="true"></PostList>
          </Col>
        </Row>
      </div>
    );
  }
}
function mapDistpatchToProps(dispatch) {
  return {
    actions: {
      getPosts: bindActionCreators(postActions.getUserPosts, dispatch),
      getComments: bindActionCreators(commentActions.getUserComments, dispatch),
    },
  };
}
function mapStateToProps(state) {
  return {
    // currentCategory: state.changeCategoryReducer,
    posts: state.postListReducer,
    user: state.authReducer,
    comments: state.commentReducer,
  };
}

export default connect(mapStateToProps, mapDistpatchToProps)(Profile);

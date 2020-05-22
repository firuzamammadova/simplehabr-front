import React, { Component } from "react";
import Post from "./Post";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as postActions from "../../redux/actions/postAction";

class Detail extends Component {
  constructor(props) {
    super(props);

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.getPost = this.getPost.bind(this);
    this.state = {
      editActive: "",
      post: {},
    };
  }
  handleEditClick(id) {
    this.setState({ editActive: id });
  }

  handleSaveClick() {
    this.setState({ editActive: "8043ufpr3fjo" });
  }

  componentDidMount() {
    this.getPost();
  }
  componentWillMount() {
    this.getPost();
  }
  getPost() {
    this.props.actions.getPost(this.props.match.params.postId);
  }
  
  render() {
    var p = this.props.post;
    return (
      <div>
        {console.log(p.likes)}

        {//console.log(p.likes.length)
        }
        {/* <Post
                          post={this.props.post}
                          profile={this.getPost}
                          edit={this.handleEditClick}
                          username={this.props.user ? this.props.user.username : ""}
                          >

                          </Post> */}
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
      delete: bindActionCreators(postActions.deletePost, dispatch),
      getPost: bindActionCreators(postActions.getPostById, dispatch),
    },
  };
}
function mapStateToProps(state) {
  return {
    // currentCategory: state.changeCategoryReducer,
    posts: state.postListReducer,
    user: state.authReducer,
    post: state.postReducer,
  };
}
export default connect(mapStateToProps, mapDistpatchToProps)(Detail);

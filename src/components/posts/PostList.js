import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as postActions from "../../redux/actions/postAction";
import * as likeActions from "../../redux/actions/likeActions";
import * as commentActions from "../../redux/actions/commentActions";
import "./PostListStyle.css";

import Post from "../posts/Post";
import SharePost from "./SharePost";

class PostList extends Component {
  constructor(props) {
    super(props);

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
this.getCorrectPosts=this.getCorrectPosts.bind(this);
    this.state = {
      header: "",
      text: "",
      photourl: "lalala",
      editActive: "",
      profile:""
    };
  }

  componentDidMount() {
  
  }
  componentWillMount() {
    this.getCorrectPosts();

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
  handleEditClick(id) {
    this.setState({ editActive: id });
  }

  handleSaveClick() {
    this.setState({ editActive: "8043ufpr3fjo" });
  }

  render() {
    return (
      <div className={this.state.profile ? "" : "container2"}>
        {this.props.user ? (
          <SharePost profile={this.state.profile}></SharePost>
        ) : (
          <div />
        )}
        {this.state.profile ? (
          <div>
            <br></br>
            <p>Posts:</p>
          </div>
        ) : (
          <div></div>
        )}
        {this.props.posts.map((p) => (
          <div key={p.id}>
          
            {p.id === this.state.editActive ? (
              <SharePost
                profile={this.getCorrectPosts}
                post={p}
                save={this.handleSaveClick}
              ></SharePost>
            ) : (
              <Post
                post={p}
                profile={this.getCorrectPosts}
                edit={this.handleEditClick}
                username={this.props.user ? this.props.user.username : ""}
              ></Post>
            )}
          </div>
        ))}
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
      like: bindActionCreators(likeActions.Like, dispatch),
      dislike: bindActionCreators(likeActions.Dislike, dispatch),
      delete: bindActionCreators(postActions.deletePost, dispatch),
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
export default connect(mapStateToProps, mapDistpatchToProps)(PostList);

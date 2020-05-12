import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as postActions from "../../redux/actions/postAction";
import * as likeActions from "../../redux/actions/likeActions";
import * as commentActions from "../../redux/actions/commentActions"
import "./PostListStyle.css";

import Post from "../posts/Post";
import SharePost from "./SharePost";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.handleLikeClick = this.handleLikeClick.bind(this);
    this.handleDislikeClick = this.handleDislikeClick.bind(this);

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleReadMoreClick = this.handleReadMoreClick.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);

    this.state = {
      header: "",
      text: "",
      photourl: "lalala",
      editActive: "",
      readMoreActive: [],
      comment:{}
    };
  }

  componentDidMount() {
    this.props.actions.getPosts();
  }
  handleChange(e) {
   // console.log(e)
   var text=e.e.target.value ;
   var postId=e.post.id
    this.setState({ comment:{postId,text} });
  
  }

  keyPress(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      console.log("value", this.state.comment);
      this.props.actions.comment(this.state.comment);
      // put the login here
    }
  }
  handleEditClick(id) {
    this.setState({ editActive: id });
  }
  handleReadMoreClick(id) {
    if (this.state.readMoreActive.some((u) => u === id)) {
      this.setState({
        readMoreActive: this.state.readMoreActive.filter(function (person) {
          return person !== id;
        }),
      });
      console.log(this.state.readMoreActive + "remove");
    } else {
      this.state.readMoreActive.push(id);
      this.setState({ readMoreActive: this.state.readMoreActive });
    }
    console.log(this.state.readMoreActive);
  }
  handleSaveClick() {
    this.setState({ editActive: "8043ufpr3fjo" });
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
    console.log(this);
    this.props.actions.getPosts();

    this.props.actions.delete(id);
    this.props.actions.getPosts();
    this.props.actions.getPosts();
  }
  render() {
    const { expanded } = this.state;
    return (
      <div>
        {this.props.user ? <SharePost></SharePost> : <div />}

        {this.props.posts.map((p) => (
          <div>
            {p.id === this.state.editActive ? (
              <SharePost post={p} save={this.handleSaveClick}></SharePost>
            ) : (
              <Post
                post={p}
                username={this.props.user ? this.props.user.username : ""}
                edit={this.handleEditClick}
                deletep={this.handleDeleteClick}
                like={this.handleLikeClick}
                dislike={this.handleDislikeClick}
                readMore={this.state}
                moreclick={this.handleReadMoreClick}
                change={this.handleChange}
                keyPress={this.keyPress}
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
      getPosts: bindActionCreators(postActions.getPosts, dispatch),
      share: bindActionCreators(postActions.sharePost, dispatch),
      like: bindActionCreators(likeActions.Like, dispatch),
      dislike: bindActionCreators(likeActions.Dislike, dispatch),
      delete: bindActionCreators(postActions.deletePost, dispatch),
      comment:bindActionCreators(commentActions.addComment,dispatch)
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

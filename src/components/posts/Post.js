import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as postActions from "../../redux/actions/postAction";
import * as likeActions from "../../redux/actions/likeActions";
import * as commentActions from "../../redux/actions/commentActions";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Form,
  FormGroup,
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import $ from "jquery";
import CommentList from "../comments/CommentList";


class Post extends Component {


    constructor(props) {
        super(props);
        this.handleLikeClick = this.handleLikeClick.bind(this);
        this.handleDislikeClick = this.handleDislikeClick.bind(this);
    
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleReadMoreClick = this.handleReadMoreClick.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.keyPress = this.keyPress.bind(this);
    
        this.state = {
          readMoreActive: [],
          comment:{},
          visiblecomments:false
        };
      }
      toggleComments(){
        this.setState({visiblecomments:!this.state.visiblecomments})
        console.log(this.state.visiblecomments)
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
          this.props.actions.getPosts();
          this.setState({ comment:{} });
          e.target.value="";
          // put the login here
        }
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



    var post = this.props.post;
    function Like(props) {
      const id = props.id;

      return <Link onClick={() => props.Click(id)}>Like</Link>;
    }
    function Dislike(props) {
      const id = props.id;

      return <Link onClick={() => props.Click(id)}>Dislike</Link>;
    }
    function More(props) {
      const id = props.id;

      return (
        <UncontrolledDropdown>
          <DropdownToggle nav caret></DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={() => props.editClick(id)}>
              Edit
            </DropdownItem>
            <DropdownItem onClick={() => props.deleteClick(id)}>
              Delete
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    }
    function formatDate(string) {
      var options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(string).toLocaleDateString([], options);
    }
    function ReadMore(props) {
      var lengthoftext = post.text.length;
      if (lengthoftext > 200) {
        return (
          <div>
            <br></br>
            <CardText
              className={
                props.readMoreActive.some((u) => u === post.id)
                  ? ""
                  : "posttext"
              }
            >
              {post.text}
            </CardText>
            <Link onClick={() =>props.Click(post.id)}>
              {props.readMoreActive.some((u) => u === post.id)
                ? "Read Less"
                : "Read More"}
            </Link>
            <hr></hr>
          </div>
        );
      } else {
        return (
          <div>
            <CardText>{post.text}</CardText>
          </div>
        );
      }
    }
    return (
      <div>
        <Card key={post.id} className="card">
          {/* <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" /> */}
          <CardBody>
            <div className="grid">
              <div className="usernameAndDate">
                <h5 className="post">{post.username}</h5>
                <span className="date">{formatDate(post.sharedTime)}</span>
              </div>
              {this.props.username === post.username ? (
                <More
                  editClick={this.props.edit}
                  deleteClick={this.handleDeleteClick}
                  id={post.id}
                ></More>
              ) : (
                <div />
              )}
            </div>
            <h4>{post.header}</h4>

            <ReadMore Click={this.handleReadMoreClick} readMoreActive={this.state.readMoreActive}></ReadMore>

            <CardText>
              <div className="grid">
                <small>{post.likes.length} likes</small>
                <Link to=""
            onClick={()=>{
              this.toggleComments();
            }}
              style={{ textDecoration: "none", color: "black" }}><small>{post.comments.length} comments</small></Link>
              </div>
            </CardText>
            <div className="grid">
              {post.likes.some((u) => u.username === this.props.username) ? (
                <Dislike id={post.id} Click={this.handleDislikeClick}></Dislike>
              ) : (
                <Like id={post.id} Click={this.handleLikeClick}></Like>
              )}
              <span className="space"></span>
              <Link
                onClick={() => {
                  this.setState({visiblecomments:true});
                  $(`#comment${post.id}`).focus();
                }}
              >
                Comment
              </Link>
            </div>
          </CardBody>
          
          {this.state.visiblecomments?<CommentList post={post}></CommentList>:<div></div>}
          
        </Card>
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

export default connect(mapStateToProps, mapDistpatchToProps)(Post);

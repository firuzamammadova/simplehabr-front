import React, { Component } from 'react'


import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as postActions from "../../redux/actions/postAction";
import * as likeActions from "../../redux/actions/likeActions";
import * as commentActions from "../../redux/actions/commentActions";
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from "reactstrap";
  import { Link } from "react-router-dom";
  import { history}  from "../../redux//reducers/helpers/history";

class Comment extends Component {
    constructor(props) {
        super(props);

        this.deleteComment=this.deleteComment.bind(this);
        this.handleCommentClick=this.handleCommentClick.bind(this);

      }

    deleteComment(id){
        this.props.actions.delete(id);
        this.props.actions.getPosts();
    }
    handleCommentClick(){
      history.push('/posts/'+this.props.comment.postId);
      this.props.actions.getPost(this.props.comment.postId);
    }
    render() {
        var comment=this.props.comment;
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
        return (
            <div onClick={()=>(this.handleCommentClick()
            )}>
                <div className=" comment margin ">
               <span className="post"><Link to={"/profile/"+comment.username} className="post">{comment.username}</Link></span> <p className=" margin">{comment.text}</p>
               {this.props.profile? <div></div> :( <More deleteClick={this.deleteComment} editClick={this.props.edit} id={comment.id}></More>)}
              
               </div>
             
            </div>
        )
    }
}

function mapDistpatchToProps(dispatch) {
    return {
      actions: {
        getPosts: bindActionCreators(postActions.getPosts, dispatch),

        like: bindActionCreators(likeActions.Like, dispatch),
        dislike: bindActionCreators(likeActions.Dislike, dispatch),
        delete: bindActionCreators(commentActions.deleteComment, dispatch),
        comment: bindActionCreators(commentActions.addComment, dispatch),
        getPost: bindActionCreators(postActions.getPostById, dispatch),

      },
    };
  }
  function mapStateToProps(state) {
    return {
      posts: state.postListReducer,
      user: state.authReducer,
    };
  }
export default connect(mapStateToProps, mapDistpatchToProps)(Comment);

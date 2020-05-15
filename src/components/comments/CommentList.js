import React, { Component } from "react";
import Comment from "../comments/Comment";
import WriteComment from "./WriteComment";

export default class CommentList extends Component {

    constructor(props) {
        super(props);
    
        this.handleEditClick = this.handleEditClick.bind(this);
    this.handleSaveClick=this.handleSaveClick.bind(this);
        this.state = {
         
          editActive: "",
        };
      }
    
    
    
      handleEditClick(id) {
        this.setState({ editActive: id });
        console.log(this.state.editActive);
      }
      handleSaveClick() {
        this.setState({ editActive: "8043ufpr3fjo" });
      }
  render() {
    return (
      <div>
          <hr></hr>
        {this.props.post.comments.map((c) => (<div>
            {c.id===this.state.editActive? <WriteComment save={this.handleSaveClick} comment={c} id={c.postId}></WriteComment> :
          <Comment edit={this.handleEditClick} comment={c}></Comment>
             } </div> ))}
        <WriteComment id={this.props.post.id}></WriteComment>
      </div>
    );
  }
}

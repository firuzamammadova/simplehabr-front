import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "./PostListStyle.css";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Form,
  FormGroup,
  Input
} from "reactstrap";
import { Link } from "react-router-dom";
import $ from "jquery";


function Post({
  post,
  username = "",
  edit,
  deletep,
  like,
  dislike,
  moreclick,
  readMore,
}) {
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
          <DropdownItem onClick={() => props.editClick(id)}>Edit</DropdownItem>
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
  function  ReadMore(params) {
    var lengthoftext=post.text.length;
    if(lengthoftext>200){
      return (
        <div>
          <br></br>
        <CardText className={readMore.readMoreActive.some((u)=>u===post.id)?"": "posttext"}>{post.text}</CardText>
        <Link  onClick={()=>moreclick(post.id)}>
      {  readMore.readMoreActive.some((u)=>u===post.id)?"Read Less": "Read More"}
        </Link>
        <hr></hr>
        </div>
      )
    }
    else{
      return(
        <div><CardText>{post.text}</CardText></div>
      )
    }
  }
  return (
    <Card key={post.id} className="card">
      {/* <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" /> */}
      <CardBody>
        <div className="grid">
          <div className="usernameAndDate">
            <h5 className="post">{post.username}</h5>
            <span className="date">{formatDate(post.sharedTime)}</span>
          </div>
          {username === post.username ? (
            <More editClick={edit} deleteClick={deletep} id={post.id}></More>
          ) : (
            <div />
          )}
        </div>
        <h4>{post.header}</h4>
      
       <ReadMore></ReadMore>
    
        <CardText>
        <div className="grid">
          <small>
            {post.likes.length} likes 
          </small>
          <small>
         {post.comments.length} comments
          </small>
          </div>
        </CardText>
<div className="grid">
        {post.likes.some((u) => u.username === username) ? (
          <Dislike id={post.id} Click={dislike}></Dislike>
        ) : (
          <Like id={post.id} Click={like}></Like>
        )}
       <span className="space" ></span>
        <Link onClick={()=>{
$("#comment").focus();
        }}>Comment</Link>
        
        </div>
        
      </CardBody>
      <Form className="comment">
        <FormGroup>
              <Input
                type="text"
                name="comment"
                placeholder="Write Comment"
                id="comment"
              
              />
            </FormGroup>
        </Form>
    </Card>
  );
}
export default Post;

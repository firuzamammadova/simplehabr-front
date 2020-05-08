import React, { useState } from "react";
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

function Post({ post, username, edit, deletep, like, dislike }) {


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
        <DropdownToggle caret>More</DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={() => props.editClick(id)}>Edit</DropdownItem>
          <DropdownItem onClick={() => props.deleteClick(id)}>Delete</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
  return (
    <Card key={post.id} className="card">
      {/* <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" /> */}
      <CardBody>
        <div className="grid">
          <CardSubtitle className="post">
            <big>{post.username}</big>
          </CardSubtitle>

          {username == post.username ? (
            <More editClick={edit} deleteClick={deletep} id={post.id}></More>
          ) : (
            <div />
          )}
        </div>
        <CardTitle>{post.header}</CardTitle>
        {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
        <CardText>{post.text}</CardText>
        <CardText>
          <small>{post.likes.length} likes</small>
        </CardText>
        {post.likes.some((u) => u.username === username) ? (
          <Dislike id={post.id} Click={dislike}></Dislike>
        ) : (
          <Like id={post.id} Click={like}></Like>
        )}
      </CardBody>
    </Card>
  );
}
export default Post;

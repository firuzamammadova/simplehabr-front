import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as postActions from "../../redux/actions/postAction";
import * as likeActions from "../../redux/actions/likeActions";
import {
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  Label,
  NavLink,
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

class PostList extends Component {
  constructor(props) {
    super(props);
    this.handleLikeClick = this.handleLikeClick.bind(this);
    this.handleDislikeClick = this.handleDislikeClick.bind(this);

    this.state = {
      header: "",
      text: "",
      photourl: "lalala",
    };
  }

  componentDidMount() {
    this.props.actions.getPosts();
  }

  handleLikeClick(id) {
    this.props.actions.like(id);
  }

  handleDislikeClick(id) {
    this.props.actions.dislike(id);
  }
  render() {
    function Like(props) {
      const id = props.id;
      return <Link onClick={() => props.Click(id)}>Like</Link>;
    }
    function Dislike(props) {
      const id = props.id;

      return <Link onClick={() => props.Click(id)}>Dislike</Link>;
    }
    return (
      <div>
        <div>
          <Form
            onSubmit={(e) => {
              e.preventDefault();

              this.props.actions.share(
                this.state.header,
                this.state.photourl,
                this.state.text
              );
              // window.location.reload();
            }}
          >
            <Card className="card share">
              <FormGroup>
                <Input
                  type="text"
                  name="header"
                  placeholder="Your Header"
                  id="header"
                  onChange={(e) => {
                    this.setState({ header: e.target.value });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="textarea"
                  name="text"
                  placeholder="Share something"
                  id="text"
                  onChange={(e) => {
                    this.setState({ text: e.target.value });
                  }}
                />
              </FormGroup>
              <Button color="primary">Share Post</Button>
            </Card>
          </Form>
        </div>

        {this.props.posts.map((p) => (
          <Card key={p.id} className="card">
            {/* <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" /> */}
            <CardBody>
              <div className="grid">
                <CardSubtitle className="post">
                  <big>{p.username}</big>
                </CardSubtitle>
{this.props.user.username==p.username ?    <UncontrolledDropdown>
                  <DropdownToggle caret>More</DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Edit</DropdownItem>
                    <DropdownItem onClick={()=>this.props.actions.delete(p.id)}>Delete</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown> : <div/>} 
             
              </div>
              <CardTitle>{p.header}</CardTitle>
              {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
              <CardText>{p.text}</CardText>
              <CardText>
                <small>{p.likes.length} likes</small>
              </CardText>
              {p.likes.some((u) => u.username === this.props.user.username) ? (
                <Dislike id={p.id} Click={this.handleDislikeClick}></Dislike>
              ) : (
                <Like id={p.id} Click={this.handleLikeClick}></Like>
              )
              }
            </CardBody>
          </Card>
        ))}
      </div>
    );
  }
}

// {p.likes.some((u) => u.username === this.props.user.username) ? (
//   <Dislike></Dislike>
// ) : (
//   <Like id={p.id} Click={this.handleLikeClick}></Like>
// )}
function mapDistpatchToProps(dispatch) {
  return {
    actions: {
      getPosts: bindActionCreators(postActions.getPosts, dispatch),
      share: bindActionCreators(postActions.sharePost, dispatch),
      like: bindActionCreators(likeActions.Like, dispatch),
      dislike: bindActionCreators(likeActions.Dislike, dispatch),
      delete:bindActionCreators(postActions.deletePost,dispatch)

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

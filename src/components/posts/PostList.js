import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as postActions from "../../redux/actions/postAction";
import * as likeActions from '../../redux/actions/likeActions'
import {
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  Label,
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

class PostList extends Component {
  state = {
    header: "",
    text: "",
    photourl:"lalala"

  };
  componentDidMount() {
    
    this.props.actions.getPosts();
    console.log(this.props.loggedIn)
  }
  render() {
    return (
      <div>


        <div>
          <Form onSubmit={(e) => {
            e.preventDefault();
           
            this.props.actions.share(this.state.header, this.state.photourl,this.state.text);
           // window.location.reload();
          }}>
          <Card className="card share">
          <FormGroup>
              <Input type="text" 
              name="header" 
              placeholder="Your Header" 
              id="header" 
              onChange={(e) => {
                this.setState({ header: e.target.value });
              }}/>
            </FormGroup>
            <FormGroup>
              <Input type="textarea" 
              name="text" 
              placeholder="Share something" 
              id="text" 
              onChange={(e) => {
                this.setState({ text: e.target.value });
              }}/>
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
              <CardSubtitle className="post"><big >{p.username}</big></CardSubtitle>

              <UncontrolledDropdown >
              <DropdownToggle  caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Edit
                </DropdownItem>
                <DropdownItem>
                  Delete
                </DropdownItem>
          
              </DropdownMenu>
            </UncontrolledDropdown>
              </div>

              <CardTitle>{p.header}</CardTitle>
              {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
              <CardText>{p.text}</CardText>
              <CardText><small>{p.likes} likes</small></CardText>
             
              <Button onClick={(e) => {
            
           
            this.props.actions.like(p.id);
           // window.location.reload();
          }}>Like</Button>
            </CardBody>
          </Card>
        ))}
      </div>
    );
  }
}

function mapDistpatchToProps(dispatch) {
  return {
    actions: {
      getPosts: bindActionCreators(postActions.getPosts, dispatch),
      share:bindActionCreators(postActions.sharePost,dispatch),
      like:bindActionCreators(likeActions.Like,dispatch)
    },
  };
}
function mapStateToProps(state) {
  return {
    // currentCategory: state.changeCategoryReducer,
    posts: state.postListReducer,
    loggedIn : state.authReducer 

  };
}
export default connect(mapStateToProps, mapDistpatchToProps)(PostList);




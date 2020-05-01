import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as postActions from "../../redux/actions/postAction";
import { ListGroup, ListGroupItem } from "reactstrap";
import  './PostListStyle.css'
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardBody,
  CardSubtitle
} from "reactstrap";

class PostList extends Component {
  componentDidMount() {
    this.props.actions.getPosts();
  }
  render() {
    return (
      <div>
        {this.props.posts.map((p) => (
          <Card key={p.id} className='card'>
            {/* <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" /> */}
            <CardBody>
        <CardSubtitle>{p.username}</CardSubtitle>

              <CardTitle>{p.header}</CardTitle>
              {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
              <CardText>{p.text}</CardText>
              <Button>Like</Button>
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
    },
  };
}
function mapStateToProps(state) {
  return {
    // currentCategory: state.changeCategoryReducer,
    posts: state.postListReducer,
  };
}
export default connect(mapStateToProps, mapDistpatchToProps)(PostList);

import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import PostList from '../posts/PostList'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as postActions from "../../redux/actions/postAction";
import * as likeActions from "../../redux/actions/likeActions";
import * as commentActions from "../../redux/actions/commentActions";

 class Profile extends Component {
    componentDidMount() {
        this.props.actions.getPosts();
        console.log(this.props.posts);
      }
    render() {
        return (
            <div>
               <Row>
                   <Col xs="3"> mammadova
                   </Col>
                   <Col xs="9"><PostList profile="true"></PostList></Col>
               </Row>
            </div>
        )
    }
}
function mapDistpatchToProps(dispatch) {
    return {
      actions: {
        getPosts: bindActionCreators(postActions.getUserPosts, dispatch)
      },
    };
  }
  function mapStateToProps(state) {
    return {
      // currentCategory: state.changeCategoryReducer,
      posts: state.postListReducer
    };
  }
  
  export default connect(mapStateToProps, mapDistpatchToProps)(Profile);
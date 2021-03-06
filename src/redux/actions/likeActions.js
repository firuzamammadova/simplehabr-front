import * as actionTypes from "./actionTypes";
import authHeader from "../reducers/helpers/auth_header"



export  function Like(postId) {
    return dispatch => {
  
        like_success(postId)
            .then(
                user => { 
                    dispatch(success());
                    console.log('registered succesfully');
                   // dispatch(alertActions.success('Registration successful'));
                }
            );
    };
  
    function success(user) { return { type: actionTypes.LIKE, user } }
  }
  
  function like_success(postId) {
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(),'Content-Type': 'application/json'},
        body: ""
    };
  
    return fetch("https://localhost:5001/api/Like/like/"+postId.toString(), requestOptions);
  }

  export  function Dislike(postId) {
    return dispatch => {
  
        dislike_success(postId)
            .then(
                user => { 
                    dispatch(success());
                    console.log('registered succesfully');
                   // dispatch(alertActions.success('Registration successful'));
                }
            );
    };
  
    function success(user) { return { type: actionTypes.DISLIKE, user } }
  }
  
  function dislike_success(postId) {
    const requestOptions = {
        method: 'DELETE',
        headers: {...authHeader(),'Content-Type': 'application/json'},
        body: ""
    };
    console.log(authHeader())
    return fetch("https://localhost:5001/api/like/dislike/"+postId.toString(), requestOptions);
  }

  export function getSpecUserLikesSuccess(likes) {
    return {
      type: actionTypes.GET_SPEC_USER_LIKES,
      payload: likes,
    };
  }
  
  export function getSpecUserLikes(username) {
    return function (dispatch) {
      let url = "https://localhost:5001/api/like/getspecuserlikes/"+username;
      const requestOptions = {
        method: "GET",
        headers: { ...authHeader(), "Content-Type": "application/json" }
      };
      return fetch(url,requestOptions)
        .then((response) => response.json())
        .then((result) => dispatch(getSpecUserLikesSuccess(result)));
    };
  }


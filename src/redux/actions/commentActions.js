import * as actionTypes from "./actionTypes";
import authHeader from "../reducers/helpers/auth_header";


export function addComment_success() {
    return {
      type: actionTypes.SHARE_POST_SUCCESS,
    };
  }
  
  export function addComment(comment) {
    //console.log(authHeader());
    return function (dispatch) {
      const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(comment),
      };
      fetch("https://localhost:5001/api/comment/addcomment", requestOptions)
        .then((result) => dispatch(addComment_success(result)));
    };
  }

  export function deleteComment_success() {
    return {
      type: actionTypes.SHARE_POST_SUCCESS,
    };
  }
  
  export function deleteComment(commentid) {
    //console.log(authHeader());
    return function (dispatch) {
      const requestOptions = {
        method: "DELETE",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: "",
      };
      fetch("https://localhost:5001/api/comment/deletecomment/"+commentid, requestOptions)
        .then((result) => dispatch(deleteComment_success(result)));
    };
  }
  
  export function editComment_success() {
    return {
      type: actionTypes.SHARE_POST_SUCCESS,
    };
  }
  
  export function editComment(comment) {
    //console.log(authHeader());
    return function (dispatch) {
      const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(comment),
      };
      fetch("https://localhost:5001/api/comment/editcomment", requestOptions)
        .then((result) => dispatch(editComment_success(result)));
    };
  }
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
  
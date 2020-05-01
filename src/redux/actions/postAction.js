import * as actionTypes from "./actionTypes";

export function getPostsSuccess(posts) {
  return {
    type: actionTypes.GET_POSTS_SUCCESS,
    payload: posts,
  };
}

export function getPosts() {
    return function (dispatch) {
      let url = "https://localhost:5001/api/post/getallposts/";
   
  
      return fetch(url)
        .then((response) => response.json())
        .then((result) => dispatch(getPostsSuccess(result)));
    };
  }
  
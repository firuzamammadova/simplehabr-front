import * as actionTypes from "./actionTypes";
import authHeader from "../reducers/helpers/auth_header";
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

export function getUserPostsSuccess(posts) {
  return {
    type: actionTypes.GET_USER_POSTS_SUCCESS,
    payload: posts,
  };
}

export function getUserPosts() {
  return function (dispatch) {
    let url = "https://localhost:5001/api/post/getuserposts/";
    const requestOptions = {
      method: "GET",
      headers: { ...authHeader(), "Content-Type": "application/json" }
    };
    return fetch(url,requestOptions)
      .then((response) => response.json())
      .then((result) => dispatch(getUserPostsSuccess(result)));
  };
}

export function getSpecUserPostsSuccess(posts) {
 // console.log(posts);
  return {
    type: actionTypes.GET_SPEC_USER_POSTS_SUCCESS,
    payload: posts,
  };
}

export function getSpecUserPosts(username) {
  return function (dispatch) {
    let url = "https://localhost:5001/api/post/getspecuserposts/"+username;
    const requestOptions = {
      method: "GET",
      headers: { ...authHeader(), "Content-Type": "application/json" }
    };
    return fetch(url,requestOptions)
      .then((response) => response.json())
      .then((result) => dispatch(getSpecUserPostsSuccess(result)));
  };
}

export function getPostByIdSuccess(post) {
  // console.log(posts);
   return {
     type: actionTypes.GET_POST_BY_ID,
     payload: post,
   };
 }
 
 export function getPostById(postId) {
   return function (dispatch) {
     let url = "https://localhost:5001/api/post/detail/"+postId;
     const requestOptions = {
       method: "GET",
       headers: { ...authHeader(), "Content-Type": "application/json" }
     };
     return fetch(url,requestOptions)
       .then((response) => response.json())
       .then((result) => dispatch(getPostByIdSuccess(result)));
   };
 }



export function sharePost_success(header, photourl, text) {
  return {
    type: actionTypes.SHARE_POST_SUCCESS,
  };
}

export function sharePost(header, photourl, text) {
  //console.log(authHeader());
  return function (dispatch) {
    const requestOptions = {
      method: "POST",
      headers: { ...authHeader(), "Content-Type": "application/json" },
      body: JSON.stringify({ header, photourl, text }),
    };
    fetch("https://localhost:5001/api/post/sharepost", requestOptions)
      .then(handleResponse)
      .then((result) => dispatch(sharePost_success(result)));
  };
}



export function editPost_success(post) {
  return {
    type: actionTypes.SHARE_POST_SUCCESS,
  };
}

export function editPost(post) {
  //console.log(authHeader());
  return function (dispatch) {
    const requestOptions = {
      method: "POST",
      headers: { ...authHeader(), "Content-Type": "application/json" },
      body: JSON.stringify( post ),
    };
    console.log(post)
    fetch("https://localhost:5001/api/post/editpost", requestOptions)
      .then(handleResponse)
      .then((result) => dispatch(sharePost_success(result)));
  };
}


export function deletePost_success(postId) {
  return {
    type: actionTypes.DELERE_POST,
  };
}
export function deletePost(postId) {
  return function (dispatch) {
    const requestOptions = {
      method: "DELETE",
      headers: { ...authHeader(), "Content-Type": "application/json" },
      body: "",
    };
    fetch(
      "https://localhost:5001/api/post/deletepost/" + postId.toString(),
      requestOptions
    ).then(handleResponse);
  };
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

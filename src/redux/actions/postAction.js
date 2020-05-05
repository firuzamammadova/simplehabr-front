import * as actionTypes from "./actionTypes";
import authHeader from "../reducers/helpers/auth_header"
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

   export function sharePost(header,photourl,text) {
    return dispatch => {
        
  
        sharePost_success({header,photourl,text})
            .then(
                post => { 
                    dispatch(success());
                    console.log('registered succesfully');
                   // dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    console.log(error.toString());
                    //dispatch(alertActions.error(error.toString()));
                }
            );
    };
  
    function success(post) { return { type: actionTypes.SHARE_POST_SUCCESS, post } }
    function failure(error) { return { type: actionTypes.SHARE_POST_FAILURE, error } }
  }

  function sharePost_success(post) {
    const requestOptions = {
        method: 'POST',
        headers:{...authHeader(),'Content-Type': 'application/json'} ,
        body: JSON.stringify(post)
    };
  //console.log(authHeader());
    return fetch("https://localhost:5001/api/post/sharepost", requestOptions).then(handleResponse);

  

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
}}

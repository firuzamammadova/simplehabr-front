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
  
    return fetch("https://localhost:5001/api/like/like/"+postId.toString(), requestOptions);
  }



import * as actionTypes from "./actionTypes";

export function LoginSuccess(token) {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: token,
  };
}



export  function login(username, password) {
  return dispatch => {
      dispatch(request({ username }));

      LoginApi({username, password})
          .then(
              data => { 
                  dispatch(success(data));
                 // history.push('/');
              },
              error => {
                  dispatch(failure(error.toString()));
                 // dispatch(alertActions.error(error.toString()));
              }
          );
  };

  function request(token) { return { type: actionTypes.LOGIN_REQUEST, token } }
  function success(token) { return { type: actionTypes.LOGIN_SUCCESS, token } }
  function failure(error) { return { type: actionTypes.LOGIN_FAILURE, error } }
}

export  function logout() {
  localStorage.removeItem('token');
  return { type: actionTypes.LOGOUT };
}






// export function LoginApi(user) {
//     return fetch("https://localhost:5001/api/auth/login", {
//       method:  "POST",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify(user),
//     })
//       .then(handleResponse)
//       .then(data => {
//         // store user details and jwt token in local storage to keep user logged in between page refreshes
//         localStorage.setItem('token', JSON.stringify(data));
//         console.log(data);
//         return data;
//     });
  //}
  function LoginApi(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch("https://localhost:5001/api/auth/login", requestOptions)
        .then(handleResponse)
        .then(data => {
          console.log(data);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', JSON.stringify(data));

            return data;
        });
}

function handleResponse(response) {
  return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
          if (response.status === 401) {
              // auto logout if 401 response returned from api
              logout();
              //location.reload(true);
          }

          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }

      return data;
  });
}
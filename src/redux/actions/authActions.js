import * as actionTypes from "./actionTypes";
import { history}  from "../reducers/helpers/history";



export const userActions = {
  login,
  logout,
  register
};

function register(username,password) {
  return dispatch => {
      dispatch(request(username));

      register_success(username,password)
          .then(
              user => { 
                  dispatch(success());
                  history.push('/login');
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

  function request(user) { return { type: actionTypes.REGISTER_REQUEST, user } }
  function success(user) { return { type: actionTypes.REGISTER_SUCCESS, user } }
  function failure(error) { return { type: actionTypes.REGISTER_FAILURE, error } }
}

function register_success(username,password) {
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username,password})
  };

  return fetch("https://localhost:5001/api/auth/register", requestOptions).then(handleResponse);
}

function login(username, password) {
  return (dispatch) => {
    dispatch(request({ username }));

    login_success(username, password).then(
      (user) => {
        dispatch(success(user));
        history.push("/");
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: actionTypes.LOGIN_REQUEST, payload:username };
  }
  function success(user) {
    return { type: actionTypes.LOGIN_SUCCESS, payload:username };
  }
  function failure(error) {
    return { type: actionTypes.LOGIN_FAILURE, error };
  }
}

function login_success(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  //console.log(requestOptions);
  return fetch("https://localhost:5001/api/auth/login", requestOptions)
    .then(handleResponse)
    .then((data) => {
      localStorage.setItem("user", JSON.stringify({data,username}));

      return data;
    });
}

function logout() {
  //userService.logout();
  localStorage.removeItem("user");

  return { type: actionTypes.LOGOUT };
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

import * as actionTypes from "./actionTypes";
import { createBrowserHistory } from 'history';

export const userActions = {
  login_success,
  logout,
};

 function login_success(username, password) {
  return (dispatch) => {
    dispatch(request({ username }));

    login(username, password).then(
      (user) => {
        dispatch(success(user));
       // history.push("/");
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: actionTypes.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: actionTypes.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: actionTypes.LOGIN_FAILURE, error };
  }
}

function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  return fetch("https://localhost:5001/api/auth/login", requestOptions)
    .then(handleResponse)
    .then((user) => {
      localStorage.setItem("user", JSON.stringify(user));
      console.log(user);
      return user;
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
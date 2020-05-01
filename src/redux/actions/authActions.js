import * as actionTypes from "./actionTypes";

export function LoginSuccess(token) {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: token,
  };
}



export function LoginApi(user) {
    return fetch("https://localhost:5001/api/auth/login", {
      method:  "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    })
      .then(handlerResponse)
      .catch(handleError);
  }
  export function Login(user) {
    return function (dispatch) {
      return LoginApi(user).then((token) => {
        dispatch(LoginSuccess(token));
      }).catch(error=>{
          throw error;
      });
    };
  }
  export async function handlerResponse(response){
    if(response.ok){
        return response.json()
    }
    const error=await response.text();
    throw  new Error(error)
}

export function handleError(error){
    console.error("Error occured");
    throw error;
}
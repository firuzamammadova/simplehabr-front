export default function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user')).data;

    if (user && user.tokenString) {
        return { 'Authorization': 'Bearer ' + user.tokenString };
    } else {
        return {};
    }
}
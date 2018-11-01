const Auth = {
    isAuthenticated() {
        return localStorage.getItem("currentUser");
    },
    authenticate(user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        return true;
    },
    unauthenticate() {
        localStorage.removeItem("currentUser");
        return true;
    }
}

export default Auth;

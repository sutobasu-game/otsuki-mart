const USERS = {
  "207love": "a@267540"
};

function login(id, pin) {
  if (USERS[id] && USERS[id] === pin) {
    localStorage.setItem("loggedInUser", id);
    return true;
  }
  return false;
}

function logout() {
  localStorage.removeItem("loggedInUser");
}

function isLoggedIn() {
  return localStorage.getItem("loggedInUser") !== null;
}

function getLoggedInUser() {
  return localStorage.getItem("loggedInUser");
}

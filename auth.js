const USERS = {
  "207love": "a@267540"
};

export function login(id, pin) {
  if (USERS[id] && USERS[id] === pin) {
    localStorage.setItem("loggedInUser", id);
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem("loggedInUser");
}

export function isLoggedIn() {
  return localStorage.getItem("loggedInUser") !== null;
}

export function getLoggedInUser() {
  return localStorage.getItem("loggedInUser");
}

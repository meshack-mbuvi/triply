export function authGuard(_to, _from, next) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user.token) {
    next();
  } else {
    next("/login");
  }
}

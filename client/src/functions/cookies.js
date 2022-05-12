const setCookie = (cookieName, cookie, exDate) => {
  document.cookie = `${cookieName}=${cookie}; expires=${exDate}; path=/`;
};

const getCookie = (cookieName) => {
  let name = cookieName + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

const clearCookie = (cookieName) => {
  return (document.cookie = `AuthToken=; path=/; domain=localhost; expires=${new Date(
    0
  ).toUTCString()};`);
};

export { setCookie, getCookie, clearCookie };

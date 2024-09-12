export function deleteAllCookies() {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++)
    deleteCookie(cookies[i].split("=")[0]);
}

export function deleteCookie(name) {
  setCookie(name, "", -1);
}

export function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function setCookie(name, value, exp) {
  var expires = "";

  if (exp) {
    var date = new Date(exp);

    if (!isNaN(date.getTime())) {
      expires = "; expires=" + date.toUTCString();
    }
  }

  document.cookie = `${name}=${value}${expires}; path=/`;
}

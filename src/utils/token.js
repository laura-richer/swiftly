// export const checkToken = () => {
//   const token = window.localStorage.getItem("token");
//   const currentDateTime = new Date().getTime();
//   const tokenExpires = new Date(window.localStorage.getItem("tokenExpires"));

//   if (!token || !tokenExpires) return false;

//   // if token is expired, refresh and set new token
//   if (currentDateTime > tokenExpires) {
//     fetchRefreshedToken().then(response => {
//       console.log(response);
//       // Get and set new token & return true

//       return true;
//     }).catch(error => {
//       console.log(error);
//     })
//   }

//   // If theres already a valid token, nothing to do, return true
//   return true;
// }

export const checkToken = (token) => {
  const currentDateTime = new Date().getTime();
  const tokenExpires = new Date(window.localStorage.getItem("tokenExpires"));
  const tokenExpired = currentDateTime > tokenExpires;

  return !token || tokenExpired ? false : true
}

export const getToken = () => {
  const hash = window.location.hash;
  let token = window.localStorage.getItem("token");

  if (!token && hash) {
    token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
    const expiresIn = hash.substring(1).split("&").find(elem => elem.startsWith("expires_in")).split("=")[1];

    window.localStorage.setItem('tokenExpires', getExpiryTime(expiresIn));
    window.localStorage.setItem("token", token);
  };

  return token;
}

export const getExpiryTime = (tokenExpires, date = new Date()) => {
  const expiresInHours = Math.floor(tokenExpires / 3600);
  date.setTime(date.getTime() + expiresInHours * 60 * 60 * 1000);

  return date;
}

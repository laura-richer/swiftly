import axios from 'axios';

// export const fetchAccessToken = async (code) => {
//   const { data } = await axios.post('https://accounts.spotify.com/api/token',
//     serialize({
//       grant_type: 'authorization_code',
//       code: code,
//       redirect_uri: config.REDIRECT_URI
//     }), {
//       headers: tokenHeaders,
//     });

//   return data;
// }

export const fetchUserData = async (token) => {
  const { data } = await axios.get('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return data;
}

const serialize = function(obj) {
  var str = [];
  for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
  }
  return str.join("&");
}

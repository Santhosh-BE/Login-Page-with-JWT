// return the user data from the session storage
export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
  }


// axios.interceptors.request.use(async (req) => {
//   if(isTokenExpired()){
//       await getRefreshToken()
//   }
  
  // return the token from the session storage
  export const getToken = () => {
    // console.log("getvalue",sessionStorage.getItem('token'))
    return sessionStorage.getItem('token') || null;
  }
  export const getRefreshToken = () => {
    return sessionStorage.getItem('refreshtoken') || null;
  }
  
  // remove the token and user from the session storage
  export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refreshtoken');
  }
  
  // set the token and user from the session storage
  export const setUserSession = (token, refreshtoken) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('refreshtoken', refreshtoken);
    sessionStorage.setItem("date1", new Date())
  }
export const getAccessToken = () => {
    const userSession = JSON.parse(localStorage.getItem('user_session')|| '{}');

    return userSession ? userSession.token : null;
};

export const getRoles = () => {
    const userSession = JSON.parse(localStorage.getItem('user_session')|| '{}');
    return userSession ? userSession.roles : null;
};

export const getRefreshToken = () => {
    const userSession = JSON.parse(localStorage.getItem('user_session')|| '{}');
    return userSession ? userSession.refreshToken : null;
};

export const getUserSession = () => {
    return JSON.parse(localStorage.getItem('user_session')|| '{}');
};

export const setUserSession = (userSession:any) => {
    localStorage.setItem('user_session', JSON.stringify(userSession)|| '{}');
};

export const setToken = (accessToken:any) => {
    console.log(accessToken )
    const userSession = JSON.parse(localStorage.getItem('user_session')|| '{}');
    userSession.token = accessToken.token;
    userSession.refreshToken = accessToken.refreshToken;
    localStorage.setItem('user_session', JSON.stringify(userSession));
};

export const clearUserSession = () => {
  
    localStorage.removeItem('user_session');
};
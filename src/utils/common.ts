import { getAccessToken, getRefreshToken, setToken, clearUserSession,  } from './localStorageHelper';
import { createBrowserHistory } from 'history';
import axios from "axios";
import { BASE_API_URL } from './config';
export const history = createBrowserHistory();
export const MaintainSession = () => {
    const token = getAccessToken();//get info token 
    const currentPath = window.location.pathname;


    if (token) { //check token tồn tại hay không nếu có thì trả về trang chủ không thì trang login

        if (currentPath === '/' || currentPath === '/auth/login') {   
            history.push('/')
         
        }
        // const decode = jwt_decode(token);
      
        // updateStore(decode);
    }
    else {
        history.push('/auth/login');
    }
};
export const setAuthHeader = () => {
    const token = getAccessToken();
   
    if (token) { 
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        addRefreshToken()
    }
};
export const removeAuthHeader = () => {
    delete axios.defaults.headers.common['Authorization'];
};

export const addRefreshToken = () => {
    let isRefreshing = false;
    const interceptor = axios.interceptors.response.use((response) => {
        
        return response
    },
 
        async error => {
        
            const originalRequest = error.response.config;
          
            if (error.response.status !== 401) {
                return Promise.reject(error);
            }
            if (error.response.status === 401 && originalRequest.url === `${BASE_API_URL}/Permission/Auth/RefreshToken`) {
                clearUserSession();
                // history.push('auth/login');
                return Promise.reject(error);
            }

            /* 
            * When response code is 401, try to refresh the token.
            * Eject the interceptor so it doesn't loop in case
            * token refresh causes the 401 response
            */
            // axios.interceptors.response.eject(interceptor);
            if (error.response.status === 401) {
        
                if (!isRefreshing) {
                    isRefreshing = true;
                    return await axios.post(`${BASE_API_URL}/Permission/Auth/RefreshToken`,
                        {
                            accessToken: getAccessToken(),
                            refreshToken: getRefreshToken()
                        }
                    )
                        .then(({ data }) => {
                            const result = data;
                            setToken(result.data.accessToken);
                            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.accessToken.token}`;
                            return axios(originalRequest);
                        })
                        .catch(error => {
                            return Promise.reject(error);
                        })
                        .finally(() => {
                            isRefreshing = false;
                        });
                }

            }
           
        });
};
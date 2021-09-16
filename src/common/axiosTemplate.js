import axios from "axios";
import getCookie from "../helpers/getCookie";


const defaultHeaders = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json;charset=utf-8"
}

const defaultCorsOptions = {
    withCredentials: true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN"
}

export default async (method, url = null, data = {}, headers = {}) => {

    const baseUrl = 'https://localhost:5001/api';
    const loginPagePath = 'https://localhost:3000/login';

    const config = {
        method: method,
        headers: {
            ...defaultHeaders,
            ...headers
        },
        url: `${baseUrl}/${url}`,
        data: data,
        ...defaultCorsOptions
    };

    return axios(config)
        .catch(async err => {
            // If one of the request will returned status unauthorized,
            // it'll send the request for try to refresh the tokens
            if(err.response.status === 401) {
                const response = await axios({
                    method: 'POST',
                    url: `${baseUrl}/auth/refresh`,
                    headers: {
                        ...defaultHeaders
                    },
                    data: { expiredJwtToken: localStorage.getItem("access_token") },
                    ...defaultCorsOptions
                });

                // status code, which received from custom exception filter from server side,
                // in this context it means that refresh token has been expired and it'll throw the user from the system.
                if (response.data.statusCode === 500) {
                    localStorage.removeItem("user");
                    localStorage.removeItem("access_token");
                    window.location.replace(loginPagePath);
                } else {
                    // Retry to make the previous request
                    // Updating the access_token, which retrieved after refresh
                    localStorage.setItem("access_token", response.data.access_token);
                    config.headers["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`;
                    return axios(config);
                }
            }
            return err;
        });
}
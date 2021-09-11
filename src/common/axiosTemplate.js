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
        .then(data => data)
        .catch(async err => {
            // If one of the request will received status unauthorized,
            // it'll send the request for try to refresh the tokens
            if(err.response.status === 401) {
                const response = await axios({
                    method: 'POST',
                    url: `${baseUrl}/auth/refresh`,
                    headers: {
                        ...defaultHeaders
                    },
                    ...defaultCorsOptions
                });

                // status code, which received from custom exception filter from server side,
                // in this context it means that refresh token has been expired and it'll throw the user from the system.
                if (response.data.statusCode === 500) {
                    await axios({
                        method: 'POST',
                        url: `${baseUrl}/auth/logout`,
                        headers: {
                            ...defaultHeaders
                        },
                        ...defaultCorsOptions
                    });
                    window.location.replace(loginPagePath);
                } else {
                    // Retry to make the previous request
                    // Updating the access_token, which retrieved after refresh
                    config.headers["Authorization"] = `Bearer ${getCookie("access_token")}`;
                    return axios(config);
                }
            }
        });
}
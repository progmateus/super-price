import axios, { AxiosError } from "axios"
import { parseCookies, setCookie } from "nookies"
import { signOut } from "../contexts/AuthContext";
import { AuthTokenError } from "../errors/authTokenError";

let isRefreshing = false;
let failedRequestQueue = [];

export function setupAPIClient(ctx = undefined) {

    let cookies = parseCookies(ctx);


    const api = axios.create({
        baseURL: "http://localhost:3333",
        headers: {
            Authorization: `Bearer ${cookies['super-price.token']}`
        }
    })


    api.interceptors.response.use(response => {
        return response
    }, (error) => {



        if (error.response.status === 401) {
            if (error.response.data?.message == "Invalid Token") {

                cookies = parseCookies(ctx);

                const { "super-price.refreshToken": refreshToken } = cookies;
                const originalConfig = error.config;

                if (!isRefreshing) {
                    isRefreshing = true;

                    api.post("refresh-token", {
                        token: refreshToken
                    }).then(response => {
                        const { token, refresh_token } = response.data

                        setCookie(ctx, "super-price.token", token, {
                            maxAge: 60 * 60 * 24 * 30, // 30 days
                            path: "/"
                        });

                        setCookie(ctx, "super-price.refreshToken", refresh_token, {
                            maxAge: 60 * 60 * 24 * 30, // 30 days
                            path: "/"
                        });

                        api.defaults.headers['Authorization'] = `Bearer ${token}`

                        failedRequestQueue.forEach(request => request.onSuccess(token))
                        failedRequestQueue = []
                    }).catch(error => {
                        failedRequestQueue.forEach(request => request.onFailure(error))
                        failedRequestQueue = []

                        /// ou process.browser (foi preterido)
                        if (typeof window) {
                            signOut();
                        }

                    }).finally(() => {
                        isRefreshing = false;
                    })
                }

                return new Promise((resolve, reject) => {
                    failedRequestQueue.push({
                        onSuccess: (token: string) => {
                            originalConfig.headers["Authorization"] = `Bearer ${token}`

                            resolve(api(originalConfig));
                        },
                        onFailure: (error: AxiosError) => {
                            reject(error);
                        }
                    })
                })
            } else {

                if (typeof window) {
                    signOut();
                } else {
                    return Promise.reject(new AuthTokenError())
                }
            }
        }
        return Promise.reject(error);
    });

    return api
}
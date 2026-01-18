import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios"
import { Settings } from "../config/settings.js"
import { makeToken } from "./helpers.js"
import { log } from "console"

interface BaseHttpClientOptions {
    baseURL: string
    secret?: string
    requestInterceptors?: Array<(config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig>
    responseInterceptors?: Array<(response: any) => any>
}

export default class BaseHttpClient {

    http: AxiosInstance
    private __secret: string | undefined

    constructor(options: BaseHttpClientOptions) {
        console.log({options});
        process.exit(1)
        this.__secret = options.secret
        const withCredentials = !!options.secret 
        this.http = axios.create({
            baseURL: options.baseURL,
            withCredentials,
        })

        this.registerInterceptors(options.requestInterceptors, options.responseInterceptors)
    }
    private registerInterceptors(requestInterceptors?: Array<(config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig>, responseInterceptors?: Array<(response: any) => any>  ) {
        //Request Interceptors
        if(this.__secret){
            log("here")
            process.exit(1)
           const secret = this.__secret
            this.http.interceptors.request.use(
                function addAuthToRequest(config: InternalAxiosRequestConfig) {
                    const token = makeToken(secret)
                    config.headers.Authorization = `Bearer ${token}`
                    return config
                }
            )
        }
        if(Array.isArray(requestInterceptors)){
            requestInterceptors.forEach(interceptor => {
                this.http.interceptors.request.use(interceptor)
            })
        }

        //Response Interceptors
        if(Array.isArray(responseInterceptors)){
            responseInterceptors.forEach(interceptor => {
                this.http.interceptors.response.use(interceptor)
            })
        }
    }
}



function responseInterceptor(response: any) {
    if (response.status === 401) {
        console.warn('Unauthorized response from DoorDash service')
    }
    return response
}

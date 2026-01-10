import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { TenYourConfig } from '#config/tenyour'
import jwt from 'jsonwebtoken'
import {Settings} from "../../config/settings.js";

class DoorDashClient {
    http: AxiosInstance
    constructor() {
        this.http = axios.create({
            baseURL: Settings.Servers.DOORDASH,
            withCredentials: true,
        })
        this.registerInterceptors()
    }

    makeToken(service: any = 'SurveyService', expiresInMinutes: number = 5) {
        return makeToken(service, expiresInMinutes)
    }

    private registerInterceptors() {
        //Request Interceptors
        this.http.interceptors.request.use(addAuthToRequest)

        //Response Interceptors
        this.http.interceptors.response.use(responseInterceptor)
    }
}

function addAuthToRequest(config: InternalAxiosRequestConfig) {
    const token = makeToken()
    config.headers.Authorization = `Bearer ${token}`
    return config
}
function responseInterceptor(response: any) {
    if (response.status === 401) {
        console.warn('Unauthorized response from email service')
    }
    return response
}

function makeToken(service: any = 'UserService', expiresInMinutes: number = 5) {
    if (expiresInMinutes > 10) {
        throw new Error('Token expiration time cannot exceed 10 minutes')
    }
    const tenyourSecret = TenYourConfig.EmailServiceSettings.SECRET
    return jwt.sign({ service, timestamp: Date.now() }, tenyourSecret!, {
        expiresIn: `${expiresInMinutes}m`,
    })
}

const emailClient = new EmailClient()
export default emailClient

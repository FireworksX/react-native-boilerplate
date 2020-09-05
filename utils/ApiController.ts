import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios'
import App from 'constants/App'
import {
    IApiController,
    IApiResponse,
    ResponseState,
} from 'types/ApiControllerTypes'

export default class ApiController implements IApiController {
    private $: AxiosInstance

    private static globalInstance: AxiosInstance

    constructor(config?: AxiosRequestConfig) {
        if (ApiController.globalInstance === undefined) {
            ApiController.globalInstance = axios.create({
                baseURL: `${App.APP_PATH}/api/${App.API_VERSION}`,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
            })
        }

        if (config) {
            this.$ = axios.create(config)
        } else {
            this.$ = ApiController.globalInstance
        }
    }

    get(url: string, config?: AxiosRequestConfig): IApiResponse {
        return ApiController.parseResponse(this.$.get(url, config))
    }

    post(url: string, data?: any, config?: AxiosRequestConfig): IApiResponse {
        return ApiController.parseResponse(this.$.post(url, data, config))
    }

    delete(url: string, config?: AxiosRequestConfig): IApiResponse {
        return ApiController.parseResponse(this.$.delete(url, config))
    }

    setToken(token: string) {
        this.$.defaults.headers.Bearer = token
    }

    static async parseResponse(req: AxiosPromise): IApiResponse {
        try {
            const data = await req
            return {
                state: ResponseState.done,
                get isError() {
                    return false
                },
                data: data.data,
                headers: data.headers,
            }
        } catch (e) {
            return {
                state: ResponseState.error,
                get isError() {
                    return true
                },
                error: e,
                errorMessage: e.message,
            }
        }
    }
}

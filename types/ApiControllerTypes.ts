import { AxiosRequestConfig } from 'axios'

export interface IApiControllerDefault {
    get(url: string, config?: AxiosRequestConfig): IApiResponse
    post(url: string, data?: any, config?: AxiosRequestConfig): IApiResponse
    delete(url: string, config?: AxiosRequestConfig): IApiResponse
}

export interface IApiController extends IApiControllerDefault {
    setToken(token: string): void
    authUser(login: string, password: string): IApiResponse
}

export type IApiResponse = Promise<IResponse>

export enum ResponseState {
    done = 'done',
    error = 'error',
}

export interface IResponse {
    state: ResponseState
    readonly isError: boolean
    data?: any
    headers?: any
    error?: Error
    errorMessage?: string
}

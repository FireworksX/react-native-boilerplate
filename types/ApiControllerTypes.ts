import { AxiosRequestConfig } from 'axios'

export interface IApiController {
    get(url: string, config?: AxiosRequestConfig): IApiResponse
    post(url: string, data?: any, config?: AxiosRequestConfig): IApiResponse
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

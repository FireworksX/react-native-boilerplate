import axios, {
    AxiosInstance,
    AxiosPromise,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios'
import {
    ActivitiesSearchFilter,
    ApiControllerType,
    RegisterFinishProps,
    Response,
    UserEditProps,
} from '../types/ApiController.types'
import { ActivitiesFilterProps } from '../store/modules/ActivitiesFilter'
import App from '../constants/App'

export default class ApiController implements ApiControllerType {
    private readonly $: AxiosInstance

    constructor() {
        this.$ = axios.create({
            baseURL: `${App.APP_PATH}/api/${App.API_VERSION}`,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
    }

    get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this.$.get(url, config)
    }

    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this.$.post(url, data, config)
    }

    delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this.$.delete(url, config)
    }

    setToken(token: string) {
        this.$.defaults.headers['X-Token'] = token
    }

    async login(login: string, password: string): Promise<Response> {
        return await ApiController.parseResponse(
            this.post('/auth/', {
                login,
                password,
            })
        )
    }

    async register(email: string, password: string): Promise<Response> {
        return await ApiController.parseResponse(
            this.post('/register/', {
                email,
                password,
            })
        )
    }

    async registerFinish(props: RegisterFinishProps): Promise<Response> {
        return await ApiController.parseResponse(
            this.post('/register/profile/', props)
        )
    }

    async recoveryUser(loginOrEmail: string): Promise<Response> {
        return await ApiController.parseResponse(
            this.post('/register/profile/')
        )
    }

    async getProfile(): Promise<Response> {
        return await ApiController.parseResponse(this.get('/profile/'))
    }

    async getRecommendActivities(
        filter?: ActivitiesFilterProps
    ): Promise<Response> {
        return await ApiController.parseResponse(
            this.get('/activities/recommendations/', {
                params: filter,
            })
        )
    }

    async getCommonActivities(
        filter?: ActivitiesFilterProps
    ): Promise<Response> {
        return await ApiController.parseResponse(
            this.get('/activities/list/common/', {
                params: filter,
            })
        )
    }

    async getPersonalActivities(
        filter?: ActivitiesFilterProps
    ): Promise<Response> {
        return await ApiController.parseResponse(
            this.get('/activities/list/', {
                params: filter,
            })
        )
    }

    async getNews(): Promise<Response> {
        return await ApiController.parseResponse(this.get('/news/'))
    }

    async getCurrentNews(slug: string): Promise<Response> {
        return await ApiController.parseResponse(this.get(`/news/${slug}/`))
    }

    async getActivity(slug: string): Promise<Response> {
        return await ApiController.parseResponse(
            this.get(`/activities/Operations/?URL=${slug}`)
        )
    }

    async activitiesSearch(
        term: string,
        filter?: ActivitiesSearchFilter
    ): Promise<Response> {
        return await ApiController.parseResponse(
            this.get(`/activities/list/`, {
                params: {
                    cabinet: 1,
                    name: term,
                    ...filter,
                },
            })
        )
    }

    async getRewards(): Promise<Response> {
        return await ApiController.parseResponse(
            rewardsMock()
            // this.get(`/activities/results/`)
        )
    }

    async deleteReward(...id: number[]): Promise<Response> {
        return await ApiController.parseResponse(
            this.delete(`/activities/results/`, {
                params: {
                    id: [...id],
                },
            })
        )
    }

    async shareRewards(...id: number[]): Promise<Response> {
        return await ApiController.parseResponse(
            this.post(`/profile/portfolio/edit/`, {
                achievements_id: [...id],
            })
        )
    }

    async profileEdit(props: UserEditProps): Promise<Response> {
        return await ApiController.parseResponse(this.post(`/profile/`, props))
    }

    async removeAvatar(): Promise<Response> {
        const formData = new FormData()
        formData.append('photo', '')

        return await ApiController.parseResponse(
            this.post(
                `/profile/`,
                {
                    photo: '',
                },
                {
                    // headers: {
                    //     'Content-Type': 'multipart/form-data'
                    // }
                }
            )
        )
    }

    async uploadAvatar(uri: string): Promise<Response> {
        const formData = new FormData()
        const file: any = {
            uri,
            type: 'image/jpeg',
            name: 'avatar.jpg',
        }
        formData.append('photo', file)

        return await ApiController.parseResponse(
            this.post(`/profile/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        )
    }

    async getEvents(): Promise<Response> {
        return await ApiController.parseResponse(
            eventsMock()
            //this.get(`/invitation/activitiesList/`)
        )
    }

    static async parseResponse(req: AxiosPromise): Promise<Response> {
        try {
            const data = await req
            return {
                state: 'done',
                get isError() {
                    return false
                },
                data: data.data,
                headers: data.headers,
            }
        } catch (e) {
            return {
                state: 'error',
                get isError() {
                    return true
                },
                error: e,
                errorMessage: e.message,
            }
        }
    }
}

function eventsMock(): AxiosPromise {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: [
                    {
                        name: 'Какой-то праздник',
                        url: 'kakoy-to-prazdnik',
                        id: '380',
                        type: null,
                        city: 'Санкт-Петербург',
                        time_begin_activ: '22.08.2020 13:13:00',
                        time_end_activ: '22.08.2020 13:13:00',
                    },
                    {
                        name: 'Какой-то праздник',
                        url: 'kakoy-to-prazdnik',
                        id: '380',
                        type: null,
                        city: 'Санкт-Петербург',
                        time_begin_activ: '22.08.2020 13:13:00',
                        time_end_activ: '22.08.2020 13:13:00',
                    },
                    {
                        name: 'Какой-то праздник',
                        url: 'kakoy-to-prazdnik',
                        id: '380',
                        type: null,
                        city: 'Санкт-Петербург',
                        time_begin_activ: '22.08.2020 13:13:00',
                        time_end_activ: '22.08.2020 13:13:00',
                    },
                    {
                        name: 'Какой-то праздник',
                        url: 'kakoy-to-prazdnik',
                        id: '380',
                        type: null,
                        city: 'Санкт-Петербург',
                        time_begin_activ: '22.08.2020 13:13:00',
                        time_end_activ: '22.08.2020 13:13:00',
                    },
                    {
                        name: 'Какой-то праздник',
                        url: 'kakoy-to-prazdnik',
                        id: '380',
                        type: null,
                        city: 'Санкт-Петербург',
                        time_begin_activ: '22.08.2020 13:13:00',
                        time_end_activ: '22.08.2020 13:13:00',
                    },
                ],
                status: 200,
                statusText: 'ok',
                headers: {},
                config: {},
            })
        }, 1200)
    })
}

function rewardsMock(): AxiosPromise {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: {
                    data: {
                        results: [
                            {
                                id: 0,
                                event: {
                                    format: 'test',
                                    character_code: 'test',
                                    name: 'Конкурс',
                                    label: 'test',
                                },
                            },
                            {
                                id: 0,
                                event: {
                                    format: 'test',
                                    character_code: 'test',
                                    name: 'Конкурс',
                                    label: 'test',
                                },
                            },
                            {
                                id: 0,
                                event: {
                                    format: 'test',
                                    character_code: 'test',
                                    name: 'Конкурс',
                                    label: 'test',
                                },
                            },
                            {
                                id: 0,
                                event: {
                                    format: 'test',
                                    character_code: 'test',
                                    name: 'Конкурс',
                                    label: 'test',
                                },
                            },
                            {
                                id: 0,
                                event: {
                                    format: 'test',
                                    character_code: 'test',
                                    name: 'Конкурс',
                                    label: 'test',
                                },
                            },
                            {
                                id: 0,
                                event: {
                                    format: 'test',
                                    character_code: 'test',
                                    name: 'Конкурс',
                                    label: 'test',
                                },
                            },
                        ],
                    },
                },
                status: 200,
                statusText: 'ok',
                headers: {},
                config: {},
            })
        }, 200)
    })
}

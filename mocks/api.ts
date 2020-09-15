import { AxiosPromise } from 'axios'

export const authUserMock = (): AxiosPromise => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: {
                    id: 10,
                    name: 'admin',
                    surName: 'boilerplate',
                    token: 'testTokenHash',
                },
                status: 200,
                statusText: 'OK',
                headers: {},
                config: {},
            })
        }, 2000)
    })
}

export default { authUserMock }

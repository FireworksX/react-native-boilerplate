import { flow, Instance, types } from 'mobx-state-tree'
import { FlowReturn } from 'mobx-state-tree/dist/core/flow'

export const fetchState = ['pending', 'done', 'error']
export type FetchStateType = 'pending' | 'done' | 'error'

const LoadingModel = types
    .model('LoadingModel', {
        state: types.optional(types.enumeration(fetchState), 'done'),
    })
    .views((self) => ({
        get isLoading() {
            return self.state === 'pending'
        },
    }))
    .actions((self: any) => {
        const setState = (state: FetchStateType) => {
            self.state = state
        }

        const doFetch: FlowReturn<any> = flow(function* (fn: Promise<any>) {
            self.setState('pending')

            try {
                const data = yield fn
                self.setState('done')
                return data
            } catch (e) {
                self.setState('error')
                return {
                    state: self.state,
                    error: e,
                }
            }
        })

        return {
            setState,
            doFetch,
        }
    })

export type LoadingModelType = Instance<typeof LoadingModel>

export default LoadingModel

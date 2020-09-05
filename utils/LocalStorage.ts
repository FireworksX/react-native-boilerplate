import AsyncStorage from '@react-native-community/async-storage'

const SAVE_HASH = '@MyApp:'

export default class LocalStorage {
    static setItem(key: string, value: string) {
        return AsyncStorage.setItem(`${SAVE_HASH}${key}`, value)
    }

    static getItem(key: string): Promise<any> {
        return AsyncStorage.getItem(`${SAVE_HASH}${key}`)
    }
}

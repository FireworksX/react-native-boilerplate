export interface LocalStorageTypes {
    getItem(key: string): Promise<string | null>
    setItem(key: string, value: string | null): Promise<void>
    removeItem(key: string): Promise<void>
}

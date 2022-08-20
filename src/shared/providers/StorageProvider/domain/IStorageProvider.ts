import { LocalStorageProvider } from '../infra/LocalStorageProvider'
import { S3StorageProvider } from '../infra/S3StorageProvider'

export interface IStorageProvider {
    save(file: string, folder: string): Promise<string>
    delete(file: string, folder: string): Promise<void>
}

export interface IStorageOptions {
    local: LocalStorageProvider
    s3: S3StorageProvider
}

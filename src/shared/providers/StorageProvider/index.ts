import { container } from 'tsyringe'

import { IStorageOptions, IStorageProvider } from './domain/IStorageProvider'
import { LocalStorageProvider } from './infra/LocalStorageProvider'
import { S3StorageProvider } from './infra/S3StorageProvider'

const storageOptions = {
    local: LocalStorageProvider,
    s3: S3StorageProvider,
}

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    storageOptions[process.env.STORAGE_DRIVER as keyof IStorageOptions],
)

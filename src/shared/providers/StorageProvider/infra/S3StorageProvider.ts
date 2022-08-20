import aws, { S3 } from 'aws-sdk'
import fs from 'fs'
import mime from 'mime'
import { resolve } from 'path'

import upload from '@config/upload'

import { IStorageProvider } from '../domain/IStorageProvider'

class S3StorageProvider implements IStorageProvider {
    private client: S3

    constructor() {
        this.client = new aws.S3({
            region: process.env.AWS_REGION_S3,
        })
    }

    public async save(file: string, folder: string): Promise<string> {
        const originalName = resolve(upload.tmpFolder, file)

        const contentType = mime.lookup(originalName)

        if (!contentType) {
            throw new Error('File not found')
        }

        const fileContent = await fs.promises.readFile(originalName)

        await this.client
            .putObject({
                Bucket: `${process.env.AWS_BUCKET}/${folder}`,
                Key: file,
                ACL: 'public-read',
                Body: fileContent,
                ContentType: contentType,
            })
            .promise()

        await fs.promises.unlink(originalName)

        return file
    }

    public async delete(file: string, folder: string): Promise<void> {
        await this.client
            .deleteObject({
                Bucket: `${process.env.AWS_BUCKET}/${folder}`,
                Key: file,
            })
            .promise()
    }
}

export { S3StorageProvider }

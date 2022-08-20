import { EtherealMailProvider } from '../infra/EtherealMailProvider'
import { SESMailProvider } from '../infra/SESMailProvider'

export interface IMailProvider {
    sendMail(
        to: string,
        subject: string,
        variables: any,
        path: string,
    ): Promise<void>
}

export interface IMailOptions {
    ethereal: EtherealMailProvider
    ses: SESMailProvider
}

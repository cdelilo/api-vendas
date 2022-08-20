import { container } from 'tsyringe'

import { IMailOptions, IMailProvider } from './domain/IMailProvider'
import { EtherealMailProvider } from './infra/EtherealMailProvider'
import { SESMailProvider } from './infra/SESMailProvider'

const mailOptions = {
    ethereal: container.resolve(EtherealMailProvider),
    ses: container.resolve(SESMailProvider),
}

container.registerInstance<IMailProvider>(
    'MailProvider',
    mailOptions[process.env.MAIL_PROVIDER as keyof IMailOptions],
)

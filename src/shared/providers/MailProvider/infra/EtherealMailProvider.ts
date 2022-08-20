import fs from 'fs'
import handlebars from 'handlebars'
import nodemailer from 'nodemailer'
import { injectable } from 'tsyringe'

import { IMailProvider } from '../domain/IMailProvider'

@injectable()
class EtherealMailProvider implements IMailProvider {
    async sendMail(
        to: string,
        subject: string,
        variables: any,
        path: string,
    ): Promise<void> {
        const account = await nodemailer.createTestAccount()

        const templateFileContent = await fs.promises.readFile(path, {
            encoding: 'utf-8',
        })

        const parseTemplate = handlebars.compile(templateFileContent)

        const templateHTML = parseTemplate(variables)

        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass,
            },
        })

        const message = await transporter.sendMail({
            to,
            from: 'C9Tech <noreplay@domain.com.br>',
            subject,
            html: templateHTML,
        })

        console.log('Message sent: %s', message.messageId)
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
    }
}

export { EtherealMailProvider }

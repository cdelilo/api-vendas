import aws from 'aws-sdk'
import fs from 'fs'
import handlebars from 'handlebars'
import nodemailer from 'nodemailer'
import { injectable } from 'tsyringe'

import { IMailProvider } from '../domain/IMailProvider'

@injectable()
class SESMailProvider implements IMailProvider {
    async sendMail(
        to: string,
        subject: string,
        variables: any,
        path: string,
    ): Promise<void> {
        const templateFileContent = await fs.promises.readFile(path, {
            encoding: 'utf-8',
        })

        const parseTemplate = handlebars.compile(templateFileContent)

        const templateHTML = parseTemplate(variables)

        const transporter = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: '2010-12-01',
            }),
        })

        await transporter.sendMail({
            to,
            from: 'C9Tech <noreplay@domain.com.br>',
            subject,
            html: templateHTML,
        })
    }
}

export { SESMailProvider }

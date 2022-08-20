import path from 'path'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import { IMailProvider } from '@shared/providers/MailProvider/domain/IMailProvider'

import { ISendForgotPasswordEmail } from '../domain/ISendForgotPasswordEmail'
import { IUsersRepository } from '../domain/IUsersRepository'
import { IUserTokensRepository } from '../domain/IUserTokensRepository'

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,
        @inject('MailProvider')
        private mailProvider: IMailProvider,
    ) {}

    public async execute({ email }: ISendForgotPasswordEmail): Promise<void> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new AppError('User does not exists.')
        }

        const { token } = await this.userTokensRepository.generate(user.id)

        const templatePath = path.resolve(
            __dirname,
            '..',
            'views',
            'forgot_password.hbs',
        )

        const variables = {
            name: user.name,
            link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        }

        await this.mailProvider.sendMail(
            email,
            'Recuperação de Senha',
            variables,
            templatePath,
        )
    }
}

export default SendForgotPasswordEmailService

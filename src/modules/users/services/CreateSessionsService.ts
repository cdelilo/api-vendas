import { compare } from 'bcryptjs'
import { sign, Secret } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import authConfig from '@config/auth'
import AppError from '@shared/errors/AppError'

import { ICreateSession } from '../domain/ICreateSession'
import { IUserAuthenticated } from '../domain/IUserAuthenticated'
import { IUsersRepository } from '../domain/IUsersRepository'

@injectable()
class CreateSessionsService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({
        email,
        password,
    }: ICreateSession): Promise<IUserAuthenticated> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401)
        }

        const passwordConfirmed = await compare(password, user.password)

        if (!passwordConfirmed) {
            throw new AppError('Incorrect email/password combination.', 401)
        }

        const token = sign({}, authConfig.jwt.secret as Secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        })

        return {
            user,
            token,
        }
    }
}

export default CreateSessionsService

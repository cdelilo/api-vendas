import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import { ICreateUser } from '../domain/ICreateUser'
import { IUser } from '../domain/IUser'
import { IUsersRepository } from '../domain/IUsersRepository'

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({
        name,
        email,
        password,
    }: ICreateUser): Promise<IUser> {
        const emailExists = await this.usersRepository.findByEmail(email)

        if (emailExists) {
            throw new AppError('Email address already used.')
        }

        const hashedPassword = await hash(password, 8)

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        })

        return user
    }
}

export default CreateUserService

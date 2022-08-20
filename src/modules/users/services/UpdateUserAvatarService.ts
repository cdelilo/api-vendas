import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import { IStorageProvider } from '@shared/providers/StorageProvider/domain/IStorageProvider'

import { IUpdateUserAvatar } from '../domain/IUpdateUserAvatar'
import { IUser } from '../domain/IUser'
import { IUsersRepository } from '../domain/IUsersRepository'

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({
        user_id,
        avatarFilename,
    }: IUpdateUserAvatar): Promise<IUser> {
        const user = await this.usersRepository.findById(user_id)

        if (!user) {
            throw new AppError('User not found.')
        }

        if (user.avatar) {
            await this.storageProvider.delete(user.avatar, 'avatar')
        }
        await this.storageProvider.save(avatarFilename, 'avatar')

        user.avatar = avatarFilename

        await this.usersRepository.save(user)

        return user
    }
}

export default UpdateUserAvatarService

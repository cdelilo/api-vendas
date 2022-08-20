import { instanceToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ShowProfileService from '@modules/users/services/ShowProfileService'
import UpdateProfileService from '@modules/users/services/UpdateProfileService'

export default class ProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        const showProfile = container.resolve(ShowProfileService)
        const { id } = request.user

        const user = await showProfile.execute({ id })

        return response.json(instanceToInstance(user))
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id
        const { name, email, password, old_password } = request.body

        const updateProfile = container.resolve(UpdateProfileService)

        const user = await updateProfile.execute({
            user_id,
            name,
            email,
            password,
            old_password,
        })

        return response.json(instanceToInstance(user))
    }
}

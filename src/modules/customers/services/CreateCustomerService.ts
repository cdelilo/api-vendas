import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import { ICreateCustomer } from '../domain/ICreateCustomer'
import { ICustomer } from '../domain/ICustomer'
import { ICustomersRepository } from '../domain/ICustomersRepository'

@injectable()
class CreateCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,
    ) {}

    public async execute({
        name,
        email,
    }: ICreateCustomer): Promise<ICustomer | undefined> {
        const emailExists = await this.customersRepository.findByEmail(email)

        if (emailExists) {
            throw new AppError('Email address already used.')
        }

        const customer = await this.customersRepository.create({
            name,
            email,
        })

        return customer
    }
}

export default CreateCustomerService

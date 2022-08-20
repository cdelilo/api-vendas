import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import { ICustomersRepository } from '../domain/ICustomersRepository'
import { IShowCustomer } from '../domain/IShowCustomer'
import Customer from '../infra/typeorm/entities/Customer'

@injectable()
class ShowCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,
    ) {}

    public async execute({ id }: IShowCustomer): Promise<Customer> {
        const customer = await this.customersRepository.findById(id)

        if (!customer) {
            throw new AppError('Customer not found.')
        }

        return customer
    }
}

export default ShowCustomerService
